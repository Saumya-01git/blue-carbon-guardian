import React, { useState } from 'react';
import { InteractiveMap } from '../components/InteractiveMap';
import { DataStatusBadge } from '../components/DataStatusBadge';
import { MapPin, Shield, Waves, Filter, ArrowRight, Database, CheckCircle2, TreePine, CloudRain, Cpu, HelpCircle } from 'lucide-react';

export function Dashboard({ locations, user, onSelectLocation, dataSourcesCount }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'All Locations', tooltip: 'Show all 8 verified Tamil Nadu Mangrove Sanctuaries' },
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center">
            Hello, {user ? user.name : 'Environmental Researcher'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-1">
            Let's contribute to a healthier, more resilient coast. Hover over buttons or click terms to view simple explanations.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>8 Verified Mangrove Sanctuaries</span>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/60 shrink-0">
            <TreePine className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100">{locations.length}</div>
            <div className="text-[11px] text-slate-400">Mangrove Locations</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-800/60 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100">8 / 8</div>
            <div className="text-[11px] text-slate-400">Verified Baselines</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/60 shrink-0">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100">10-Year</div>
            <div className="text-[11px] text-slate-400">Restoration Dataset</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-800/60 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100">{dataSourcesCount || 8}</div>
            <div className="text-[11px] text-slate-400">Official Data Sources</div>
          </div>
        </div>
      </div>

      {/* High-Contrast Mangrove Sub-Ecosystem Filter Bar Container */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-extrabold text-emerald-300 flex items-center mr-2 shrink-0 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            Filter Sub-Ecosystem:
          </span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              title={cat.tooltip}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/80 border border-emerald-400'
                  : 'bg-slate-950/90 text-slate-100 border border-slate-700 hover:bg-slate-800 hover:border-emerald-500'
              }`}
            >
              <span>{cat.label}</span>
              <HelpCircle className="w-3.5 h-3.5 text-emerald-300 opacity-80 hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {/* Tamil Nadu Interactive Leaflet Map with High-Contrast Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between glass-panel p-3.5 rounded-xl border border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center">
            <Waves className="w-5 h-5 mr-2 text-emerald-400" />
            Tamil Nadu Mangrove Sanctuaries Map
          </h2>
          <span className="text-xs font-bold text-emerald-300 bg-slate-950/90 px-3 py-1 rounded-md border border-slate-700 font-mono shadow-sm">
            💡 Click any map marker to explore detail page
          </span>
        </div>
        <InteractiveMap
          locations={locations}
          selectedCategory={selectedCategory}
          onSelectLocation={onSelectLocation}
        />
      </div>

      {/* Location Grid Cards */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-100">
          Tamil Nadu Mangrove Study Locations ({filteredLocations.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLocations.map(loc => (
            <div
              key={loc.id}
              className="glass-panel rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col group"
            >
              <div className="h-36 relative overflow-hidden">
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    title="Hover or click Glossary to learn more about this sub-ecosystem type"
                    className="px-2.5 py-1 rounded bg-slate-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold"
                  >
                    {loc.ecosystemCategory}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {loc.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    District: <span className="text-slate-300 font-medium">{loc.district}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">
                    Species: {loc.dominantSpecies}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {loc.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <DataStatusBadge status={loc.dataAvailabilityStatus} />
                  <button
                    onClick={() => onSelectLocation(loc.id)}
                    className="w-full py-2 bg-slate-900 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Location Data</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
