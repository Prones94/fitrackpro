import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ GET: Fetch all workouts
export async function GET() {
  try {
    console.log("Fetching workouts...");
    const workouts = await prisma.workout.findMany();
    return NextResponse.json(workouts.length > 0 ? workouts : []);
  } catch (error) {
    console.error("Error fetching workouts:", error);

    // ✅ Fix: Ensure error is an instance of `Error`
    return NextResponse.json(
      { error: "Failed to fetch workouts", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// ✅ POST: Handle adding a new workout
export async function POST(req: Request) {
  try {
    const { userId, name, reps, sets, weight, duration } = await req.json();

    if (!userId || !name || !reps || !sets) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newWorkout = await prisma.workout.create({
      data: { userId, name, reps, sets, weight: weight ?? null, duration: duration ?? null },
    });

    return NextResponse.json(newWorkout, { status: 201 });

  } catch (error) {
    console.error("Error adding workout:", error);

    // ✅ Fix: Ensure error is an instance of `Error`
    return NextResponse.json(
      { error: "Failed to add workout", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
