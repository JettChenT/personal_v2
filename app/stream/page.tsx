import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function StreamPage() {
  const posts = await prisma.streamPost.findMany();
  return (
    <div className="container mx-auto mt-10">
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
