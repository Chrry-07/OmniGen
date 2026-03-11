import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

const data = [
  { batch: "B-200", energy: 545 },
  { batch: "B-201", energy: 535 },
  { batch: "B-202", energy: 528 },
  { batch: "B-203", energy: 520 },
  { batch: "B-204", energy: 512 }
]

function EnergyChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid stroke="#1f2937" />
        <XAxis dataKey="batch" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="energy"
          stroke="#06B6D4"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default EnergyChart