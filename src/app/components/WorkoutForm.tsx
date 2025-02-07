"use client";

import { useState, useEffect } from "react";

type Workout = {
  id: number;
  name: string;
  reps: number;
  sets: number;
  weight?: number;
  duration?: number;
};

export default function WorkoutForm({
  onAddWorkout,
  selectedExercise,
}: {
  onAddWorkout: (workout: Workout) => void;
  selectedExercise: string;
}) {
  const [name, setName] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState<number | undefined>();
  const [duration, setDuration] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Auto-fill exercise name when an exercise is selected
  useEffect(() => {
    if (selectedExercise) {
      setName(selectedExercise);
    }
  }, [selectedExercise]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Input validation to prevent empty submissions
    if (!name || reps <= 0 || sets <= 0) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          reps,
          sets,
          weight,
          duration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add workout.");
      }

      // ✅ Extract created workout from API response
      const savedWorkout = await response.json();

      // ✅ Add workout to state after successful API call
      onAddWorkout({
        id: savedWorkout.id ?? Date.now(),
        name,
        reps,
        sets,
        weight,
        duration,
      });

      // ✅ Reset form after submission
      setName("");
      setReps(0);
      setSets(0);
      setWeight(undefined);
      setDuration(undefined);
    } catch (err) {
      setError("Error saving workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Log a Workout</h3>
      {error && <p className="text-red-500">{error}</p>}

      <label htmlFor="name" className="block text-gray-700 font-medium">
        Exercise Name
      </label>
      <input
        type="text"
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <label htmlFor="reps" className="block text-gray-700 font-medium">
        Rep Range
      </label>
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
      />

      <label htmlFor="sets" className="block text-gray-700 font-medium">
        # of Sets
      </label>
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
      />

      <label className="block text-gray-700 font-medium">Weight (Optional, in lbs)</label>
      <input
        type="number"
        placeholder="e.g., 150"
        value={weight || ""}
        onChange={(e) => setWeight(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />

      <label className="block text-gray-700 font-medium">Rest (Optional, in seconds)</label>
      <input
        type="number"
        placeholder="e.g., 60"
        value={duration || ""}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full" disabled={loading}>
        {loading ? "Saving..." : "Add Workout"}
      </button>
    </form>
  );
}
