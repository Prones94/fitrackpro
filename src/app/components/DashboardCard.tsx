type DashboardCardProps = {
  title: string;
  value: string;
}

export default function DashboardCard({ title, value }: DashboardCardProps){
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>

  )
}