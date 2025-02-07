import { NextResponse } from "next/server";
import { fetchExerciseData } from "@/utils/apiClient";

export async function GET() {
  try {
    const data = await fetchExerciseData("/exercises");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return NextResponse.json({ error: "Failed to fetch exercises" }, { status: 500 });
  }
}
