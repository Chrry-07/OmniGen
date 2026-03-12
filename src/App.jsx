import React, { useState } from 'react';

function App() {
  // --- AUTH & NAV STATE ---
  const [currentView, setCurrentView] = useState('landing');

  // SIMULATOR LOGIC & STATE 
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
    const s = Number(score);
    if (s >= 90) return 'text-green-500';
    if (s >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityStatus = (score) => {
    const s = Number(score);
    if (s >= 90) return 'Excellent Batch';
    if (s >= 75) return 'Moderate Quality';
    return 'Defect Risk High';
  };

  const ParameterSlider = ({ label, name, min, max, step, unit }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <span className="text-xs font-mono bg-gray-900 px-2 py-1 rounded text-white border border-gray-700 transition-all">
          {parameters[name]} {unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={parameters[name]} onChange={(e) => handleParamChange(name, e.target.value)}
        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-300 transition-all"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1"><span>{min}</span><span>{max}</span></div>
    </div>
  );

  // INTERACTIVE CHART STATE (For the Solutions Page)
  const chartData = [
    { x: 0, y: 250, val: 82.1, time: '08:00 AM' },
    { x: 50, y: 250, val: 82.5, time: '09:00 AM' },
    { x: 100, y: 180, val: 88.4, time: '10:00 AM' },
    { x: 150, y: 180, val: 88.2, time: '11:00 AM' },
    { x: 200, y: 120, val: 92.1, time: '12:00 PM' },
    { x: 250, y: 120, val: 91.8, time: '01:00 PM' },
    { x: 300, y: 60, val: 96.4, time: '02:00 PM' },
    { x: 350, y: 100, val: 94.2, time: '03:00 PM' },
    { x: 400, y: 80, val: 95.8, time: '04:00 PM' },
    { x: 450, y: 80, val: 95.5, time: '05:00 PM' },
    { x: 500, y: 20, val: 98.9, time: '06:00 PM' },
  ];
  const [hoveredData, setHoveredData] = useState(chartData[6]);

  // REUSABLE INTERNAL NAVIGATION COMPONENT
  const InternalNav = () => (
    <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div onClick={() => setCurrentView('landing')} className="font-bold text-xl tracking-tight text-white cursor-pointer hover:text-gray-300 transition">▲ Omni-Gen</div>
        <span className="text-gray-600">/</span>
        <span className="text-sm font-medium text-white">Tech4Change</span>
      </div>
      <div className="flex items-center space-x-6 text-sm">
        <button 
          onClick={() => setCurrentView('deployments')} 
          className={currentView === 'deployments' ? "text-white bg-gray-900 px-3 py-1 rounded-md border border-gray-700" : "text-gray-400 hover:text-white transition"}
        >
          Deployments
        </button>
        <button 
          onClick={() => setCurrentView('dashboard')} 
          className={currentView === 'dashboard' ? "text-white bg-gray-900 px-3 py-1 rounded-md border border-gray-700" : "text-gray-400 hover:text-white transition"}
        >
          Simulator
        </button>
        <button 
          onClick={() => setCurrentView('settings')} 
          className={currentView === 'settings' ? "text-white bg-gray-900 px-3 py-1 rounded-md border border-gray-700" : "text-gray-400 hover:text-white transition"}
        >
          Settings
        </button>
        <div className="h-4 border-l border-gray-800 mx-2"></div>
        <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2" title="Log Out">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-gray-600"></div>
        </button>
      </div>
    </nav>
  );

  // VIEW 1: LANDING PAGE
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white font-sans overflow-hidden animate-fade-in relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 blur-[120px] opacity-20 pointer-events-none"></div>

        <nav className="border-b border-gray-800 px-8 py-4 flex items-center justify-between relative z-10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center space-x-8">
            <div className="font-bold text-xl tracking-tighter cursor-pointer">▲ Omni-Gen</div>
            <div className="hidden md:flex space-x-6 text-sm text-gray-400">
              <span onClick={() => setCurrentView('solutions')} className="hover:text-white cursor-pointer transition">Solutions</span>
              <span onClick={() => setCurrentView('enterprise')} className="hover:text-white cursor-pointer transition">Enterprise</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('login')} className="text-sm font-medium text-gray-300 hover:text-white transition">Log In</button>
          </div>
        </nav>

        <main className="flex flex-col items-center justify-center px-6 pt-32 pb-20 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 max-w-5xl mx-auto leading-tight">
            Optimize production on the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">AI Cloud.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Omni-Gen provides the Golden Signature layer to build, scale, and secure your manufacturing operations. Dynamically balance quality, yield, energy, and carbon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-24 relative z-20">
            <button onClick={() => setCurrentView('login')} className="bg-white text-black px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
              ▲ Start Optimizing
            </button>
            <button onClick={() => setCurrentView('solutions')} className="bg-gray-900 border border-gray-700 text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-800 transition">
              Explore Solutions
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

  // --- VIEW 2: SOLUTIONS PAGE ---
  if (currentView === 'solutions') {
    return (
      <div className="min-h-screen bg-black text-white font-sans overflow-hidden animate-fade-in relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        
        <nav className="border-b border-gray-800 px-8 py-4 flex items-center justify-between relative z-10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center space-x-8">
            <div onClick={() => setCurrentView('landing')} className="font-bold text-xl tracking-tighter cursor-pointer hover:text-gray-300 transition">▲ Omni-Gen</div>
            <div className="hidden md:flex space-x-6 text-sm text-gray-400">
              <span className="text-white cursor-pointer transition">Solutions</span>
              <span onClick={() => setCurrentView('enterprise')} className="hover:text-white cursor-pointer transition">Enterprise</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('login')} className="text-sm font-medium text-gray-300 hover:text-white transition">Log In</button>
            <button onClick={() => setCurrentView('login')} className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-200 transition">Dashboard</button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center relative z-10">
          <div className="lg:w-1/2 pr-10 z-20">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
              Understand production <br/> from the inside out.
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Batch-level variability drives unpredictable performance. With real-time batch parameter insights and deviation scoring, Omni-Gen is the mission control for adaptive manufacturing.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setCurrentView('login')} className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition flex items-center gap-2">
                ▲ Deploy Now
              </button>
              <button className="bg-gray-900 border border-gray-800 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                Get a Demo
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[500px] w-full mt-16 lg:mt-0 select-none">
            <div className="absolute inset-0" onMouseLeave={() => setHoveredData(chartData[6])}>
              <svg viewBox="0 0 500 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(168,255,104,0.3)] overflow-visible">
                 <defs>
                   <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#d97706" />
                     <stop offset="100%" stopColor="#a3e635" />
                   </linearGradient>
                 </defs>
                 <polyline points={chartData.map(d => `${d.x},${d.y}`).join(' ')} fill="none" stroke="url(#chartGradient)" strokeWidth="3" strokeLinejoin="round" />
                 <line x1={hoveredData.x} y1={0} x2={hoveredData.x} y2={300} stroke="rgba(156, 163, 175, 0.4)" strokeWidth="1" strokeDasharray="4 4" className="transition-all duration-200" />
                 {chartData.map((pt, i) => (
                   <g key={i}>
                     <circle cx={pt.x} cy={pt.y} r={hoveredData.x === pt.x ? "6" : "3"} fill={hoveredData.x === pt.x ? "#fff" : "#a3e635"} className="transition-all duration-200" />
                     <rect x={pt.x - 25} y={0} width={50} height={300} fill="transparent" onMouseEnter={() => setHoveredData(pt)} className="cursor-crosshair" />
                   </g>
                 ))}
              </svg>

              <div className="absolute top-[20px] bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-2xl transition-all duration-200 z-30 w-36 pointer-events-none"
                style={{ 
                  left: `calc(${(hoveredData.x / 500) * 100}% + 15px)`,
                  transform: hoveredData.x > 350 ? 'translateX(-115%)' : 'translateX(0)'
                }}>
                <p className="text-xs text-gray-400 mb-1">{hoveredData.time}</p>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-gray-500 font-medium">Stability</p>
                  <p className="text-white font-mono font-bold text-lg">{hoveredData.val}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-4 bg-black/80 backdrop-blur-md border border-gray-800 rounded-lg p-4 w-64 shadow-2xl pointer-events-none">
               <div className="flex justify-between text-xs text-gray-500 mb-3 border-b border-gray-800 pb-2">
                 <span>Process Logs</span><span>13:39</span>
               </div>
               <div className="space-y-3 text-xs font-mono">
                 <div className="flex items-center gap-3">
                   <span className="text-green-500 bg-green-500/10 px-1 rounded">OPT</span> 
                   <span className="text-gray-300">/batch/T032/init</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="text-green-500 bg-green-500/10 px-1 rounded">OPT</span> 
                   <span className="text-gray-300">/sync/sensors</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="text-yellow-500 bg-yellow-500/10 px-1 rounded">WRN</span> 
                   <span className="text-gray-300">/pressure/drift</span>
                 </div>
               </div>
            </div>

            <div className="absolute top-44 right-0 bg-black/80 backdrop-blur-md border border-gray-800 rounded-lg p-4 w-56 shadow-2xl pointer-events-none">
              <div className="flex justify-between text-xs text-gray-500 mb-3 border-b border-gray-800 pb-2">
                 <span>Top Stable Batches</span><span>Yield</span>
               </div>
               <div className="space-y-4 text-xs">
                 <div className="flex justify-between items-center">
                   <span className="flex items-center gap-2 font-medium"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Batch T021</span> 
                   <span className="text-gray-400 font-mono">98.2%</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="flex items-center gap-2 font-medium"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Batch T018</span> 
                   <span className="text-gray-400 font-mono">97.8%</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="flex items-center gap-2 font-medium"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>Batch T033</span> 
                   <span className="text-gray-400 font-mono">96.5%</span>
                 </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW 3: ENTERPRISE PAGE ---
  if (currentView === 'enterprise') {
    return (
      <div className="min-h-screen bg-black text-white font-sans overflow-hidden animate-fade-in relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-900 via-transparent to-transparent opacity-30 pointer-events-none"></div>

        <nav className="border-b border-gray-800 px-8 py-4 flex items-center justify-between relative z-10 bg-black/80 backdrop-blur-md">
          <div className="flex items-center space-x-8">
            <div onClick={() => setCurrentView('landing')} className="font-bold text-xl tracking-tighter cursor-pointer hover:text-gray-300 transition">▲ Omni-Gen</div>
            <div className="hidden md:flex space-x-6 text-sm text-gray-400">
              <span onClick={() => setCurrentView('solutions')} className="hover:text-white cursor-pointer transition">Solutions</span>
              <span className="text-white cursor-pointer transition">Enterprise</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('login')} className="text-sm font-medium text-gray-300 hover:text-white transition">Log In</button>
            <button onClick={() => setCurrentView('login')} className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-200 transition">Dashboard</button>
          </div>
        </nav>

        <main className="px-6 py-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">Scale intelligence across <br/> your entire fleet.</h1>
              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                Omni-Gen Enterprise deploys our Adaptive Golden Signature Optimization Engine across multi-plant environments, enabling edge-to-cloud interoperability and unparalleled operational control.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-8 border-b border-gray-800 pb-4">Benchmarked Enterprise Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8">
                <div className="text-blue-400 font-bold text-5xl mb-4 tracking-tighter">15-25%</div>
                <p className="text-gray-300 font-medium">Reduction in average energy costs.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8">
                <div className="text-green-400 font-bold text-5xl mb-4 tracking-tighter">8-12%</div>
                <p className="text-gray-300 font-medium">Improvement in overall batch yield stability.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8">
                <div className="text-purple-400 font-bold text-5xl mb-4 tracking-tighter">30-45%</div>
                <p className="text-gray-300 font-medium">Reduction in unplanned downtime via predictive monitoring.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-8 border-b border-gray-800 pb-4">The Four Pillars of Future Scope</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              <div className="border border-gray-800 bg-black/50 p-8 rounded-xl hover:border-gray-500 transition duration-300">
                <h3 className="text-xl font-bold text-white mb-2">1. Quantum-Ready Optimization</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Utilizing quantum-inspired algorithms to solve massive multi-objective constraints in milliseconds.</p>
              </div>
              <div className="border border-gray-800 bg-black/50 p-8 rounded-xl hover:border-gray-500 transition duration-300">
                <h3 className="text-xl font-bold text-white mb-2">2. Predictive Digital Twins</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Upgrade monitoring to a Digital Twin, testing energy and quality limits in safe environments with 99% accuracy.</p>
              </div>
              <div className="border border-gray-800 bg-black/50 p-8 rounded-xl hover:border-gray-500 transition duration-300">
                <h3 className="text-xl font-bold text-white mb-2">3. Edge-to-Cloud Interoperability</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Enable seamless communication and data syncing across multiple plants globally using decentralized APIs.</p>
              </div>
              <div className="border border-gray-800 bg-black/50 p-8 rounded-xl hover:border-gray-500 transition duration-300">
                <h3 className="text-xl font-bold text-white mb-2">4. Adaptive Human-AI Symbiosis</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Developing AR interfaces that overlay AI guidance and Golden Signature targets directly onto machinery for operators.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW 4: LOGIN GATE ---
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans animate-fade-in relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="w-full max-w-md px-8 py-10 border border-gray-800 bg-gray-950/80 backdrop-blur-xl rounded-xl shadow-2xl relative z-10">
          <button onClick={() => setCurrentView('landing')} className="absolute top-6 left-6 text-gray-500 hover:text-white transition text-sm flex items-center gap-2">← Back</button>
          <div className="flex justify-center mb-8 mt-6">
            <div className="font-bold text-4xl tracking-tight text-white">▲</div>
          </div>
          <h2 className="text-2xl font-semibold text-white text-center mb-2 tracking-tight">Welcome back</h2>
          <p className="text-sm text-gray-400 text-center mb-8">Enter your plant credentials to access the simulator.</p>
          <form onSubmit={(e) => { e.preventDefault(); setCurrentView('dashboard'); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" defaultValue="engineer@tech4change.com" className="w-full bg-black border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <input type="password" defaultValue="********" className="w-full bg-black border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" required />
            </div>
            <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition-colors mt-6 relative z-20">Continue with Email</button>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW 5: SIMULATOR DASHBOARD ---
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-black text-gray-300 font-sans animate-fade-in">
        <InternalNav />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-end border-b border-gray-800 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Optimization Simulator</h1>
              <p className="text-gray-400 text-sm">Adjust process parameters and validate AI recommendations.</p>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition">Deploy Parameters</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-950 shadow-xl">
              <h2 className="text-lg font-semibold mb-6 text-white border-b border-gray-800 pb-3">Process Inputs</h2>
              <ParameterSlider label="Temperature" name="temperature" min="30" max="40" step="0.1" unit="°C" />
              <ParameterSlider label="Pressure" name="pressure" min="0.8" max="1.5" step="0.01" unit="bar" />
              <ParameterSlider label="Motor Speed" name="motorSpeed" min="90" max="150" step="1" unit="RPM" />
              <ParameterSlider label="Flow Rate" name="flowRate" min="0.5" max="2.5" step="0.01" unit="L/min" />
            </div>
            
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-950 shadow-xl flex flex-col">
              <h2 className="text-lg font-semibold mb-6 text-white border-b border-gray-800 pb-3">Golden Signature</h2>
              <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-800 rounded-lg bg-black/50 p-10 text-center">
                <p className="text-sm text-gray-500">Teammate 2: Insert Pareto Chart Here</p>
              </div>
            </div>

            <div className="border border-gray-800 rounded-xl p-6 bg-gray-950 shadow-xl flex flex-col space-y-6">
              <h2 className="text-lg font-semibold mb-2 text-white border-b border-gray-800 pb-3">AI Predictions</h2>
              
              <div className="bg-black border border-gray-800 rounded-lg p-5">
                <p className="text-sm text-gray-400 mb-2">Predicted Quality Score</p>
                <div className="flex items-baseline justify-between">
                  <span className={`text-4xl font-bold tracking-tighter ${getQualityColor(qualityScore)}`}>
                    {qualityScore}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full border border-gray-800 bg-gray-900 text-gray-300">
                    {getQualityStatus(qualityScore)}
                  </span>
                </div>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-5">
                <p className="text-sm text-gray-400 mb-2">Estimated Carbon Output</p>
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

              <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-800 rounded-lg bg-black/50 p-4 mt-2">
                <p className="text-sm text-gray-500 text-center">Teammate 2: Insert Auto-Recommendations</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW 6: DEPLOYMENTS PAGE (NEW!) ---
  if (currentView === 'deployments') {
    return (
      <div className="min-h-screen bg-black text-gray-300 font-sans animate-fade-in relative">
        <InternalNav />
        <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="flex justify-between items-end border-b border-gray-800 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Deployments</h1>
              <p className="text-gray-400 text-sm">Monitor Golden Signature parameter pushes to edge devices.</p>
            </div>
            <div className="flex gap-4">
               <input type="text" placeholder="Search deployments..." className="bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-gray-500" />
            </div>
          </div>

          <div className="border border-gray-800 rounded-xl bg-gray-950 overflow-hidden shadow-xl">
            {/* Deployment Item 1 */}
            <div className="border-b border-gray-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-900/50 transition cursor-pointer">
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <div className="mt-1 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <div>
                  <h3 className="text-white font-medium text-lg flex items-center gap-2">
                    Plant A - Line 2 <span className="text-xs font-mono bg-gray-800 px-2 py-0.5 rounded text-gray-400">production</span>
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Golden Signature v2.4 (Energy Minimization Focus)</p>
                  <p className="text-xs font-mono text-gray-500 mt-2 flex items-center gap-4">
                    <span>Target Yield: 94.2%</span> 
                    <span>Target Carbon: 132 kg CO₂e</span>
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-start md:items-end">
                <span className="text-sm text-gray-300">Deployed by Engineer (chari)</span>
                <span className="text-xs text-gray-500 mt-1">12m ago • 4.2s execution time</span>
                <button className="text-xs text-gray-400 border border-gray-700 hover:bg-gray-800 px-3 py-1 rounded mt-2 transition">View Logs</button>
              </div>
            </div>

            {/* Deployment Item 2 */}
            <div className="border-b border-gray-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-900/50 transition cursor-pointer">
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <div>
                  <h3 className="text-white font-medium text-lg flex items-center gap-2">
                    Plant B - Line 1 <span className="text-xs font-mono bg-gray-800 px-2 py-0.5 rounded text-gray-400">staging</span>
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Edge Node Sync (Model Weight Update)</p>
                  <p className="text-xs font-mono text-gray-500 mt-2 flex items-center gap-4">
                    <span>Syncing digital twin telemetry...</span>
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-start md:items-end">
                <span className="text-sm text-gray-300">Automated System Push</span>
                <span className="text-xs text-blue-400 mt-1">In Progress • 45s</span>
                <button className="text-xs text-gray-400 border border-gray-700 hover:bg-gray-800 px-3 py-1 rounded mt-2 transition">Cancel</button>
              </div>
            </div>

            {/* Deployment Item 3 */}
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-900/50 transition cursor-pointer">
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <div className="mt-1 w-3 h-3 rounded-full bg-gray-600"></div>
                <div>
                  <h3 className="text-white font-medium text-lg flex items-center gap-2">
                    Plant A - Line 3 <span className="text-xs font-mono bg-gray-800 px-2 py-0.5 rounded text-gray-400">production</span>
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Golden Signature v2.1 (Legacy Configuration)</p>
                  <p className="text-xs font-mono text-gray-500 mt-2 flex items-center gap-4">
                    <span>Target Yield: 91.0%</span> 
                    <span>Target Carbon: 145 kg CO₂e</span>
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-start md:items-end">
                <span className="text-sm text-gray-300">Deployed via API</span>
                <span className="text-xs text-gray-500 mt-1">2d ago • 3.8s execution time</span>
                <button className="text-xs text-gray-400 border border-gray-700 hover:bg-gray-800 px-3 py-1 rounded mt-2 transition">Redeploy</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW 7: SETTINGS PAGE (NEW!) ---
  if (currentView === 'settings') {
    return (
      <div className="min-h-screen bg-black text-gray-300 font-sans animate-fade-in relative">
        <InternalNav />
        <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row gap-10">
          
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <h1 className="text-2xl font-bold tracking-tight mb-6 text-white">Settings</h1>
            <div className="flex flex-col space-y-1">
               <button className="text-left px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">General</button>
               <button className="text-left px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-md transition">Edge Interoperability</button>
               <button className="text-left px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-md transition">Optimization Bounds</button>
               <button className="text-left px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-md transition">Security & Tokens</button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 max-w-3xl">
            {/* Section 1 */}
            <div className="border border-gray-800 rounded-xl bg-gray-950 p-6 shadow-xl mb-8">
               <h2 className="text-lg font-semibold text-white mb-2">Project Details</h2>
               <p className="text-sm text-gray-400 mb-6">Manage the overarching configuration for your Omni-Gen factory fleet.</p>
               
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
                   <input type="text" defaultValue="Tech4Change Primary Fleet" className="w-full bg-black border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-gray-500 transition" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-1">Primary Optimization Goal</label>
                   <select className="w-full bg-black border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-gray-500 transition appearance-none">
                     <option>Balanced (Yield & Energy)</option>
                     <option>Maximum Carbon Reduction</option>
                     <option>Maximum Yield (Highest Energy Limit)</option>
                   </select>
                 </div>
               </div>
               <div className="mt-6 border-t border-gray-800 pt-4 flex justify-end">
                 <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition">Save Changes</button>
               </div>
            </div>

            {/* Section 2 (Edge to Cloud Interoperability) */}
            <div className="border border-gray-800 rounded-xl bg-gray-950 p-6 shadow-xl mb-8">
               <h2 className="text-lg font-semibold text-white mb-2">Edge-to-Cloud Syncing</h2>
               <p className="text-sm text-gray-400 mb-6">Configure telemetry intervals between the Digital Twin and physical plant edge APIs[cite: 184, 185].</p>
               
               <div className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-white">Continuous Learning Sync</h3>
                    <p className="text-xs text-gray-500 mt-1">Automatically push new Pareto-optimal signatures to machines.</p>
                  </div>
                  {/* Mock Toggle Switch */}
                  <div className="w-10 h-5 bg-green-500 rounded-full flex items-center p-1 cursor-pointer">
                     <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-4"></div>
                  </div>
               </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-900/50 rounded-xl bg-black p-6 shadow-xl">
               <h2 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h2>
               <p className="text-sm text-gray-400 mb-6">Irreversible actions regarding your optimization models.</p>
               
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Purge Model Weights</h3>
                    <p className="text-xs text-gray-500 mt-1">Delete all learned historical batch data and reset NSGA-II to baseline.</p>
                  </div>
                  <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 hover:text-white transition">Reset AI Core</button>
               </div>
            </div>

          </div>
        </main>
      </div>
    );
  }
}

export default App;