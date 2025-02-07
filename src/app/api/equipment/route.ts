import { NextResponse } from "next/server";
import { fetchExerciseData } from "@/utils/apiClient";

export async function GET() {
  try {
    const data = await fetchExerciseData("/list/equipment");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return NextResponse.json({ error: "Failed to fetch equipment" }, { status: 500 });
  }
}
