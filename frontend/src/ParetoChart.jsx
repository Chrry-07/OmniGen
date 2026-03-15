import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";

const ParetoChart = ({ data }) => {

  const [goldenFrontier, setGoldenFrontier] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pareto")
      .then(res => res.json())
      .then(apiData => {

        const formatted = apiData.map(p => ({
          yield: Number(p.quality),
          energy: Number(p.energy)
        }));

        setGoldenFrontier(formatted);

      })
      .catch(err => console.error("Error fetching Pareto data:", err));

  }, []);

  const currentPoint = [
    {
      yield: 96.6,
      energy: data?.motorSpeed ? data.motorSpeed * 1.2 : 120,
      name: "Current Operating Point"
    }
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 30, right: 60, bottom: 70, left: 70 }}
        >

          <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2c" />

          <XAxis
            type="number"
            dataKey="energy"
            name="Energy"
            unit=" kW"
            domain={[80, 160]}
            tickCount={6}
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
            label={{
              value: "Energy Consumption (kW)",
              position: "bottom",
              offset: 25,
              fill: "#ccc",
              fontSize: 13
            }}
          />

          <YAxis
            type="number"
            dataKey="yield"
            name="Yield"
            unit="%"
            domain={[90, 100]}
            tickCount={6}
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
            label={{
              value: "Production Yield (%)",
              angle: -90,
              position: "insideLeft",
              fill: "#ccc",
              fontSize: 13
            }}
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid #444",
              borderRadius: "6px"
            }}
          />

          <Legend wrapperStyle={{ color: "#ccc" }} />

          {/* AI Pareto Frontier */}
          <Scatter
            name="AI Pareto Frontier"
            data={goldenFrontier}
            fill="#3b82f6"
            line
            shape="circle"
          />

          {/* Current Operating Point */}
          <Scatter
            name="Current Process"
            data={currentPoint}
            fill="#00ff9d"
            shape="circle"
          >
            <Cell fill="#00ff9d" stroke="#00ff9d" strokeWidth={3} />
          </Scatter>

        </ScatterChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ParetoChart;