import React, { useState } from 'react';
import { InteractiveMap } from '../components/InteractiveMap';
import { DataStatusBadge } from '../components/DataStatusBadge';
import { MapPin, Shield, Waves, Filter, ArrowRight, Database, CheckCircle2, TreePine, CloudRain, Cpu, HelpCircle } from 'lucide-react';

export function Dashboard({ locations, user, onSelectLocation, dataSourcesCount }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'All Locations', tooltip: `Show all ${locations?.length || 12} verified Tamil Nadu Coastal Sanctuaries` },
    { id: 'Estuarine Mangroves', label: 'Estuarine Mangroves', tooltip: 'Mangroves growing where freshwater rivers mix with ocean tides (Pichavaram, Punnakayal, Pulicat)' },
    { id: 'Lagoon Mangroves', label: 'Lagoon Mangroves', tooltip: 'Mangroves around shallow calm coastal lagoons (Muthupet, Kazhuveli)' },
    { id: 'Mangrove Wetlands', label: 'Mangrove Wetlands', tooltip: 'Coastal wetland complexes with salt marshes and intertidal mudflats (Point Calimere)' },
    { id: 'Seagrass & Island Mangroves', label: 'Seagrass & Island Mangroves', tooltip: 'Fringing island mangroves surrounded by underwater seagrass beds (Ramanathapuram Islands)' },
    { id: 'Deltaic Bio-Shield Mangroves', label: 'Deltaic Bio-Shield Mangroves', tooltip: 'Dense mangrove tree buffers planted to shield coastlines from storm waves (Devipattinam)' }
  ];

  const filteredLocations = selectedCategory === 'All'
    ? locations
    : locations.filter(loc => loc.ecosystemCategory === selectedCategory);

  return (
    <div className="space-y-8 py-4">
      {/* User Welcome Greeting */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center">
            Hello, {user ? user.name : 'Environmental Researcher'}! 👋
          </h1>
          <p className="text-sm sm:text-base text-emerald-300 font-medium mt-1.5">
            AI-powered Tamil Nadu Blue Carbon & Coastal Ecosystem Monitoring Platform. Click any location card or marker to view live data.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-mono bg-slate-900/90 px-4 py-2 rounded-xl border border-emerald-500/40 text-emerald-300 font-bold shrink-0 shadow-md">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span>{locations.length} Verified Coastal Sanctuaries</span>
        </div>
      </div>

      {/* Summary Metrics Cards - High Contrast Large Projector Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex items-center space-x-4 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-700/60 shrink-0">
            <TreePine className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">{locations.length}</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">Study Sanctuaries</div>
          </div>
        </div>

        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex items-center space-x-4 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-700/60 shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">{locations.length} / {locations.length}</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">Verified Baselines</div>
          </div>
        </div>

        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex items-center space-x-4 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-700/60 shrink-0">
            <Waves className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">10-Year</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">FSI Multi-Cycle Trend</div>
          </div>
        </div>

        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex items-center space-x-4 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-700/60 shrink-0">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">{dataSourcesCount || 8}</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">Official Data Sources</div>
          </div>
        </div>
      </div>

      {/* High-Contrast Mangrove Sub-Ecosystem Filter Bar Container */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
        <div className="flex items-center space-x-3 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-sm font-extrabold text-emerald-300 flex items-center mr-2 shrink-0 bg-slate-950/90 px-3.5 py-2 rounded-xl border border-slate-800">
            <Filter className="w-4 h-4 mr-2 text-emerald-400" />
            Filter Sub-Ecosystem:
          </span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              title={cat.tooltip}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center space-x-2 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/80 border border-emerald-300'
                  : 'bg-slate-950/90 text-slate-100 border border-slate-700 hover:bg-slate-800 hover:border-emerald-400'
              }`}
            >
              <span>{cat.label}</span>
              <HelpCircle className="w-4 h-4 text-emerald-300 opacity-80 hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {/* Tamil Nadu Interactive Leaflet Map with High-Contrast Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center">
            <Waves className="w-6 h-6 mr-2.5 text-emerald-400" />
            Tamil Nadu Coastal & Mangrove Sanctuaries Map
          </h2>
          <span className="text-xs sm:text-sm font-bold text-emerald-300 bg-slate-950/90 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-mono shadow-sm">
            💡 Click any map marker to open its full telemetry & 10-year trend dossier
          </span>
        </div>
        <InteractiveMap
          locations={locations}
          selectedCategory={selectedCategory}
          onSelectLocation={onSelectLocation}
        />
      </div>

      {/* Location Grid Cards - Wider Cards with Clear Projector Typography */}
      <div className="space-y-5 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Tamil Nadu Coastal & Blue Carbon Study Locations ({filteredLocations.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLocations.map(loc => (
            <div
              key={loc.id}
              className="glass-panel glass-panel-glow rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/60 transition-all flex flex-col group shadow-xl"
            >
              <div className="h-44 sm:h-48 relative overflow-hidden">
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    title="Sub-ecosystem classification"
                    className="px-3 py-1.5 rounded-lg bg-slate-950/90 text-emerald-300 border border-emerald-500/50 text-xs font-mono font-bold shadow-md"
                  >
                    {loc.ecosystemCategory}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
                    {loc.name}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                    District: <span className="text-white font-bold">{loc.district}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-300 font-mono font-semibold mt-1">
                    Dominant: {loc.dominantSpecies}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 mt-2.5 leading-relaxed font-normal">
                    {loc.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <DataStatusBadge status={loc.dataAvailabilityStatus} />
                  <button
                    onClick={() => onSelectLocation(loc.id)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>View Location Data</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
