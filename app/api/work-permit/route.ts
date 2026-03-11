import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import WorkPermit from "@/models/work-permit";

export async function GET() {
  try {
    await connectDB();
    const workPermits = await WorkPermit.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: workPermits },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Validasi basic untuk memastikan user benar-benar memilih tanggal
    if (!body.startAt || !body.endAt) {
      return NextResponse.json(
        { success: false, error: "Tanggal mulai dan selesai wajib diisi" },
        { status: 400 },
      );
    }

    const workPermit = await WorkPermit.create(body);

    return NextResponse.json(
      { success: true, data: workPermit },
      { status: 201 },
    );
  } catch (error) {
    // Memberikan log di server console untuk mempermudah debbuging
    console.error("Error WorkPermit Creation:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
