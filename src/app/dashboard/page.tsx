"use client"

import { useSession, signOut } from "next-auth/react";
import DashboardCard from "../components/DashboardCard";
import Button from "../components/Button";

export default function Dashboard(){
  const { data: session } = useSession()

  if (!session){
    return <p className="text-center text-red-500">You must be logged in to view this page.</p>
  }
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Welcome, {session.user?.email}!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Workouts" value="10" />
        <DashboardCard title="Calories Burned" value="5,200 kcal" />
        <DashboardCard title="Time Spent" value="15h 30m" />
      </div>

      <Button text="Logout" onClick={() => signOut()} />
    </div>
  )
}