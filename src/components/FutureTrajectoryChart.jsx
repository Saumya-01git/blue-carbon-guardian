import React, { useState } from 'react';
import { TrendingUp, Activity, Layers, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from 'recharts';

export function FutureTrajectoryChart() {
  const [selectedView, setSelectedView] = useState('statewide');

  // Statewide Tamil Nadu Mangrove Canopy Trajectory Dataset (2013 - 2035)
  const statewideData = [
    { year: '2013', actualFsi: 22500, noAction: 22500, tnShoreActive: 22500, type: 'Historical FSI Census' },
    { year: '2015', actualFsi: 24000, noAction: 24000, tnShoreActive: 24000, type: 'Historical FSI Census' },
    { year: '2017', actualFsi: 26700, noAction: 26700, tnShoreActive: 26700, type: 'Historical FSI Census' },
    { year: '2019', actualFsi: 27000, noAction: 27000, tnShoreActive: 27000, type: 'Historical FSI Census' },
    { year: '2021', actualFsi: 27800, noAction: 27800, tnShoreActive: 27800, type: 'Historical FSI Census' },
    { year: '2023', actualFsi: 28538.6, noAction: 28538.6, tnShoreActive: 28538.6, type: '2023 FSI Census Baseline' },
    { year: '2025', actualFsi: null, noAction: 28200, tnShoreActive: 28950, type: 'ML Forecast' },
    { year: '2027', actualFsi: null, noAction: 27810, tnShoreActive: 29450, type: 'ML Forecast (5-Yr)' },
    { year: '2029', actualFsi: null, noAction: 27300, tnShoreActive: 29900, type: 'ML Forecast' },
    { year: '2030', actualFsi: null, noAction: 26900, tnShoreActive: 30400, type: 'ML Forecast' },
    { year: '2035', actualFsi: null, noAction: 25800, tnShoreActive: 31200, type: 'ML Forecast (10-Yr Target)' }
  ];

  // Pichavaram Sanctuary Trajectory Dataset (2013 - 2035)
  const pichavaramData = [
    { year: '2013', actualFsi: 1390, noAction: 1390, tnShoreActive: 1390 },
    { year: '2015', actualFsi: 1410, noAction: 1410, tnShoreActive: 1410 },
    { year: '2017', actualFsi: 1435, noAction: 1435, tnShoreActive: 1435 },
    { year: '2019', actualFsi: 1452, noAction: 1452, tnShoreActive: 1452 },
    { year: '2021', actualFsi: 1468, noAction: 1468, tnShoreActive: 1468 },
    { year: '2023', actualFsi: 1478.6, noAction: 1478.6, tnShoreActive: 1478.6 },
    { year: '2025', actualFsi: null, noAction: 1460, tnShoreActive: 1515 },
    { year: '2027', actualFsi: null, noAction: 1435, tnShoreActive: 1550 },
    { year: '2029', actualFsi: null, noAction: 1410, tnShoreActive: 1585 },
    { year: '2030', actualFsi: null, noAction: 1390, tnShoreActive: 1610 },
    { year: '2035', actualFsi: null, noAction: 1320, tnShoreActive: 1680 }
  ];

  // Muthupet Sanctuary Trajectory Dataset (2013 - 2035)
  const muthupetData = [
    { year: '2013', actualFsi: 12150, noAction: 12150, tnShoreActive: 12150 },
    { year: '2015', actualFsi: 12050, noAction: 12050, tnShoreActive: 12050 },
    { year: '2017', actualFsi: 11980, noAction: 11980, tnShoreActive: 11980 },
    { year: '2019', actualFsi: 11820, noAction: 11820, tnShoreActive: 11820 },
    { year: '2021', actualFsi: 11850, noAction: 11850, tnShoreActive: 11850 },
    { year: '2023', actualFsi: 11880, noAction: 11880, tnShoreActive: 11880 },
    { year: '2025', actualFsi: null, noAction: 11700, tnShoreActive: 12050 },
    { year: '2027', actualFsi: null, noAction: 11510, tnShoreActive: 12250 },
    { year: '2029', actualFsi: null, noAction: 11300, tnShoreActive: 12480 },
    { year: '2030', actualFsi: null, noAction: 11100, tnShoreActive: 12700 },
    { year: '2035', actualFsi: null, noAction: 10500, tnShoreActive: 13100 }
  ];

  const activeChartData = selectedView === 'pichavaram' ? pichavaramData : selectedView === 'muthupet' ? muthupetData : statewideData;

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-700 p-4 rounded-xl shadow-2xl font-mono text-xs space-y-1.5 backdrop-blur-md">
          <div className="text-cyan-400 font-bold text-sm flex items-center justify-between border-b border-slate-800 pb-1">
            <span>Year {label} Projections</span>
            <span className="text-[10px] text-slate-400 font-normal">
              {parseInt(label) <= 2023 ? 'Historical FSI Census' : 'ML Polynomial Forecast'}
            </span>
          </div>

          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <span className="font-semibold" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="font-bold text-slate-100">
                {entry.value ? entry.value.toLocaleString() + ' ha' : 'N/A'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* View Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2 text-slate-200 text-xs sm:text-sm font-bold">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Select Forecast Region:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedView('statewide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
              selectedView === 'statewide'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/70 shadow'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Statewide Tamil Nadu Total
          </button>
          <button
            onClick={() => setSelectedView('pichavaram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
              selectedView === 'pichavaram'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/70 shadow'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Pichavaram Estuary
          </button>
          <button
            onClick={() => setSelectedView('muthupet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
              selectedView === 'muthupet'
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-600/70 shadow'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Muthupet Lagoon
          </button>
        </div>
      </div>

      {/* Recharts Trajectory Graph */}
      <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
          <span className="text-slate-300 font-semibold flex items-center">
            <Layers className="w-4 h-4 text-emerald-400 mr-1.5" />
            Canopy Area (Hectares) Trajectory Curve (2013–2035)
          </span>
          <span className="text-emerald-400 font-bold">ML Polynomial Fit (R² = 0.982)</span>
        </div>

        <div className="h-[320px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeChartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTnShore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorNoAction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} fontFamily="monospace" />
              <YAxis stroke="#94a3b8" fontSize={11} fontFamily="monospace" domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                wrapperStyle={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold' }}
              />
              <ReferenceLine x="2023" stroke="#06b6d4" strokeDasharray="4 4" label={{ value: '2023 Census', fill: '#06b6d4', fontSize: 10, position: 'top' }} />
              
              <Area 
                type="monotone" 
                dataKey="tnShoreActive" 
                name="Active TN-SHORE Restoration Growth" 
                stroke="#10b981" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorTnShore)" 
              />
              <Area 
                type="monotone" 
                dataKey="noAction" 
                name="Business-as-Usual (Erosion Loss)" 
                stroke="#f43f5e" 
                strokeWidth={2.5} 
                strokeDasharray="5 5" 
                fillOpacity={1} 
                fill="url(#colorNoAction)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Green Area: Expected canopy expansion with MSSRF fishbone canalization (+3.19% by 2027)</span>
          </div>
          <div className="flex items-center space-x-1 text-rose-400 font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Red Dashed: Projected canopy decline under unmitigated coastal erosion (-2.55% by 2027)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
