import { PrismaClient, StreamPost } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { managedNonce } from "@noble/ciphers/webcrypto";
import { utf8ToBytes } from "@noble/ciphers/utils";
import { StreamPostDisplay } from "./postDisplay";
import TopSettings from "./topSettings";

const prisma = new PrismaClient();

const SEMIPUBLIC_KEY = process.env.SEMIPUBLIC_POST_KEY!;
const PRIVATE_KEY = process.env.PRIVATE_POST_KEY!;

const enforce_key = (key: string): string => {
  return key.padEnd(32, "\0").slice(0, 32);
};

const encryptPost = (key: string, post: StreamPost): StreamPost => {
  const chacha = managedNonce(xchacha20poly1305)(utf8ToBytes(enforce_key(key)));
  const encryptField = (field: string) =>
    Buffer.from(chacha.encrypt(utf8ToBytes(field))).toString("base64");

  return {
    ...post,
    title: encryptField(post.title),
    content: encryptField(post.content),
  };
};

const proc_post = (post: StreamPost): StreamPost => {
  switch (post.encryptLevel) {
    case "PUBLIC":
      return post;
    case "SEMIPUBLIC":
      return encryptPost(SEMIPUBLIC_KEY, post);
    case "PRIVATE":
      return encryptPost(PRIVATE_KEY, post);
    default:
      return post; // Handle unexpected cases
  }
};

const getCachedPosts = unstable_cache(
  async () => {
    const posts = await prisma.streamPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return posts.map(proc_post);
  },
  ["stream-posts"],
  { tags: ["stream-posts"], revalidate: 60 }
);

export default async function StreamPage() {
  const posts = await getCachedPosts();
  return (
    <div className="flex flex-col gap-2 font-mono my-6">
      <TopSettings />
      {posts.map((post) => (
        <StreamPostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}
