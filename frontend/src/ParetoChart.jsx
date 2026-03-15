import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const ParetoChart = ({ data }) => {

  const [goldenFrontier, setGoldenFrontier] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pareto")
      .then(res => res.json())
      .then(apiData => {
        const formatted = apiData.map(p => ({
          yield: p.quality,
          energy: p.energy
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
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          <XAxis
            type="number"
            dataKey="energy"
            name="Energy"
            unit="kW"
            stroke="#ccc"
          />

          <YAxis
            type="number"
            dataKey="yield"
            name="Yield"
            unit="%"
            stroke="#ccc"
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
          />

          {/* Pareto Frontier Points */}
          <Scatter
            name="Golden Signature Frontier"
            data={goldenFrontier}
            fill="#3b82f6"
            line={{ stroke: "#3b82f6", strokeDasharray: "4 4" }}
            shape="circle"
          />

          {/* Current Operating Point */}
          <Scatter name="Current Operating Point" data={currentPoint} fill="#00ff9d">
            <Cell fill="#00ff9d" />
          </Scatter>

        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParetoChart;