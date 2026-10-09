import React, { useState } from 'react';
import { TreePine, PlusCircle, CheckCircle2, Heart, Award, ShieldCheck } from 'lucide-react';
import { CarbonCreditCalculator } from '../components/CarbonCreditCalculator';

export function PlantRestore({ locations, plantations, onAddPlantation, user }) {
  const [species, setSpecies] = useState('Rhizophora mucronata');
  const [saplingCount, setSaplingCount] = useState(50);
  const [locationId, setLocationId] = useState(locations[0]?.id || 'pichavaram');
  const [organization, setOrganization] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const speciesOptions = [
    'Rhizophora mucronata (Red Mangrove)',
    'Avicennia marina (Grey Mangrove)',
    'Avicennia officinalis (Indian Mangrove)',
    'Ceriops decandra',
    'Sonneratia apetala',
    'Seagrass Sapling / Bio-shield Species'
  ];

  const totalSaplings = plantations.reduce((sum, item) => sum + Number(item.saplingCount || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const locObj = locations.find(l => l.id === locationId);

    onAddPlantation({
      species,
      saplingCount: Number(saplingCount),
      locationId,
      locationName: locObj ? locObj.name : locationId,
      date: new Date().toISOString().split('T')[0],
      organization: organization || (user ? user.name : 'Volunteer Contributor')
    });

    setOrganization('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs">
          <TreePine className="w-4 h-4" />
          <span>Conservation Action & Restoration Module</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Plant / Restore Conservation Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Log community mangrove plantation activities and sapling restoration counts. All entries are explicitly tagged as <span className="text-emerald-300 font-semibold">"Community / Volunteer Records"</span>.
        </p>
      </div>

      {/* Blue Carbon Credit & Monetization Estimator ($ USD) */}
      <CarbonCreditCalculator sitesData={locations} />

      {/* Aggregate Progress Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-emerald-800/60 bg-emerald-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
            <span>Total Community Saplings Logged</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-4xl font-black text-emerald-300">
            {totalSaplings.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Recorded across Tamil Nadu sites</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-cyan-800/60 bg-cyan-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold">
            <span>Active Volunteer Campaigns</span>
            <Heart className="w-4 h-4" />
          </div>
          <div className="text-4xl font-black text-cyan-300">
            {plantations.length}
          </div>
          <div className="text-[11px] text-slate-400">Community logging drives</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-teal-800/60 bg-teal-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-teal-400 font-semibold">
            <span>Primary Species Logged</span>
            <TreePine className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-teal-300">
            Rhizophora & Avicennia
          </div>
          <div className="text-[11px] text-slate-400">Estuarine bio-shield species</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Plantation Form */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center">
            <PlusCircle className="w-4 h-4 mr-2 text-emerald-400" />
            Log Plantation Activity
          </h2>

          {submitted && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Plantation drive recorded under Community Records.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Coastal Location</label>
              <select
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name} ({loc.district})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Mangrove / Coastal Species</label>
              <select
                value={species}
                onChange={e => setSpecies(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {speciesOptions.map(sp => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Number of Saplings Planted</label>
              <input
                type="number"
                min={1}
                required
                value={saplingCount}
                onChange={e => setSaplingCount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Organization / Volunteer Group</label>
              <input
                type="text"
                value={organization}
                onChange={e => setOrganization(e.target.value)}
                placeholder="e.g. Green Tamil Nadu Mission Volunteer"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed">
              <strong>Academic Integrity Disclaimer:</strong> Carbon storage offsets will NOT be automatically claimed or calculated without peer-reviewed site-specific methodology.
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <TreePine className="w-3.5 h-3.5" />
              <span>Record Activity</span>
            </button>
          </form>
        </div>

        {/* Community Contributions List */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100">
              Community Restoration Log ({plantations.length})
            </h2>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40 font-mono">
              Community / Volunteer Records
            </span>
          </div>

          <div className="space-y-4">
            {plantations.map(p => (
              <div key={p.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-xs font-semibold">
                      {p.saplingCount} Saplings
                    </span>
                    <span className="text-xs font-bold text-slate-200">{p.species}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Date: {p.date}</span>
                </div>

                <div className="text-xs text-slate-300">
                  Location: <span className="font-semibold text-emerald-400">{p.locationName}</span>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-800/60 font-mono">
                  <span>Logged by: {p.organization}</span>
                  <span className="text-emerald-400 inline-flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

