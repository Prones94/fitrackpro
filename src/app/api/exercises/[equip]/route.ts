import { NextResponse } from "next/server";
import { fetchExerciseData } from "@/utils/apiClient";

export async function GET(req: Request, { params }: { params: { equip: string } }) {
  try {
    const data = await fetchExerciseData(`/exercises/equipment/${params.equip}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`❌ Error fetching exercises for equipment: ${params.equip}`, error);
    return NextResponse.json({ error: `Failed to fetch exercises for ${params.equip}` }, { status: 500 });
  }
}
