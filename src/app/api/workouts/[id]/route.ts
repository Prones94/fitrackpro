import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ DELETE: Handle deleting a workout by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const workoutId = parseInt(params.id);

    if (isNaN(workoutId)) {
      return NextResponse.json({ error: "Invalid workout ID" }, { status: 400 });
    }

    await prisma.workout.delete({
      where: { id: workoutId },
    });

    console.log(`Workout ${workoutId} deleted`);
    return NextResponse.json({ message: "Workout deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting workout:", error);

    // ✅ Fix: Ensure error is an instance of `Error`
    return NextResponse.json(
      { error: "Failed to delete workout", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
