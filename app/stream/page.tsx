import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function StreamPage() {
  const posts = await prisma.streamPost.findMany();
  return (
    <div className="container mx-auto mt-10 lg:w-1/2 xl:w-1/3">
      {posts.map((post) => (
        <div key={post.id} className="p-2 mb-4">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
