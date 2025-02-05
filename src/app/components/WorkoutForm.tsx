"use client"

import { useState } from "react"

type Workout = {
  id: number;
  name: string;
  reps: number;
  sets: number;
}

export default function WorkoutForm({ onAddWorkout }: { onAddWorkout: (workout: Workout) => void}) {
  const [name, setName] = useState("")
  const [reps, setReps] = useState(0)
  const [sets, setSets] = useState(0)
  const [weight, setWeight] = useState<number | undefined>()
  const [duration, setDuration] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setError("");

    if (!name || reps <= 0 || sets <= 0){
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "test-user",
          name,
          reps,
          sets,
          weight,
          duration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add workout");
      }

      const newWorkout: Workout = {
        id: Date.now(),
        name,
        reps,
        sets
      }

      onAddWorkout(newWorkout)
      setName("");
      setReps(0);
      setSets(0);
      setWeight(undefined);
      setDuration(undefined);

    } catch (err) {
      setError("Error saving workout. Please try again.");
    } finally {
      setLoading(false)
    }
    if (!name || reps <= 0 || sets <= 0) return

    const newWorkout: Workout = {
      id: Date.now(),
      name,
      reps,
      sets,
    }

    onAddWorkout(newWorkout)
    setName("")
    setReps(0)
    setSets(0)
    setWeight(undefined)
    setDuration(undefined)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Log a Workout</h3>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Add Workout
      </button>
    </form>
  )
}