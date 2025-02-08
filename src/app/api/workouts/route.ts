import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("🔄 API Request: Fetching workouts...");

    await prisma.$connect(); // ✅ Ensures Prisma is connected before querying

    const workouts = await prisma.workout.findMany();

    console.log("✅ Workouts Retrieved:", workouts ?? "No workouts found"); // ✅ Debugging log

    return NextResponse.json({ workouts: workouts ?? [] }); // ✅ Ensures API response is always valid

  } catch (error) {
    console.error("❌ Error fetching workouts:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        error: "Failed to fetch workouts",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// ✅ POST: Handle adding a new workout
export async function POST(req: Request) {
  try {
    const workout = await req.json();
    console.log("Received workout data:", workout)

    if (!workout.name || workout.reps <= 0 || workout.sets <= 0 || !workout.userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.$connect();

    const newWorkout = await prisma.workout.create({
      data: {
        name: workout.name,
        reps: workout.reps,
        sets: workout.sets,
        weight: workout.weight ?? null,
        duration: workout.duration ?? null,
        userId: String(workout.userId)
      },
    });

    console.log("✅ Workout Added:", newWorkout);
    return NextResponse.json(newWorkout, { status: 201 });

  } catch (error) {
    console.error("❌ Error adding workout:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      { error: "Failed to add workout", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
