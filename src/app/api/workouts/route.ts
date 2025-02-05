import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST request to store a new workout
export async function POST(req: Request) {
  try {
    const { userId, name, reps, sets, weight, duration } = await req.json();

    // Validate required fields
    if (!userId || !name || !reps || !sets) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a new workout in Supabase via Prisma
    const newWorkout = await prisma.workout.create({
      data: { userId, name, reps, sets, weight, duration },
    });

    return NextResponse.json(newWorkout, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to add workout" }, { status: 500 });
  }
}
