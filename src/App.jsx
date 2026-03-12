import React, { useState } from 'react';

function App() {
  // --- STATE: Holds the live values of our process parameters ---
  const [parameters, setParameters] = useState({
    temperature: 34.3, // Starts near the Golden Signature
    pressure: 0.98,
    motorSpeed: 116,
    flowRate: 1.30,
  });

  // --- HANDLER: Updates state when a slider moves ---
  const handleParamChange = (name, value) => {
    setParameters(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  // --- MOCK AI LOGIC: Calculates outcomes based on deviation from Golden Signature ---
  const calculateMetrics = () => {
    const optimal = { temperature: 34.3, pressure: 0.98, motorSpeed: 116, flowRate: 1.30 };
    
    // Calculate how far the sliders are from the optimal targets
    const devTemp = Math.abs(parameters.temperature - optimal.temperature) / 10;
    const devPress = Math.abs(parameters.pressure - optimal.pressure) / 0.7;
    const devMotor = Math.abs(parameters.motorSpeed - optimal.motorSpeed) / 60;
    const devFlow = Math.abs(parameters.flowRate - optimal.flowRate) / 2;

    const penalty = (devTemp + devPress + devMotor + devFlow) * 100;
    const qualityScore = Math.max(0, 100 - penalty).toFixed(1);

    // Mock Carbon calculation (rises as temp and motor speed increase)
    const carbonBase = 120;
    const carbonOutput = (carbonBase + (parameters.temperature - 30) * 2 + (parameters.motorSpeed - 90) * 0.5).toFixed(0);

    return { qualityScore, carbonOutput };
  };

  const { qualityScore, carbonOutput } = calculateMetrics();

  // --- UI HELPERS: Dynamic styling based on score ---
  const getQualityColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityStatus = (score) => {
    if (score >= 90) return 'Excellent Batch';
    if (score >= 75) return 'Moderate Quality';
    return 'Defect Risk High';
  };

  // --- REUSABLE UI COMPONENT: A clean Vercel-style slider ---
  const ParameterSlider = ({ label, name, min, max, step, unit }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-vercel-accents7">{label}</label>
        <span className="text-xs font-mono bg-vercel-accents2 px-2 py-1 rounded text-white border border-gray-700 transition-all">
          {parameters[name]} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={parameters[name]}
        onChange={(e) => handleParamChange(name, e.target.value)}
        className="w-full h-1.5 bg-vercel-accents2 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-300 transition-all"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-vercel-dark text-vercel-accents7 font-sans">
      {/* Top Navigation Bar */}
      <nav className="border-b border-vercel-accents2 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            ▲ Omni-Gen
          </div>
          <span className="text-vercel-accents2">/</span>
          <span className="text-sm font-medium">Tech4Change</span>
        </div>
        <div className="flex space-x-6 text-sm text-gray-400">
          <button className="hover:text-white transition-colors">Deployments</button>
          <button className="hover:text-white transition-colors cursor-default text-white">Simulator</button>
          <button className="hover:text-white transition-colors">Settings</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end border-b border-vercel-accents2 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Optimization Simulator</h1>
            <p className="text-gray-400 text-sm">Adjust process parameters and validate AI recommendations.</p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
            Deploy Parameters
          </button>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1: INTERACTIVE INPUTS */}
          <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg">
            <h2 className="text-lg font-semibold mb-6 text-white border-b border-vercel-accents2 pb-2">Process Inputs</h2>
            <ParameterSlider label="Temperature" name="temperature" min="30" max="40" step="0.1" unit="°C" />
            <ParameterSlider label="Pressure" name="pressure" min="0.8" max="1.5" step="0.01" unit="bar" />
            <ParameterSlider label="Motor Speed" name="motorSpeed" min="90" max="150" step="1" unit="RPM" />
            <ParameterSlider label="Flow Rate" name="flowRate" min="0.5" max="2.5" step="0.01" unit="L/min" />
          </div>
          
          {/* COLUMN 2: TEAMMATE'S FOCUS */}
          <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg flex flex-col">
            <h2 className="text-lg font-semibold mb-6 text-white border-b border-vercel-accents2 pb-2">Golden Signature</h2>
            <div className="flex-grow flex items-center justify-center border-2 border-dashed border-vercel-accents2 rounded bg-black/50">
               <p className="text-sm text-gray-500">Teammate 2: Insert Pareto Chart Here</p>
            </div>
          </div>

          {/* COLUMN 3: OUTPUTS & RECOMMENDATIONS */}
          <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg flex flex-col space-y-6">
            <h2 className="text-lg font-semibold mb-2 text-white border-b border-vercel-accents2 pb-2">AI Predictions</h2>
            
            {/* Predicted Quality Metric */}
            <div className="bg-vercel-dark border border-vercel-accents2 rounded-md p-4">
              <p className="text-sm text-gray-400 mb-1">Predicted Quality Score</p>
              <div className="flex items-baseline justify-between">
                <span className={`text-4xl font-bold tracking-tighter ${getQualityColor(qualityScore)}`}>
                  {qualityScore}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full border border-vercel-accents2 bg-vercel-accents1 text-gray-300">
                  {getQualityStatus(qualityScore)}
                </span>
              </div>
            </div>

            {/* Estimated Carbon Metric */}
            <div className="bg-vercel-dark border border-vercel-accents2 rounded-md p-4">
              <p className="text-sm text-gray-400 mb-1">Estimated Carbon Output</p>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold tracking-tighter text-white">
                  {carbonOutput} <span className="text-lg text-gray-500 font-normal">kg CO₂e</span>
                </span>
                {carbonOutput > 140 && (
                  <span className="text-xs text-red-500 font-medium px-2 py-1 bg-red-500/10 rounded border border-red-500/20">
                    High Emissions
                  </span>
                )}
              </div>
            </div>

            {/* Teammate 2 Placeholder for Action Items */}
            <div className="flex-grow flex items-center justify-center border-2 border-dashed border-vercel-accents2 rounded bg-black/50 p-4 mt-2">
               <p className="text-sm text-gray-500 text-center">Teammate 2: Insert Auto-Recommendations Here</p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default App;