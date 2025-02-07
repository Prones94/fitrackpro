"use client"; // ✅ Ensures this is a Client Component (fixes hydration issues)

import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import Button from "../components/Button";
import WorkoutForm from "../components/WorkoutForm";

type Workout = {
  id: number;
  name: string;
  reps: number;
  sets: number;
};

export default function Dashboard() {
  const [workouts, setWorkouts] = useState<Workout[]>([]); // ✅ Stores workouts fetched from API
  const [loading, setLoading] = useState(true); // ✅ Default `loading` to `true` to prevent hydration issues

  // ✅ Moved `fetchWorkouts` outside of `useEffect` so it can be reused
  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/workouts"); // ✅ Fetching workouts from API
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWorkouts(data.workouts ?? []); // ✅ Updates state with fetched workouts
    } catch (err) {
      console.error("Failed to fetch workouts: ", err);
      setWorkouts([]); // ✅ Prevents crash by setting an empty array
    } finally {
      setLoading(false);
    }
  };

  // ✅ Ensures `fetchWorkouts` only runs once when the component mounts
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (workout: Workout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]); // ✅ Temporarily adds workout to UI for instant feedback
    await fetchWorkouts(); // ✅ Ensures new workouts are fetched from API
  };

  const handleDeleteWorkout = async (id: number) => {
    try {
      const response = await fetch(`/api/workouts/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }

      await fetchWorkouts(); // ✅ Ensures deleted workouts are removed from UI
    } catch (error) {
      console.error("Error deleting workout: ", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Workouts" value={workouts.length.toString()} />
        {/* ✅ Displays total number of workouts */}
      </div>

      <WorkoutForm onAddWorkout={handleAddWorkout} /> {/* ✅ Passes function to add new workouts */}

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Your Workouts</h3>
        {loading ? ( // ✅ Prevents rendering mismatched HTML before data is ready (fixes hydration issue)
          <p>Loading workouts...</p>
        ) : workouts.length === 0 ? (
          <p className="text-gray-500">No workouts logged yet.</p> // ✅ Handles empty state properly
        ) : (
          <ul className="space-y-2">
            {workouts.map((workout) => (
              <li key={workout.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold">{workout.name}</p>
                  <p className="text-gray-600">{workout.reps} reps, {workout.sets} sets</p>
                </div>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)} // ✅ Calls function to delete workout
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button text="Logout" onClick={() => console.log("Logout placeholder")} /> {/* ✅ Placeholder until authentication is re-enabled */}
    </div>
  );
}
