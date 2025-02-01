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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Log a Workout</h3>

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