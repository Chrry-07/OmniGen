import React, { useState, useEffect } from 'react';
import {
  Thermometer, Gauge, Zap, Wind,
  Droplets, ArrowDownToLine, Plug, Activity,
  Sparkles, CheckCircle2, AlertTriangle, XCircle
} from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000";
const OPTIMAL = { 
  temperature: 34.3, 
  pressure: 0.98, 
  humidity: 37.1, 
  motorSpeed: 116, 
  compression: 4.85, 
  flowRate: 1.30, 
  power: 23.5, 
  vibration: 3.1 
};

const DeploymentTable = ({ currentParams }) => {
  const rows = [
    { label: 'Temperature', key: 'temperature', unit: '°C' },
    { label: 'Pressure', key: 'pressure', unit: 'bar' },
    { label: 'Humidity', key: 'humidity', unit: '%' },
    { label: 'Motor Speed', key: 'motorSpeed', unit: 'RPM' },
    { label: 'Compression Force', key: 'compression', unit: 'kN' },
    { label: 'Flow Rate', key: 'flowRate', unit: 'L/min' },
    { label: 'Power Consumption', key: 'power', unit: 'kW' },
    { label: 'Vibration', key: 'vibration', unit: 'mm/s' },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-black/20">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-4 py-3 font-medium">Parameter</th>
            <th className="px-4 py-3 font-medium text-right">Current Target</th>
            <th className="px-4 py-3 font-medium text-right text-blue-400">AI Golden Target</th>
            <th className="px-4 py-3 font-medium text-right">Delta Push</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {rows.map((row) => {
            const current = currentParams[row.key];
            const target = OPTIMAL[row.key];
            const delta = (target - current).toFixed(2);
            return (
              <tr key={row.key} className="border-b border-gray-800/50">
                <td className="px-4 py-3 font-medium text-gray-300">{row.label}</td>
                <td className="px-4 py-3 text-right text-gray-500 font-mono">{current} {row.unit}</td>
                <td className="px-4 py-3 text-right text-white font-mono font-bold">{target} {row.unit}</td>
                <td className={`px-4 py-3 text-right font-mono ${delta == 0 ? 'text-gray-600' : 'text-blue-500'}`}>
                  {delta > 0 ? `+${delta}` : delta}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ParetoChart = ({ data, pareto }) => {
  const optX = 150;
  const optY = 150;

  const tempDev = data.temperature - OPTIMAL.temperature;
  const motorDev = data.motorSpeed - OPTIMAL.motorSpeed;
  const flowDev = data.flowRate - OPTIMAL.flowRate;
  const pressDev = data.pressure - OPTIMAL.pressure;
  const compDev = data.compression - OPTIMAL.compression;
  const pwrDev = data.power - OPTIMAL.power;

  let curX = optX + (tempDev * 10) + (motorDev * 1) + (pwrDev * 5);
  let curY = optY - (flowDev * 30) - (pressDev * 50) + (compDev * 15);
  curX = Math.max(50, Math.min(290, curX));
  curY = Math.max(40, Math.min(270, curY));

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center p-2 relative select-none overflow-visible">
      {}
      <svg viewBox="0 0 320 320" className="w-full h-full">
        {}
        <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
          {[90, 140, 190, 240].map(line => (
            <line key={`v-${line}`} x1={line} y1="30" x2={line} y2="290" />
          ))}
          {[80, 130, 180, 230].map(line => (
            <line key={`h-${line}`} x1="40" y1={line} x2="300" y2={line} />
          ))}
        </g>
        <text x="60" y="40" fill="#3b82f6" fontSize="10" fontWeight="600">
        AI Pareto Frontier
        </text>
        {pareto && pareto.energy && pareto.energy.map((e, i) => {
        const x = 40 + (pareto.energy[i] * 8);
        const y = 300 - ((pareto.quality[i] - 94) * 150);

        return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          fill="#3b82f6"
          opacity="0.8"
        >
          <title>
            Energy: {pareto.energy[i]} | Quality: {pareto.quality[i]}
          </title>
        </circle>
        );
      })}

        {/* Axes - Pushed inward so they don't clip at the edges */}
        <line x1="40" y1="290" x2="300" y2="290" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <line x1="40" y1="30" x2="40" y2="290" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        
        {/* Axis Labels */}
        <text x="170" y="310" fill="#9ca3af" fontSize="11" textAnchor="middle" fontWeight="600">Energy (Minimize) →</text>
        <text x="-165" y="20" transform="rotate(-90)" fill="#9ca3af" fontSize="11" textAnchor="middle" fontWeight="600">Yield (Maximize) →</text>

        {/* Pareto Frontier Curve
        <path d="M 30,250 Q 80,80 280,40" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="5 5" /> */}

        {/* Historical Sub-optimal Batches (Context noise) */}
        <circle cx="160" cy="110" r="2.5" fill="rgba(255, 255, 255, 0.1)" />
        <circle cx="210" cy="150" r="2.5" fill="rgba(255, 255, 255, 0.1)" />
        <circle cx="100" cy="220" r="2.5" fill="rgba(255, 255, 255, 0.1)" />
        <circle cx="250" cy="190" r="2.5" fill="rgba(255, 255, 255, 0.1)" />

        {/* Drift Warning Line */}
        {(Math.abs(curX - optX) > 2 || Math.abs(curY - optY) > 2) && (
          <line x1={optX} y1={optY} x2={curX} y2={curY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" className="transition-all duration-300" />
        )}

        {/* Optimal Point (The Golden Signature) */}
        <circle cx={optX} cy={optY} r="6" fill="#3b82f6" />
        <circle cx={optX} cy={optY} r="16" fill="rgba(59, 130, 246, 0.2)" className="animate-pulse" />
        <text x={optX + 14} y={optY + 4} fill="#3b82f6" fontSize="10" fontWeight="600">Golden Signature</text>

        {/* Current Operating Point */}
        <circle cx={curX} cy={curY} r="6" fill="#a3e635" className="transition-all duration-300" />
        <text
        x={curX + 10}
        y={curY - 6}
        fill="#a3e635"
        fontSize="10"
        fontWeight="600"
      >
      Current State
      </text>
        <circle cx={curX} cy={curY} r="14" fill="rgba(163, 230, 53, 0.3)" className="animate-pulse transition-all duration-300" />
      </svg>
    </div>
  );
};

const Recommendations = ({ currentParams }) => {
  const recs = [];

  const addRec = (param, optimal, title, Icon, colorClass, diff) => {
    if (currentParams[param] > optimal + (optimal * 0.02)) {
      recs.push({ title: `Reduce ${title}`, icon: <Icon className={`w-4 h-4 ${colorClass}`} />, diff: (currentParams[param] - optimal).toFixed(diff) });
    } else if (currentParams[param] < optimal - (optimal * 0.02)) {
      recs.push({ title: `Increase ${title}`, icon: <Icon className={`w-4 h-4 ${colorClass}`} />, diff: (optimal - currentParams[param]).toFixed(diff) });
    }
  };

  addRec('temperature', OPTIMAL.temperature, 'Temperature', Thermometer, 'text-orange-500', 1);
  addRec('pressure', OPTIMAL.pressure, 'Pressure', Gauge, 'text-blue-400', 2);
  addRec('humidity', OPTIMAL.humidity, 'Humidity', Droplets, 'text-cyan-300', 1);
  addRec('motorSpeed', OPTIMAL.motorSpeed, 'Motor Speed', Zap, 'text-yellow-400', 0);
  addRec('compression', OPTIMAL.compression, 'Compression', ArrowDownToLine, 'text-purple-400', 2);
  addRec('flowRate', OPTIMAL.flowRate, 'Flow Rate', Wind, 'text-teal-400', 2);
  addRec('power', OPTIMAL.power, 'Power Limit', Plug, 'text-red-400', 1);
  addRec('vibration', OPTIMAL.vibration, 'Vibration', Activity, 'text-pink-400', 1);

  if (recs.length === 0) {
    return (
      <div className="flex items-center justify-between border border-green-500/30 bg-green-500/5 px-4 py-3 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-green-500/20 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          </div>
          <span className="text-green-400 font-medium text-sm">Operating at Pareto Optimal Efficiency</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4 max-h-[260px] overflow-y-auto pr-4 pl-2 custom-scrollbar">
      {recs.slice(0, 5).map((rec, index) => (
        <div key={index} className="flex items-center justify-between border border-gray-800 bg-gray-950/40 hover:bg-gray-900 transition-colors px-4 py-3 rounded-lg">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center bg-black rounded p-1.5 border border-gray-800">
              {rec.icon}
            </div>
            <span className="text-white font-medium text-[13px]">{rec.title}</span>
          </div>
          <span className="text-gray-500 text-sm font-mono tracking-tight">
            by <span className="text-gray-300 ml-1">{rec.diff}</span>
          </span>
        </div>
      ))}
      {recs.length > 5 && (
        <div className="text-center text-xs text-gray-500 mt-3 font-medium">+ {recs.length - 5} more deviations</div>
      )}
    </div>
  );
};

const BatchMonitor = ({ currentScore, history }) => {
  const rows = history || [];

  return (
    <div className="w-full">
      <table className="w-full text-left text-sm">
        <thead className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-800">
          <tr>
            <th className="pb-4 px-4 font-medium">Batch_ID</th>
            <th className="pb-4 px-4 font-medium text-right">SSI Score</th>
            <th className="pb-4 px-4 font-medium text-right">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800/50">
          {rows.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500">
                Loading SSI data...
              </td>
            </tr>
          )}

          {rows.map((batch, i) => (
            <tr key={i}>
              <td className="py-4 px-4 font-mono text-gray-300">
                {batch.Batch_ID}
              </td>

              <td className="py-4 px-4 text-right font-mono text-gray-300">
                {batch.SSI}
              </td>

              <td className="py-4 px-4 text-right">
                {batch.status === "GREEN" && (
                  <span className="text-green-500 font-semibold">GREEN</span>
                )}
                {batch.status === "AMBER" && (
                  <span className="text-yellow-500 font-semibold">AMBER</span>
                )}
                {batch.status === "RED" && (
                  <span className="text-red-500 font-semibold">RED</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDeploying, setIsDeploying] = useState(false);

  const [parameters, setParameters] = useState({ ...OPTIMAL });
  const [qualityScore, setQualityScore] = useState(95);
  const [paretoData, setParetoData] = useState(null);
  const [ssiHistory, setSsiHistory] = useState([]);
  const chartData = [
    { x: 40, y: 220, time: '00:00', val: 72 },
    { x: 100, y: 180, time: '02:00', val: 78 },
    { x: 160, y: 140, time: '04:00', val: 85 },
    { x: 220, y: 110, time: '06:00', val: 88 },
    { x: 280, y: 90, time: '08:00', val: 91 },
    { x: 340, y: 70, time: '10:00', val: 93 },
    { x: 400, y: 60, time: '12:00', val: 95 },
  ];

  const [hoveredData, setHoveredData] = useState(chartData[6]);

  const handleParamChange = (name, value) => {
    setParameters(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSnapToGolden = async () => {
    try {
      const res = await fetch(`${API_BASE}/golden_signature`);
      const data = await res.json();
  
      const values = data["0"];
  
      setParameters({
        temperature: Number(values["0"]).toFixed(1),
        pressure: Number(values["1"]).toFixed(2),
        humidity: Number(values["2"]).toFixed(1),
        motorSpeed: Math.round(values["3"]),
        compression: Number(values["4"]).toFixed(2),
        flowRate: Number(values["5"]).toFixed(2),
        power: Number(values["6"]).toFixed(1),
        vibration: Number(values["7"]).toFixed(1)
      });
  
    } catch (err) {
      console.error("Snap error:", err);
    }
  };
  
    const fetchSSI = async () => {
      try {
        const response = await fetch(`${API_BASE}/ssi`);
        const data = await response.json();
    
        console.log("SSI DATA:", data);
    
        setSsiHistory(data);
    
        if (data.length > 0) {
          setQualityScore(data[0].SSI);
        }
    
      } catch (error) {
        console.error("SSI API error:", error);
      }
    };
    
    const fetchPareto = async () => {
      try {
        const response = await fetch(`${API_BASE}/pareto_chart`);
        const data = await response.json();
        setParetoData(data);
      } catch (error) {
        console.error("Pareto error:", error);
      }
    };

    useEffect(() => {
      fetchSSI();
      fetchPareto();
    }, [parameters]);
  const calculateMetrics = () => {
    let penalty = 0;
    penalty += Math.abs(parameters.temperature - OPTIMAL.temperature) * 10;
    penalty += Math.abs(parameters.pressure - OPTIMAL.pressure) * 100;
    penalty += Math.abs(parameters.humidity - OPTIMAL.humidity) * 2;
    penalty += Math.abs(parameters.motorSpeed - OPTIMAL.motorSpeed) * 0.5;
    penalty += Math.abs(parameters.compression - OPTIMAL.compression) * 20;
    penalty += Math.abs(parameters.flowRate - OPTIMAL.flowRate) * 50;
    penalty += Math.abs(parameters.power - OPTIMAL.power) * 5;
    penalty += Math.abs(parameters.vibration - OPTIMAL.vibration) * 30;

    const qualityScore = Math.max(0, 100 - penalty).toFixed(1);
    
    const carbonBase = 120;
    const carbonOutput = (
      carbonBase + 
      (parameters.power - 20) * 1.5 + 
      (parameters.temperature - 30) * 0.5 +
      (parameters.motorSpeed - 100) * 0.1
    ).toFixed(0);

    return { qualityScore, carbonOutput };
  };

  const { carbonOutput } = calculateMetrics();

  const getQualityColor = (score) => {
    const s = Number(score);
    if (s >= 90) return 'text-green-500';
    if (s >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityStatus = (score) => {
    const s = Number(score);
    if (s >= 90) return 'Stable Batch';
    if (s >= 75) return 'Monitor Drift';
    return 'Defect Risk High';
  };

  const ParameterSlider = ({ label, name, min, max, step, unit }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-xs font-mono bg-black px-2 py-1 rounded text-gray-300 border border-gray-800 shadow-inner">
          {parameters[name]} {unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={parameters[name]} onChange={(e) => handleParamChange(name, e.target.value)}
        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-blue-400 transition-all"
      />
    </div>
  );

  const InternalNav = () => (
    <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between relative z-10 bg-black/80 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <div onClick={() => setCurrentView('landing')} className="font-bold text-xl tracking-tight text-white cursor-pointer hover:text-gray-300 transition">▲ Omni-Gen</div>
        <span className="text-gray-600">/</span>
        <span className="text-sm font-medium text-white flex items-center gap-2">
          Tech4Change <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]" title="API Connected"></span>
        </span>
      </div>
      <div className="flex items-center space-x-6 text-sm">
        <button onClick={() => setCurrentView('deployments')} className={currentView === 'deployments' ? "text-white bg-gray-900 px-3 py-1 rounded-md border border-gray-700" : "text-gray-400 hover:text-white transition"}>Deployments</button>
        <button onClick={() => setCurrentView('dashboard')} className={currentView === 'dashboard' ? "text-white bg-gray-900 px-3 py-1 rounded-md border border-gray-700" : "text-gray-400 hover:text-white transition"}>Simulator</button>
        <button onClick={() => setCurrentView('settings')} className={currentView === 'settings' ? "text-white bg-gray-900 px-3 py-1 rounded-md border border-gray-700" : "text-gray-400 hover:text-white transition"}>Settings</button>
        <div className="h-4 border-l border-gray-800 mx-2"></div>
        <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2" title="Log Out">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-gray-600"></div>
        </button>
      </div>
    </nav>
  );

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

 //SOLUTIONS PAGE
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
                 <div className="flex items-center gap-3"><span className="text-green-500 bg-green-500/10 px-1 rounded">OPT</span> <span className="text-gray-300">/batch/T032/init</span></div>
                 <div className="flex items-center gap-3"><span className="text-green-500 bg-green-500/10 px-1 rounded">OPT</span> <span className="text-gray-300">/sync/sensors</span></div>
                 <div className="flex items-center gap-3"><span className="text-yellow-500 bg-yellow-500/10 px-1 rounded">WRN</span> <span className="text-gray-300">/pressure/drift</span></div>
               </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  //ENTERPRISE PAGE
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

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-black text-gray-300 font-sans animate-fade-in relative overflow-x-hidden flex flex-col">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
        `}</style>
        
        <InternalNav />
        
        <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 py-8">
          <div className="flex justify-between items-end border-b border-gray-800 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Optimization Simulator</h1>
              <p className="text-gray-400 text-sm">Adjust all 8 process parameters and monitor the batch stability score.</p>
            </div>
            <button onClick={() => setIsDeploying(true)} className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Deploy Optimized Parameters
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* COLUMN 1: PROCESS INPUTS */}
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-950 shadow-xl lg:col-span-3 flex flex-col min-h-[600px]">
              <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-3">
                <h2 className="text-lg font-semibold text-white">Process Inputs</h2>
                <button 
                  onClick={handleSnapToGolden}
                  className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded flex items-center gap-1.5 hover:bg-blue-500/20 transition"
                >
                  <Sparkles className="w-3 h-3" /> Snap
                </button>
              </div>
              <div className="flex flex-col gap-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                <ParameterSlider label="Temperature" name="temperature" min="30" max="40" step="0.1" unit="°C" />
                <ParameterSlider label="Pressure" name="pressure" min="0.8" max="1.5" step="0.01" unit="bar" />
                <ParameterSlider label="Humidity" name="humidity" min="30" max="50" step="0.1" unit="%" />
                <ParameterSlider label="Motor Speed" name="motorSpeed" min="90" max="150" step="1" unit="RPM" />
                <ParameterSlider label="Compression" name="compression" min="3.0" max="6.0" step="0.05" unit="kN" />
                <ParameterSlider label="Flow Rate" name="flowRate" min="0.5" max="2.5" step="0.01" unit="L/min" />
                <ParameterSlider label="Power Limit" name="power" min="15" max="35" step="0.1" unit="kW" />
                <ParameterSlider label="Vibration" name="vibration" min="1.0" max="6.0" step="0.1" unit="mm/s" />
              </div>
            </div>
            
            {/* COLUMN 2: CHARTS & BATCH MONITOR */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="border border-gray-800 rounded-xl p-6 bg-gray-950 shadow-xl flex flex-col h-[480px]">
                <div className="flex justify-between items-center mb-3 border-b border-gray-800 pb-2">
                  <h2 className="text-lg font-semibold text-white">Pareto Chart</h2>

                  <button
                    onClick={fetchPareto}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Run AI Optimization
                  </button>
                </div>
                <div className="flex-grow w-full bg-black/40 rounded-lg overflow-hidden border border-gray-900 shadow-inner">
                  <ParetoChart data={parameters} pareto={paretoData} />
                </div>
                <div className="text-xs text-gray-400 mt-3 px-2">
                AI uses multi-objective optimization (NSGA-II) to identify optimal manufacturing configurations that maximize yield while minimizing energy and carbon emissions.
                </div>
              </div>
              
              <div className="border border-gray-800 rounded-xl p-6 bg-gray-950 shadow-xl flex-grow flex flex-col">
                <h2 className="text-lg font-semibold mb-4 text-white border-b border-gray-800 pb-2 flex items-center justify-between">
                  <span>Batch Stability Monitor (SSI)</span>
                  <span className="text-[10px] font-mono text-gray-500 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">GET /ssi</span>
                </h2>
                <div className="bg-black/40 rounded-lg border border-gray-900 overflow-hidden flex-grow">
                  <BatchMonitor currentScore={qualityScore} history={ssiHistory} />
                </div>
              </div>
            </div>

            {/* COLUMN 3: PREDICTIONS & RECOMMENDATIONS */}
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-950 shadow-xl lg:col-span-3 flex flex-col min-h-[600px]">
              <h2 className="text-lg font-semibold mb-5 text-white border-b border-gray-800 pb-2">AI Predictions</h2>
              
              <div className="bg-black border border-gray-800 rounded-lg p-5 shadow-inner mb-5">
                <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Stability Score (SSI)</p>
                <div className="flex items-baseline justify-between">
                  <span className={`text-5xl font-bold tracking-tighter ${getQualityColor(qualityScore)}`}>
                    {qualityScore}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                    qualityScore >= 90 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                    qualityScore >= 75 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                    'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {getQualityStatus(qualityScore)}
                  </span>
                </div>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-5 shadow-inner mb-6">
                <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Estimated Carbon</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold tracking-tighter text-white">
                    {carbonOutput} <span className="text-sm text-gray-500 font-normal">kg CO₂e</span>
                  </span>
                  {Number(carbonOutput) > 135 && (
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 rounded border border-red-500/20 px-2 py-1 uppercase">
                      High Emissions
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex-grow flex flex-col">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>Live Corrections</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
                </h3>
                <Recommendations currentParams={parameters} />
              </div>
            </div>
          </div>
        </main>

        {/* MODAL POPUP FOR DEPLOYMENT */}
        {isDeploying && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-950 border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-500" /> Review Setpoint Deployment
                </h2>
                <p className="text-sm text-gray-400 mt-1">Human-in-the-Loop required. Confirming these changes will synchronize hardware APIs with AI targets.</p>
              </div>
              <div className="p-6 bg-black">
                <DeploymentTable currentParams={parameters} />
              </div>
              <div className="p-6 bg-gray-950 flex justify-end gap-3 border-t border-gray-800">
                <button onClick={() => setIsDeploying(false)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button 
                  onClick={() => {
                    handleSnapToGolden();
                    setIsDeploying(false);
                    setCurrentView('deployments');
                  }}
                  className="px-6 py-2 bg-white text-black text-sm font-bold rounded-md hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  Confirm & Sync to Edge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  //DEPLOYMENTS PAGE
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
                <span className="text-xs text-gray-500 mt-1">Just now • 4.2s execution time</span>
                <button className="text-xs text-gray-400 border border-gray-700 hover:bg-gray-800 px-3 py-1 rounded mt-2 transition">View Logs</button>
              </div>
            </div>

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

  //SETTINGS PAGE
  if (currentView === 'settings') {
    return (
      <div className="min-h-screen bg-black text-gray-300 font-sans animate-fade-in relative">
        <InternalNav />
        <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row gap-10">
          
          <div className="w-full md:w-64 shrink-0">
            <h1 className="text-2xl font-bold tracking-tight mb-6 text-white">Settings</h1>
            <div className="flex flex-col space-y-1">
               <button className="text-left px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">General</button>
               <button className="text-left px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-md transition">Edge Interoperability</button>
               <button className="text-left px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-md transition">Optimization Bounds</button>
               <button className="text-left px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-md transition">Security & Tokens</button>
            </div>
          </div>

          <div className="flex-1 max-w-3xl">
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

            <div className="border border-gray-800 rounded-xl bg-gray-950 p-6 shadow-xl mb-8">
               <h2 className="text-lg font-semibold text-white mb-2">Edge-to-Cloud Syncing</h2>
               <p className="text-sm text-gray-400 mb-6">Configure telemetry intervals between the Digital Twin and physical plant edge APIs.</p>
               
               <div className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-white">Continuous Learning Sync</h3>
                    <p className="text-xs text-gray-500 mt-1">Automatically push new Pareto-optimal signatures to machines.</p>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full flex items-center p-1 cursor-pointer">
                     <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-4"></div>
                  </div>
               </div>
            </div>

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