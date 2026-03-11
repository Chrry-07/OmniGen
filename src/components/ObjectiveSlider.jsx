import { useState, useMemo } from 'react'

function ObjectiveSlider() {
  const [energy, setEnergy] = useState(50)
  const [yieldPriority, setYieldPriority] = useState(50)

  const normalized = useMemo(() => {
    const total = Math.max(1, energy + yieldPriority)
    return {
      energyPct: Math.round((energy / total) * 100),
      yieldPct: Math.round((yieldPriority / total) * 100)
    }
  }, [energy, yieldPriority])

  return (
    <div className="bg-primary p-6 rounded-xl border border-gray-800 mt-8">

      <h3 className="text-lg font-semibold text-white mb-3">Objective Slider (UI Mock)</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-300">Energy Priority: <strong className="text-white">{energy}%</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Yield Priority: <strong className="text-white">{yieldPriority}%</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={yieldPriority}
            onChange={(e) => setYieldPriority(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="text-sm text-gray-300">
          Normalized weights — Energy: <span className="text-white">{normalized.energyPct}%</span>, Yield: <span className="text-white">{normalized.yieldPct}%</span>
        </div>
      </div>

    </div>
  )
}

export default ObjectiveSlider
