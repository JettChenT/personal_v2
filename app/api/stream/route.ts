import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const streamPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  encryptLevel: z
    .enum(["PUBLIC", "SEMIPUBLIC", "PRIVATE"])
    .optional()
    .default("PUBLIC"),
});

export async function POST(request: Request) {
  // Check if the API key is valid
  const apiKey = request.headers.get("X-API-Key");
  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = streamPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }

    const { title, content, encryptLevel } = result.data;

    // Create new StreamPost
    const newPost = await prisma.streamPost.create({
      data: {
        title,
        content,
        encryptLevel,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating stream post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
