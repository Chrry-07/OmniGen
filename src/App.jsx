import React, { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [parameters, setParameters] = useState({ temperature: 34.3, pressure: 0.98, motorSpeed: 116, flowRate: 1.30 });

  const handleParamChange = (name, value) => setParameters(prev => ({ ...prev, [name]: parseFloat(value) }));

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
    const s = Number(score);
    if (s >= 90) return 'text-green-500';
    if (s >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityStatus = (score) => {
    const s = Number(score);
    if (s >= 90) return 'Excellent';
    if (s >= 75) return 'Good';
    if (s >= 50) return 'Fair';
    return 'Poor';
  };

  const ParameterSlider = ({ label, name, min, max, step, unit }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-vercel-accents7">{label}</label>
        <span className="text-xs font-mono bg-vercel-accents2 px-2 py-1 rounded text-white border border-gray-700">
          {parameters[name]} {unit}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={parameters[name]} onChange={(e) => handleParamChange(name, e.target.value)}
        className="w-full h-1.5 bg-vercel-accents2 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-300 transition-all" />
      <div className="flex justify-between text-xs text-gray-500 mt-1"><span>{min}</span><span>{max}</span></div>
    </div>
  );

  // ==========================================
  // VIEW 1: ENTERPRISE LANDING PAGE
  // ==========================================
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white font-sans overflow-hidden animate-fade-in relative">
        {/* Background Grid & Glow (Mimicking the Vercel Prism background) */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 blur-[120px] opacity-20 pointer-events-none"></div>

        <nav className="border-b border-gray-800 px-8 py-4 flex items-center justify-between relative z-10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center space-x-8">
            <div className="font-bold text-xl tracking-tighter">▲ Omni-Gen</div>
            <div className="hidden md:flex space-x-6 text-sm text-gray-400">
              <span className="hover:text-white cursor-pointer transition">Products</span>
              <span className="hover:text-white cursor-pointer transition">Solutions</span>
              <span className="hover:text-white cursor-pointer transition">Enterprise</span>
              <span className="hover:text-white cursor-pointer transition">Pricing</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('login')} className="text-sm font-medium text-gray-300 hover:text-white transition">Log In</button>
            <button onClick={() => setCurrentView('login')} className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-200 transition">Contact Sales</button>
          </div>
        </nav>

        <main className="flex flex-col items-center justify-center px-6 pt-32 pb-20 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 max-w-5xl mx-auto leading-tight">
            Optimize production on the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">AI Cloud.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Omni-Gen provides the Golden Signature layer to build, scale, and secure your manufacturing operations. Dynamically balance quality, yield, energy, and carbon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-24">
            <button onClick={() => setCurrentView('login')} className="bg-white text-black px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
              ▲ Start Optimizing
            </button>
            <button className="bg-gray-900 border border-gray-700 text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-800 transition">
              Get a Demo
            </button>
          </div>

          <p className="text-sm text-gray-500 font-mono tracking-widest uppercase mb-8">Trusted by Modern Manufacturing</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            <div className="border border-gray-800 bg-black/50 backdrop-blur-sm rounded-xl p-8 text-left hover:border-gray-600 transition duration-500">
              <div className="text-white font-bold text-4xl mb-2 tracking-tighter">-18%</div>
              <h3 className="text-gray-300 font-medium text-sm">Carbon Variance</h3>
            </div>
            <div className="border border-gray-800 bg-black/50 backdrop-blur-sm rounded-xl p-8 text-left hover:border-gray-600 transition duration-500">
              <div className="text-white font-bold text-4xl mb-2 tracking-tighter">+12%</div>
              <h3 className="text-gray-300 font-medium text-sm">Yield Stability</h3>
            </div>
            <div className="border border-gray-800 bg-black/50 backdrop-blur-sm rounded-xl p-8 text-left hover:border-gray-600 transition duration-500">
              <div className="text-white font-bold text-4xl mb-2 tracking-tighter">&lt;12 mo</div>
              <h3 className="text-gray-300 font-medium text-sm">Measurable ROI</h3>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: SEAMLESS LOGIN GATE
  // ==========================================
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans animate-fade-in relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        
        <div className="w-full max-w-md px-8 py-10 border border-gray-800 bg-gray-950/80 backdrop-blur-xl rounded-xl shadow-2xl relative z-10">
          <button onClick={() => setCurrentView('landing')} className="absolute top-6 left-6 text-gray-500 hover:text-white transition text-sm flex items-center gap-2">
            ← Back
          </button>
          <div className="flex justify-center mb-8 mt-6">
            <div className="font-bold text-4xl tracking-tight text-white">▲</div>
          </div>
          <h2 className="text-2xl font-semibold text-white text-center mb-2 tracking-tight">Welcome back</h2>
          <p className="text-sm text-gray-400 text-center mb-8">Enter your credentials to access the simulator.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); setCurrentView('dashboard'); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" defaultValue="engineer@tech4change.com" className="w-full bg-black border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <input type="password" defaultValue="********" className="w-full bg-black border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" required />
            </div>
            <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition-colors mt-6">
              Continue with Email
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: SIMULATOR DASHBOARD
  // ==========================================
 if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-vercel-dark text-vercel-accents7 font-sans">
        {/* Top Navigation Bar */}
        <nav className="border-b border-vercel-accents2 px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            {/* Logo allows returning to landing page for presentation flow */}
            <div 
              className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 cursor-pointer"
              onClick={() => setCurrentView('landing')}
              title="Return to Landing Page"
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
            
            {/* Added dynamic Profile Bubble for polish */}
            <div className="h-4 border-l border-vercel-accents2 mx-2"></div>
            <button className="hover:text-white transition-colors flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold border border-gray-600">
              </div>
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
            {/* The WOW Factor: Human-in-the-Loop button */}
            <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
              Deploy Optimized Parameters
            </button>
          </div>

          {/* 3-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUMN 1: INTERACTIVE INPUTS (Your Restored Work!) */}
            <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg">
              <h2 className="text-lg font-semibold mb-6 text-white border-b border-vercel-accents2 pb-2">Process Inputs</h2>
              <ParameterSlider label="Temperature" name="temperature" min="30" max="40" step="0.1" unit="°C" />
              <ParameterSlider label="Pressure" name="pressure" min="0.8" max="1.5" step="0.01" unit="bar" />
              <ParameterSlider label="Motor Speed" name="motorSpeed" min="90" max="150" step="1" unit="RPM" />
              <ParameterSlider label="Flow Rate" name="flowRate" min="0.5" max="2.5" step="0.01" unit="L/min" />
            </div>
            
            {/* COLUMN 2: TEAMMATE'S FOCUS (CHARTS) */}
            <div className="border border-vercel-accents2 rounded-lg p-6 bg-vercel-accents1 shadow-lg flex flex-col">
              <h2 className="text-lg font-semibold mb-6 text-white border-b border-vercel-accents2 pb-2">Golden Signature</h2>
              <div className="flex-grow flex items-center justify-center border-2 border-dashed border-vercel-accents2 rounded bg-black/50">
                <p className="text-sm text-gray-500">Teammate 2: Insert Pareto Chart Here</p>
              </div>
            </div>

            {/* COLUMN 3: OUTPUTS & RECOMMENDATIONS (Your Restored Work!) */}
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
                  {Number(carbonOutput) > 140 && (
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
}

export default App;