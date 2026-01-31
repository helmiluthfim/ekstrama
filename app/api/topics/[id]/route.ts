// app/api/topics/[id]/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

// Definisikan tipe Props baru
type Props = {
  params: Promise<{
    id: string;
  }>;
};

// PERBAIKAN UNTUK PUT
export async function PUT(request: Request, props: Props) {
  const params = await props.params; // Await params di sini
  const { id } = params;

  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

// PERBAIKAN UNTUK GET
export async function GET(request: Request, props: Props) {
  const params = await props.params; // Await params di sini
  const { id } = params;

  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}

// PERBAIKAN UNTUK DELETE (Jika ada)
export async function DELETE(request: Request, props: Props) {
  const params = await props.params;
  const { id } = params;

  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
