import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

const data = [
  { batch: "B-200", carbon: 2.2 },
  { batch: "B-201", carbon: 2.1 },
  { batch: "B-202", carbon: 2.0 },
  { batch: "B-203", carbon: 1.9 },
  { batch: "B-204", carbon: 1.7 }
]

function CarbonChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>

        <CartesianGrid stroke="#1f2937" />

        <XAxis dataKey="batch" stroke="#9ca3af" />

        <YAxis stroke="#9ca3af" />

        <Tooltip />

        <Bar
          dataKey="carbon"
          fill="#EF4444"
          radius={[6,6,0,0]}
        />

      </BarChart>
    </ResponsiveContainer>
  )
}

export default CarbonChart