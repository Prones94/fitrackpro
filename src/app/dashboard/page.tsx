"use client"

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import Button from "../components/Button";
import WorkoutForm from "../components/WorkoutForm";

type Workout = {
  id: number;
  name: string;
  reps: number;
  sets: number;
}

export default function Dashboard(){
  const { data: session } = useSession()
  const [workouts, setWorkouts] = useState<Workout[]>([])

  if (!session){
    return <p className="text-center text-red-500">You must be logged in to view this page.</p>
  }

  const handleAddWorkout = (workout: Workout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout])
  }

  const handleDeleteWorkout= (id: number) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Welcome, {session.user?.email}!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Workouts" value={workouts.length.toString()} />
      </div>

      <WorkoutForm onAddWorkout={handleAddWorkout} />

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Your Workouts</h3>
        {workouts.length === 0 ? (
          <p className="text-gray-500">No workouts logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {workouts.map((workout) => (
              <li key={workout.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{workout.name}</p>
                <p className="text-gray-600">{workout.reps} reps, {workout.sets} sets</p>
              </div>
              <button
                onClick={() => handleDeleteWorkout(workout.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
            ))}
          </ul>
        )}
      </div>

      <Button text="Logout" onClick={() => signOut()} />
    </div>
  )
}