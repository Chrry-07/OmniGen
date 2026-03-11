function MetricCard({ title, value, unit, color }) {

  return (
    <div className="bg-primary p-6 rounded-xl border border-gray-800 shadow-lg hover:border-accent transition">

      <p className="text-gray-400 text-sm mb-2">
        {title}
      </p>

      <h2 className={`text-3xl font-bold ${color}`}>
        {value} {unit}
      </h2>

    </div>
  )
}

export default MetricCard