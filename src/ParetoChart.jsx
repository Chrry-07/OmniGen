import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Simulated Pareto Frontier data (Yield vs Energy)
const goldenFrontier = [
  { yield: 85, energy: 100 },
  { yield: 88, energy: 115 },
  { yield: 92, energy: 130 }, // High efficiency
  { yield: 95, energy: 150 },
  { yield: 98, energy: 180 },
];

const ParetoChart = ({ data }) => {
  // Logic to simulate current performance based on sliders
  // In a real app, this would be a complex calculation/API call
  const currentPoint = [
    {
      yield: 96.6, // From your teammate's AI Prediction
      energy: data.MotorSpeed * 1.2, // Arbitrary logic for visualization
      name: 'Current Operating Point'
    }
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis type="number" dataKey="energy" name="Energy" unit="kW" stroke="#ccc" />
          <YAxis type="number" dataKey="yield" name="Yield" unit="%" stroke="#ccc" />
          <ZAxis type="number" range={[100, 200]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          
          {/* The Golden Signature Curve */}
          <Scatter name="Golden Signature" data={goldenFrontier} fill="#8884d8" line shape="circle" />
          
          {/* The Live Moving Dot */}
          <Scatter name="Current" data={currentPoint} fill="#00ff9d">
            <Cell fill="#00ff9d" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParetoChart;