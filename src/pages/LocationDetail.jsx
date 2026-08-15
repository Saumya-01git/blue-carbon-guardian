import React from 'react';
import { DataStatusBadge } from '../components/DataStatusBadge';
import { ArrowLeft, MapPin, ShieldCheck, Thermometer, CloudRain, Waves, TreePine, ExternalLink, Info, AlertTriangle, Radio, Activity, Compass, ShieldAlert, Sparkles, Wind } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from 'recharts';

export function LocationDetail({ location, records, fsiLocationTrends, locationCyclones, onBack, onNavigateToSources }) {
  if (!location) return null;

  // Filter records by category
  const climateRecords = records.filter(r => r.category === 'Climate');
  const coastalRecords = records.filter(r => r.category === 'Coastal Risk');
  const blueCarbonRecords = records.filter(r => r.category === 'Blue Carbon');

  const maxTempRecord = climateRecords.find(r => r.parameter === 'Mean Daily Max Temperature');
  const minTempRecord = climateRecords.find(r => r.parameter === 'Mean Daily Min Temperature');
  const rainfallRecord = climateRecords.find(r => r.parameter === 'Annual Rainfall Normal');
  const erosionRecord = coastalRecords.find(r => r.parameter.includes('Erosion'));
  const seaLevelRecord = coastalRecords.find(r => r.parameter.includes('Sea Level'));

  // FSI ISFR Multi-Year Mangrove Data
  const validFsiTrends = fsiLocationTrends && fsiLocationTrends.filter(t => t.coverHa !== null);
  const hasFsiGraphData = validFsiTrends && validFsiTrends.length > 0;

  return (
    <div className="space-y-8 py-4">
      {/* Back Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-700/40">
          ID: {location.id}
        </span>
      </div>

      {/* Hero Header Banner */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-slate-800">
        <div className="h-64 sm:h-72 w-full relative">
          <img
            src={location.imageUrl}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold">
                {location.ecosystemCategory}
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/90 text-slate-300 border border-slate-700 text-xs font-mono">
                {location.district} District
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {location.name}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {location.description}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Information Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Latitude / Longitude</div>
          <div className="text-sm font-bold text-slate-100 mt-1 font-mono">
            {location.lat}°N, {location.lng}°E
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono">Official Site Boundary</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">District & Region</div>
          <div className="text-sm font-bold text-slate-100 mt-1">
            {location.district}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 truncate">{location.region}</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Ecosystem Category</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">
            {location.ecosystemCategory}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">{location.ecosystemType}</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Sea Level Rise Baseline</div>
          <div className="text-xs font-semibold text-cyan-300 mt-1 font-mono">
            {location.seaLevelRiseRate || "1.25 mm/yr (INCOIS)"}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">INCOIS Tide Gauge Baseline</div>
        </div>
      </div>

      {/* GRAPH 1: LOCATION MANGROVE COVERAGE CHANGE (FSI ISFR 2013-2023) */}
      <section className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/60">
              <TreePine className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Verified Mangrove Cover Assessment Trend (FSI ISFR 2013–2023)</h2>
              <p className="text-xs text-slate-400">Location: {location.name} | Unit: Hectares (ha) | Source: Forest Survey of India</p>
            </div>
          </div>
        </div>

        {hasFsiGraphData ? (
          <div className="space-y-4">
            <div className="bg-slate-900/70 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center">
                  <Activity className="w-4 h-4 mr-1.5 text-emerald-400" />
                  Mangrove Canopy Cover across FSI Assessment Cycles (ha)
                </span>
                <span className="font-mono text-[11px] text-emerald-400">Verified FSI ISFR Data</span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={validFsiTrends} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} unit=" ha" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                    <Bar dataKey="coverHa" name="Mangrove Cover (ha)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-900/40 rounded-xl border border-slate-800/60 text-xs text-amber-400 flex items-center space-x-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Insufficient verified historical data (FSI ISFR district breakups unavailable prior to sanctuary notification).</span>
          </div>
        )}
      </section>

      {/* GRAPH 2: CYCLONE HISTORY & LANDFALL TIMELINE */}
      <section className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 flex items-center justify-center border border-rose-800/60">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Historical Cyclone Landfall Timeline & Coastal Impact</h2>
              <p className="text-xs text-slate-400">Location: {location.name} Sector | Source: IMD eAtlas & RSMC New Delhi (2011–2023)</p>
            </div>
          </div>
        </div>

        {locationCyclones && locationCyclones.length > 0 ? (
          <div className="space-y-4">
            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
              {locationCyclones.map(cyc => (
                <div key={cyc.id} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-slate-950 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-100 flex items-center">
                        <span className="text-rose-400 mr-2 font-mono">{cyc.year}:</span>
                        {cyc.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 text-[10px] font-mono">
                        Max Wind: {cyc.maxWindKmvh} km/h
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-mono">
                      Landfall Sector: <span className="text-slate-200 font-semibold">{cyc.landfallLocation}</span> ({cyc.date})
                    </div>

                    <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80 leading-relaxed">
                      {cyc.impactNotes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-xs text-slate-400 flex items-center space-x-2">
            <Info className="w-4 h-4 text-slate-500" />
            <span>No major severe cyclone landfalls recorded directly at this sector during 2011–2023 IMD observations.</span>
          </div>
        )}
      </section>

      {/* SECTION 3: CLIMATE & RAINFALL NORMALS */}
      <section className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/60">
              <Thermometer className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Climate Overview — Averages & Seasonal Ranges</h2>
              <p className="text-xs text-slate-400">IMD 30-Year Climatological Baseline Normals (1991–2020 Standard Baseline)</p>
            </div>
          </div>
        </div>

        {/* Temperature Averages & Ranges Card Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Max Temperature Card */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-rose-300">Daily Maximum Temperature</span>
              <DataStatusBadge status={maxTempRecord ? maxTempRecord.status : 'Data unavailable'} />
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-[11px] text-slate-400">Annual Mean Max Temp</div>
                <div className="text-2xl font-black text-rose-400">
                  {maxTempRecord && typeof maxTempRecord.value === 'number' ? `${maxTempRecord.value} °C` : 'Data unavailable'}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400">Seasonal Max Temp Range</div>
                <div className="text-sm font-bold text-amber-300 font-mono">
                  {maxTempRecord && maxTempRecord.range ? maxTempRecord.range : 'Data pending'}
                </div>
              </div>
            </div>
            {maxTempRecord && (
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex items-center">
                <Radio className="w-3 h-3 mr-1 text-rose-400 shrink-0" />
                <span className="truncate">{maxTempRecord.notes}</span>
              </div>
            )}
          </div>

          {/* Min Temperature Card */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-cyan-300">Daily Minimum Temperature</span>
              <DataStatusBadge status={minTempRecord ? minTempRecord.status : 'Data unavailable'} />
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-[11px] text-slate-400">Annual Mean Min Temp</div>
                <div className="text-2xl font-black text-cyan-400">
                  {minTempRecord && typeof minTempRecord.value === 'number' ? `${minTempRecord.value} °C` : 'Data unavailable'}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400">Seasonal Min Temp Range</div>
                <div className="text-sm font-bold text-teal-300 font-mono">
                  {minTempRecord && minTempRecord.range ? minTempRecord.range : 'Data pending'}
                </div>
              </div>
            </div>
            {minTempRecord && (
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex items-center">
                <Radio className="w-3 h-3 mr-1 text-cyan-400 shrink-0" />
                <span className="truncate">{minTempRecord.notes}</span>
              </div>
            )}
          </div>

          {/* Rainfall Normal Card */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-blue-300">Annual Rainfall Normal</span>
              <DataStatusBadge status={rainfallRecord ? rainfallRecord.status : 'Data unavailable'} />
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400">
                {rainfallRecord && typeof rainfallRecord.value === 'number' ? `${rainfallRecord.value} mm` : 'Data unavailable'}
              </div>
              <div className="text-xs text-slate-400 mt-1">30-Year Climatological Average</div>
            </div>
            {rainfallRecord && (
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex items-center">
                <Radio className="w-3 h-3 mr-1 text-blue-400 shrink-0" />
                <span className="truncate">{rainfallRecord.notes}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: ECOLOGICAL PRESSURES & RESTORATION */}
      <section className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center border border-amber-800/60">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Mangrove Degradation Drivers & Restoration Initiatives</h2>
              <p className="text-xs text-slate-400">Key Pressures, MISHTI Scheme, TN-SHORE Mission & MSSRF Fishbone Canalization Progress</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Degradation Causes */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <div className="flex items-center text-xs font-bold text-rose-400">
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              <span>Primary Degradation & Environmental Pressures</span>
            </div>

            {location.degradationDrivers && location.degradationDrivers.length > 0 ? (
              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                {location.degradationDrivers.map((driver, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2 mt-1.5 shrink-0" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-slate-400">General coastal wave scours and seasonal hyper-salinity.</div>
            )}
          </div>

          {/* Active Restoration Initiatives */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <div className="flex items-center text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span>Active Restoration Schemes & Conservation Missions</span>
            </div>

            {location.restorationInitiatives && location.restorationInitiatives.length > 0 ? (
              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                {location.restorationInitiatives.map((init, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 mt-1.5 shrink-0" />
                    <span>{init}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-slate-400">Forest Department bio-shield canalization drives.</div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: SOURCE TRANSPARENCY TABLE */}
      <section className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" />
            Source Transparency Directory ({records.length} Records)
          </h2>
          <button
            onClick={onNavigateToSources}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center cursor-pointer"
          >
            <span>View Full Registry</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Parameter</th>
                <th className="py-2.5 px-3">Value</th>
                <th className="py-2.5 px-3">Year / Period</th>
                <th className="py-2.5 px-3">Geographic Level</th>
                <th className="py-2.5 px-3">Source Organization</th>
                <th className="py-2.5 px-3">Status Badge</th>
                <th className="py-2.5 px-3 text-right">Official Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {records.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-900/50">
                  <td className="py-3 px-3 font-semibold text-slate-200">{rec.parameter}</td>
                  <td className="py-3 px-3 font-mono text-emerald-300">
                    {typeof rec.value === 'number' ? `${rec.value} ${rec.unit}` : rec.value}
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">{rec.year} ({rec.timePeriod})</td>
                  <td className="py-3 px-3 text-slate-300">{rec.geographicLevel}</td>
                  <td className="py-3 px-3 text-slate-300">{rec.sourceOrganization}</td>
                  <td className="py-3 px-3">
                    <DataStatusBadge status={rec.status} notes={rec.notes} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <a
                      href={rec.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-2.5 py-1 bg-slate-900 hover:bg-emerald-950 text-emerald-400 rounded border border-slate-700 hover:border-emerald-600 transition-colors text-[11px]"
                    >
                      <span>View Source</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
