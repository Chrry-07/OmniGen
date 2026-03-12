import React from 'react';

const GOLDEN_TARGETS = {
  temperature: 34.3,
  pressure: 0.98,
  motorSpeed: 116,
  flowRate: 1.30
};

const Recommendations = ({ currentParams }) => {
  const getRecommendation = (key, current, target) => {
    const diff = (current - target).toFixed(2);
    if (Math.abs(diff) <= 0.02) return null; // Margin of error

    return {
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      direction: diff > 0 ? 'Reduce' : 'Increase',
      value: Math.abs(diff),
      icon: diff > 0 ? '⬇' : '⬆',
      color: diff > 0 ? '#ff4d4f' : '#3b82f6'
    };
  };

  const recs = Object.keys(GOLDEN_TARGETS)
    .map(key => getRecommendation(key, currentParams[key], GOLDEN_TARGETS[key]))
    .filter(Boolean);

  return (
    <div className="w-full space-y-2">
      {recs.length === 0 ? (
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-xs text-center">
          ✅ Process fully optimized
        </div>
      ) : (
        recs.map((rec, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-vercel-dark border border-vercel-accents2 rounded shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-blue-400 bg-blue-400/10 p-1 rounded">{rec.icon}</span>
              <span className="text-sm font-medium text-white">{rec.direction} {rec.label}</span>
            </div>
            <span className="text-xs font-mono text-gray-400">by {rec.value}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Recommendations;