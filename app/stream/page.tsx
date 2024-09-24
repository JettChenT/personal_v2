import { PrismaClient, StreamPost } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

function StreamPostDisplay({ post }: { post: StreamPost }) {
  return (
    <div key={post.id} className="p-2 border">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-500">{post.createdAt.toLocaleString()}</p>
      <p className="text-gray-700 mt-1">{post.content}</p>
    </div>
  );
}

const getCachedPosts = unstable_cache(
  async () => {
    return await prisma.streamPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  },
  ["stream-posts"],
  { revalidate: 60, tags: ["stream-posts"] }
);

export default async function StreamPage() {
  const posts = await getCachedPosts();
  return (
    <div className="flex flex-col gap-2 font-mono mt-6">
      <p className="italic">an ephemeral stream of random stuff.</p>
      {posts.map((post) => (
        <StreamPostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}
