// app/api/topics/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    await connectMongoDB();

    await Topic.create({ title, description });

    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create topic" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();

    const topics = await Topic.find();

    return NextResponse.json({ topics });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch topics" },
      { status: 500 },
    );
  }
}
