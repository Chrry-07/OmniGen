function SSSCard({ score = 94 }) {
  const status = score >= 90 ? 'Highly Stable' : score >= 75 ? 'Stable' : 'At Risk'
  const color = score >= 90 ? 'text-success' : score >= 75 ? 'text-gold' : 'text-alert'

  return (
    <div className="bg-primary p-6 rounded-xl border border-gray-800 shadow-lg hover:border-accent transition">

      <p className="text-gray-400 text-sm mb-2">Signature Stability Score</p>

      <div className="flex items-baseline gap-3">
        <h2 className={`text-3xl font-bold ${color}`}>{score}</h2>
        <span className="text-gray-400">/100</span>
      </div>

      <p className="text-gray-300 text-sm mt-2">{status}</p>

    </div>
  )
}

export default SSSCard
