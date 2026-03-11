import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts"

// Data now contains both the optimal target and the actual current batch
const data = [
  { metric: "Energy", target: 100, actual: 70 },
  { metric: "Yield", target: 100, actual: 92 },
  { metric: "Quality", target: 100, actual: 95 },
  { metric: "Carbon", target: 100, actual: 65 },
  { metric: "Throughput", target: 100, actual: 85 }
]

function GoldenSignatureChart() {

  return (
    <ResponsiveContainer width="100%" height={350}>

      <RadarChart data={data}>

        {/* Grid and axes */}
        <PolarGrid stroke="#1f2937" />

        <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />

        {/* Normalize radius so outer edge is always the optimal (100) */}
        <PolarRadiusAxis stroke="#6b7280" domain={[0, 100]} tickCount={6} />

        {/* Target (Golden Signature) - dotted outline, no fill */}
        <Radar
          name="Target (Golden Signature)"
          dataKey="target"
          stroke="#FACC15"
          strokeWidth={2}
          fill="none"
          fillOpacity={0}
          dot={false}
          strokeDasharray="4 4"
        />

        {/* Actual (current batch) - solid filled polygon */}
        <Radar
          name="Actual (Current Batch)"
          dataKey="actual"
          stroke="#06B6D4"
          fill="#06B6D4"
          fillOpacity={0.35}
        />

        <Legend verticalAlign="top" wrapperStyle={{ top: -10 }} />
        <Tooltip />

      </RadarChart>

    </ResponsiveContainer>
  )
}

export default GoldenSignatureChart