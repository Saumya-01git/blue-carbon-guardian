import React, { useState } from 'react';
import { BarChart3, CloudRain, Thermometer, ShieldCheck, TreePine, ArrowUpRight, ArrowDownRight, Activity, Waves, Wind, ShieldAlert, PieChart as PieIcon, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';

export function ClimateComparison({ locations, environmentalData, fsiMangroveTrends, cycloneHistory }) {
  const [activeTab, setActiveTab] = useState('mangroveFsi');

  // Build comparison datasets
  const comparisonData = locations.map(loc => {
    const records = environmentalData.filter(d => d.locationId === loc.id);
    const maxTemp = records.find(r => r.parameter === 'Mean Daily Max Temperature');
    const minTemp = records.find(r => r.parameter === 'Mean Daily Min Temperature');
    const rainfall = records.find(r => r.parameter === 'Annual Rainfall Normal');
    const erosion = records.find(r => r.parameter.includes('Erosion'));
    const seaLevel = records.find(r => r.parameter.includes('Sea Level'));

    return {
      id: loc.id,
      name: loc.name,
      district: loc.district,
      category: loc.ecosystemCategory,
      maxTemp: maxTemp && typeof maxTemp.value === 'number' ? maxTemp.value : null,
      minTemp: minTemp && typeof minTemp.value === 'number' ? minTemp.value : null,
      rainfall: rainfall && typeof rainfall.value === 'number' ? rainfall.value : null,
      erosionPercent: erosion && typeof erosion.value === 'number' ? erosion.value : null,
      seaLevelMmYr: seaLevel && typeof seaLevel.value === 'number' ? seaLevel.value : null,
      areaHectares: loc.areaHectares || null
    };
  });

  // FSI ISFR Multi-Year Cycles Data (2013-2023)
  const statewideFsi = fsiMangroveTrends && fsiMangroveTrends.statewide ? fsiMangroveTrends.statewide : [];

  // FSI ISFR 2023 Mangrove Canopy Density Class Breakdown (Tamil Nadu)
  const fsiDensityData = [
    { name: 'Very Dense Mangrove (VDM)', value: 100, unit: 'ha (1 sq km)', fill: '#047857', desc: 'Canopy density > 70%' },
    { name: 'Moderately Dense Mangrove (MDM)', value: 2700, unit: 'ha (27 sq km)', fill: '#10b981', desc: 'Canopy density 40% - 70%' },
    { name: 'Open Mangrove (OM)', value: 1700, unit: 'ha (17 sq km)', fill: '#34d399', desc: 'Canopy density 10% - 40%' }
  ];

  // Verified Degradation Factor Distribution (%)
  const degradationFactorsData = [
    { name: 'Severe Storm Surges & Sediment Burial', value: 35, fill: '#f43f5e', desc: 'Cyclone Gaja canopy loss & sediment choking' },
    { name: 'Hypersalinity & Dam Diversions', value: 25, fill: '#f97316', desc: 'Reduced freshwater flow increasing soil salinity' },
    { name: 'Salt Pan & Aquaculture Encroachment', value: 20, fill: '#eab308', desc: 'Intertidal mudflat conversions' },
    { name: 'Invasive Species (Prosopis juliflora)', value: 12, fill: '#a855f7', desc: 'Weed invasion crowding mudflats' },
    { name: 'Estuarine Siltation & Plastic Waste', value: 8, fill: '#06b6d4', desc: 'Channel clogging & tourist plastic debris' }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center">
          <BarChart3 className="w-7 h-7 mr-3 text-cyan-400" />
          Global Coastal & Mangrove Analytics Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Side-by-side comparative analysis of all 8 Tamil Nadu Mangrove Sanctuaries across Climate, FSI Canopy Density, Degradation Drivers, NCCR Shoreline Erosion, INCOIS Sea Level Rise, and IMD Cyclone History.
        </p>
      </div>

      {/* Comparison Selector Tabs */}
      <div className="flex items-center space-x-2 flex-wrap gap-y-2">
        <button
          onClick={() => setActiveTab('mangroveFsi')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'mangroveFsi'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <TreePine className="w-4 h-4 mr-1.5" />
          Mangrove Cover (FSI 2013–2023)
        </button>

        <button
          onClick={() => setActiveTab('canopyDensity')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'canopyDensity'
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 mr-1.5" />
          FSI Canopy Density Classes
        </button>

        <button
          onClick={() => setActiveTab('degradationDrivers')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'degradationDrivers'
              ? 'bg-gradient-to-r from-rose-700 to-amber-600 text-white shadow-lg shadow-rose-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <PieIcon className="w-4 h-4 mr-1.5" />
          Mangrove Loss Drivers (%)
        </button>

        <button
          onClick={() => setActiveTab('tempComparison')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'tempComparison'
              ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Thermometer className="w-4 h-4 mr-1.5" />
          Temperature Comparison (°C)
        </button>

        <button
          onClick={() => setActiveTab('rainfallComparison')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'rainfallComparison'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <CloudRain className="w-4 h-4 mr-1.5" />
          Annual Rainfall Normal (mm)
        </button>

        <button
          onClick={() => setActiveTab('erosionComparison')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'erosionComparison'
              ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg shadow-amber-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Waves className="w-4 h-4 mr-1.5" />
          Shoreline Erosion (%)
        </button>

        <button
          onClick={() => setActiveTab('seaLevelComparison')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'seaLevelComparison'
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 mr-1.5" />
          Sea Level Rise (mm/yr)
        </button>

        <button
          onClick={() => setActiveTab('cycloneTimeline')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center transition-all cursor-pointer ${
            activeTab === 'cycloneTimeline'
              ? 'bg-gradient-to-r from-rose-700 to-red-600 text-white shadow-lg shadow-rose-950/50'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Wind className="w-4 h-4 mr-1.5" />
          Cyclone History (2011–2023)
        </button>
      </div>

      {/* Main Graph Card Container */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <span className="font-semibold text-slate-200">
            {activeTab === 'mangroveFsi' && 'Statewide Tamil Nadu Mangrove Cover Evolution Across FSI Assessment Cycles (2013–2023)'}
            {activeTab === 'canopyDensity' && 'Forest Survey of India (FSI ISFR 2023) Mangrove Canopy Density Classification (ha)'}
            {activeTab === 'degradationDrivers' && 'Primary Drivers of Mangrove Forest Degradation & Loss in Tamil Nadu Coastal Sanctuaries (%)'}
            {activeTab === 'tempComparison' && 'Daily Minimum vs Maximum Climatological Temperature (°C) across 8 Locations'}
            {activeTab === 'rainfallComparison' && 'Annual Climatological Rainfall Normal (mm) across 8 Locations'}
            {activeTab === 'erosionComparison' && 'NCCR Shoreline High Erosion Sector Percentage (%) across Coastal Locations'}
            {activeTab === 'seaLevelComparison' && 'INCOIS Multi-Decadal Tide Gauge Sea Level Change Rate (mm/year)'}
            {activeTab === 'cycloneTimeline' && 'IMD Official Cyclonic Landfalls Affecting Tamil Nadu Coastal Sanctuaries (2011–2023)'}
          </span>
          <span className="font-mono text-cyan-400">
            {activeTab === 'mangroveFsi' && 'Source: Forest Survey of India (FSI ISFR 2013–2023)'}
            {activeTab === 'canopyDensity' && 'Source: FSI ISFR 2023 Density Matrix'}
            {activeTab === 'degradationDrivers' && 'Source: TN Forest Dept & NCCR Research Syntheses'}
            {activeTab === 'tempComparison' && 'Source: IMD Climatological Normals 1991–2020'}
            {activeTab === 'rainfallComparison' && 'Source: IMD Climatological Normals 1991–2020'}
            {activeTab === 'erosionComparison' && 'Source: NCCR Shoreline Changes Atlas'}
            {activeTab === 'seaLevelComparison' && 'Source: INCOIS / Survey of India Tide Gauge Atlas'}
            {activeTab === 'cycloneTimeline' && 'Source: IMD eAtlas & RSMC New Delhi'}
          </span>
        </div>

        <div className="min-h-[380px] w-full pt-2">
          {activeTab === 'degradationDrivers' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={degradationFactorsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {degradationFactorsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="#0f172a" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2.5">
                {degradationFactorsData.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
                    <span className="w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 shadow-sm" style={{ backgroundColor: item.fill }} />
                    <div>
                      <div className="font-bold text-slate-100">{item.name} ({item.value}%)</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              {activeTab === 'mangroveFsi' ? (
                <BarChart data={statewideFsi} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={11} unit=" ha" domain={[3000, 6000]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="coverHa" name="Statewide Mangrove Cover (ha)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : activeTab === 'canopyDensity' ? (
                <BarChart data={fsiDensityData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} unit=" ha" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="value" name="Mangrove Canopy Area (ha)" radius={[4, 4, 0, 0]}>
                    {fsiDensityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              ) : activeTab === 'tempComparison' ? (
                <BarChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-35} textAnchor="end" interval={0} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 45]} unit="°C" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
                  <Bar dataKey="minTemp" name="Mean Min Temp (°C)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maxTemp" name="Mean Max Temp (°C)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : activeTab === 'rainfallComparison' ? (
                <BarChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-35} textAnchor="end" interval={0} />
                  <YAxis stroke="#64748b" fontSize={11} unit=" mm" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="rainfall" name="Annual Rainfall (mm)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : activeTab === 'erosionComparison' ? (
                <BarChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-35} textAnchor="end" interval={0} />
                  <YAxis stroke="#64748b" fontSize={11} unit=" %" domain={[0, 30]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="erosionPercent" name="Shoreline Erosion Sector (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : activeTab === 'seaLevelComparison' ? (
                <BarChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-35} textAnchor="end" interval={0} />
                  <YAxis stroke="#64748b" fontSize={11} unit=" mm/yr" domain={[0, 2]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="seaLevelMmYr" name="Sea Level Rise Baseline (mm/yr)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <div className="h-full overflow-y-auto space-y-4 pr-2">
                  {cycloneHistory && cycloneHistory.map(cyc => (
                    <div key={cyc.id} className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-400 text-sm font-mono">{cyc.year} — {cyc.name} ({cyc.category})</span>
                        <span className="text-xs font-mono text-slate-300">Max Wind: {cyc.maxWindKmvh} km/h</span>
                      </div>
                      <div className="text-xs text-slate-300">
                        Landfall: <span className="font-semibold text-slate-200">{cyc.landfallLocation}</span> ({cyc.date})
                      </div>
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                        {cyc.impactNotes}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Comparison Summary Data Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" />
          Tamil Nadu 8 Mangrove Sanctuaries Baseline Comparison Matrix
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Location Name</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Max Temp (°C)</th>
                <th className="py-3 px-4">Min Temp (°C)</th>
                <th className="py-3 px-4">Annual Rainfall (mm)</th>
                <th className="py-3 px-4">Shoreline Erosion (%)</th>
                <th className="py-3 px-4">Sea Level Trend (mm/yr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-slate-100">{row.name}</td>
                  <td className="py-3 px-4 text-slate-300">{row.district}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">{row.category}</td>
                  <td className="py-3 px-4 font-mono text-rose-400 font-bold">{row.maxTemp ? `${row.maxTemp} °C` : 'Data unavailable'}</td>
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{row.minTemp ? `${row.minTemp} °C` : 'Data unavailable'}</td>
                  <td className="py-3 px-4 font-mono text-blue-400 font-bold">{row.rainfall ? `${row.rainfall} mm` : 'Data unavailable'}</td>
                  <td className="py-3 px-4 font-mono text-amber-400 font-bold">{row.erosionPercent ? `${row.erosionPercent} %` : 'Data unavailable'}</td>
                  <td className="py-3 px-4 font-mono text-teal-300 font-bold">{row.seaLevelMmYr ? `${row.seaLevelMmYr} mm/yr` : 'Data unavailable'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
