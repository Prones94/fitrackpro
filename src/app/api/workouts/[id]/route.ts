import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(req: Request, { params }: { params: { id: string } }){
  try {
    const workoutId = parseInt(params.id)

    if (isNaN(workoutId)){
      return NextResponse.json({ error: "Invalid workout ID"}, { status: 400 })
    }

    await prisma.workout.delete({
      where: { id: workoutId }
    })

    return NextResponse.json({ message: "Workout deleted"}, { status: 200 })
  } catch (err){
    return NextResponse.json({ error: "Failed to delete workout" }, { status: 500 })
  }
}