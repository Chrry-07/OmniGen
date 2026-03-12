import React, { useState } from 'react';

function App() {
  // --- NAVIGATION STATE: landing -> login -> dashboard ---
  const [currentView, setCurrentView] = useState('landing');

  // --- SIMULATOR STATE ---
  const [parameters, setParameters] = useState({
    temperature: 34.3,
    pressure: 0.98,
    motorSpeed: 116,
    flowRate: 1.30,
  });

  const handleParamChange = (name, value) => {
    setParameters(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const calculateMetrics = () => {
    const optimal = { temperature: 34.3, pressure: 0.98, motorSpeed: 116, flowRate: 1.30 };
    const devTemp = Math.abs(parameters.temperature - optimal.temperature) / 10;
    const devPress = Math.abs(parameters.pressure - optimal.pressure) / 0.7;
    const devMotor = Math.abs(parameters.motorSpeed - optimal.motorSpeed) / 60;
    const devFlow = Math.abs(parameters.flowRate - optimal.flowRate) / 2;
    const penalty = (devTemp + devPress + devMotor + devFlow) * 100;
    const qualityScore = Math.max(0, 100 - penalty).toFixed(1);
    const carbonBase = 120;
    const carbonOutput = (carbonBase + (parameters.temperature - 30) * 2 + (parameters.motorSpeed - 90) * 0.5).toFixed(0);
    return { qualityScore, carbonOutput };
  };

  const { qualityScore, carbonOutput } = calculateMetrics();

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

  // ==========================================
  // VIEW 1: THE SAAS LANDING PAGE (The Pitch)
  // ==========================================
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-vercel-dark text-vercel-accents7 font-sans flex flex-col">
        {/* Landing Nav */}
        <nav className="border-b border-vercel-accents2 px-8 py-5 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            ▲ Omni-Gen
          </div>
          <button 
            onClick={() => setCurrentView('login')}
            className="text-sm font-medium text-white bg-vercel-accents2 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            Sign In / Platform Access
          </button>
        </nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto py-20">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
              Manufacturing Optimization, <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">Mastered.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Modern manufacturing faces a fundamental multi-objective conflict. Omni-Gen is a self-learning optimization layer that dynamically balances quality, yield, energy, and carbon at the batch level.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setCurrentView('login')}
                className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-md text-base font-semibold hover:bg-gray-200 transition-colors"
              >
                Access the Simulator
              </button>
              <button className="w-full sm:w-auto bg-transparent border border-vercel-accents2 text-white px-8 py-3 rounded-md text-base font-semibold hover:bg-vercel-accents2 transition-colors">
                View Documentation
              </button>
            </div>
          </div>

          {/* Business Metrics Grid from PDF */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto pb-24">
            <div className="border border-vercel-accents2 bg-vercel-accents1 rounded-xl p-8 text-left">
              <div className="text-green-500 font-bold text-4xl mb-2">-18%</div>
              <h3 className="text-white font-semibold text-lg mb-2">Carbon Variance</h3>
              <p className="text-gray-400 text-sm">Aligns emission goals with regulatory and operational constraints dynamically.</p>
            </div>
            <div className="border border-vercel-accents2 bg-vercel-accents1 rounded-xl p-8 text-left">
              <div className="text-blue-500 font-bold text-4xl mb-2">+12%</div>
              <h3 className="text-white font-semibold text-lg mb-2">Yield Stability</h3>
              <p className="text-gray-400 text-sm">Eliminates batch-level variability and unpredictable performance.</p>
            </div>
            <div className="border border-vercel-accents2 bg-vercel-accents1 rounded-xl p-8 text-left">
              <div className="text-white font-bold text-4xl mb-2">&lt;12 mo</div>
              <h3 className="text-white font-semibold text-lg mb-2">Measurable ROI</h3>
              <p className="text-gray-400 text-sm">Zero manual heuristic tuning. 15-25% reduction in average energy costs.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: THE LOGIN SCREEN 
  // ==========================================
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-vercel-dark flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-sm px-8 py-10 border border-vercel-accents2 bg-vercel-dark rounded-xl shadow-2xl relative">
          
          <button 
            onClick={() => setCurrentView('landing')}
            className="absolute top-4 left-4 text-gray-500 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>

          <div className="flex justify-center mb-8 mt-4">
            <div className="font-bold text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              ▲
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white text-center mb-2">Log in to Omni-Gen</h2>
          <p className="text-sm text-gray-400 text-center mb-8">Enter your plant credentials to access the simulator.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); setCurrentView('dashboard'); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Operator Email</label>
              <input 
                type="email" 
                defaultValue="engineer@tech4change.com"
                className="w-full bg-vercel-dark border border-vercel-accents2 rounded-md px-3 py-2 text-white focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input 
                type="password" 
                defaultValue="********"
                className="w-full bg-vercel-dark border border-vercel-accents2 rounded-md px-3 py-2 text-white focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-white text-black font-medium py-2.5 rounded-md hover:bg-gray-200 transition-colors mt-4"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 border-t border-vercel-accents2 pt-4">
            <p className="text-xs text-center text-gray-500">Authorized manufacturing personnel only.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: THE MAIN DASHBOARD (Simulator)
  // ==========================================
  return (
    <div className="min-h-screen bg-vercel-dark text-vercel-accents7 font-sans">
      <nav className="border-b border-vercel-accents2 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 cursor-pointer"
            onClick={() => setCurrentView('landing')}
          >
            ▲ Omni-Gen
          </div>
          <span className="text-vercel-accents2">/</span>
          <span className="text-sm font-medium">Tech4Change</span>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-400">
          <button className="hover:text-white transition-colors">Deployments</button>
          <button className="hover:text-white transition-colors cursor-default text-white">Simulator</button>
          <button className="hover:text-white transition-colors">Settings</button>
          <div className="h-4 border-l border-vercel-accents2 mx-2"></div>
          
          {/* LOGOUT BUTTON */}
          <button 
            onClick={() => setCurrentView('landing')}
            className="hover:text-white transition-colors flex items-center gap-2"
            title="Log Out"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg">
            <h2 className="text-lg font-semibold mb-6 text-white border-b border-vercel-accents2 pb-2">Process Inputs</h2>
            <ParameterSlider label="Temperature" name="temperature" min="30" max="40" step="0.1" unit="°C" />
            <ParameterSlider label="Pressure" name="pressure" min="0.8" max="1.5" step="0.01" unit="bar" />
            <ParameterSlider label="Motor Speed" name="motorSpeed" min="90" max="150" step="1" unit="RPM" />
            <ParameterSlider label="Flow Rate" name="flowRate" min="0.5" max="2.5" step="0.01" unit="L/min" />
          </div>
          
          <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg flex flex-col">
            <h2 className="text-lg font-semibold mb-6 text-white border-b border-vercel-accents2 pb-2">Golden Signature</h2>
            <div className="flex-grow flex items-center justify-center border-2 border-dashed border-vercel-accents2 rounded bg-black/50">
               <p className="text-sm text-gray-500">Teammate 2: Insert Pareto Chart Here</p>
            </div>
          </div>

          <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg flex flex-col space-y-6">
            <h2 className="text-lg font-semibold mb-2 text-white border-b border-vercel-accents2 pb-2">AI Predictions</h2>
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