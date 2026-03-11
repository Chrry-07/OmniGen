import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts"

const data = [
  { metric: "Energy", value: 70 },
  { metric: "Yield", value: 92 },
  { metric: "Quality", value: 95 },
  { metric: "Carbon", value: 65 },
  { metric: "Throughput", value: 85 }
]

function GoldenSignatureChart() {

  return (
    <ResponsiveContainer width="100%" height="100%">

      <RadarChart data={data}>

        <PolarGrid stroke="#1f2937" />

        <PolarAngleAxis
          dataKey="metric"
          stroke="#9ca3af"
        />

        <PolarRadiusAxis stroke="#6b7280" />

        <Radar
          name="Golden Signature"
          dataKey="value"
          stroke="#06B6D4"
          fill="#06B6D4"
          fillOpacity={0.4}
        />

      </RadarChart>

    </ResponsiveContainer>
  )
}

export default GoldenSignatureChart