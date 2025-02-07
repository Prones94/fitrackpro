import { NextResponse } from "next/server";
import { fetchExerciseData } from "@/utils/apiClient";

export async function GET() {
  try {
    const data = await fetchExerciseData("/exercises/mechanic/isolation");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching isolation exercises:", error);
    return NextResponse.json({ error: "Failed to fetch isolation exercises" }, { status: 500 });
  }
}
