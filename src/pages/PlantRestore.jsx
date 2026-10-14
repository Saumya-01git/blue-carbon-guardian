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
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-2 shadow-xl">
        <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs sm:text-sm font-bold">
          <TreePine className="w-4 h-4" />
          <span>Conservation Action & Restoration Module</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
          Plant / Restore Conservation Tracker
        </h1>
        <p className="text-sm sm:text-base text-slate-200 font-medium">
          Log community mangrove plantation activities and sapling restoration counts. All entries are explicitly tagged as <span className="text-emerald-300 font-bold">"Community / Volunteer Records"</span>.
        </p>
      </div>

      {/* Blue Carbon Credit & Monetization Estimator ($ USD) */}
      <CarbonCreditCalculator sitesData={locations} />

      {/* Aggregate Progress Counter - Large Projector Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-emerald-700/60 bg-emerald-950/30 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-300 font-bold">
            <span>Total Community Saplings Logged</span>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-emerald-300">
            {totalSaplings.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-slate-300 font-semibold">Recorded across Tamil Nadu sites</div>
        </div>

        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-cyan-700/60 bg-cyan-950/30 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs sm:text-sm text-cyan-300 font-bold">
            <span>Active Volunteer Campaigns</span>
            <Heart className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-cyan-300">
            {plantations.length}
          </div>
          <div className="text-xs sm:text-sm text-slate-300 font-semibold">Community logging drives</div>
        </div>

        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-teal-700/60 bg-teal-950/30 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs sm:text-sm text-teal-300 font-bold">
            <span>Primary Species Logged</span>
            <TreePine className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-300">
            Rhizophora & Avicennia
          </div>
          <div className="text-xs sm:text-sm text-slate-300 font-semibold">Estuarine bio-shield species</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Plantation Form */}
        <div className="lg:col-span-1 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 shadow-xl">
          <h2 className="text-xl font-black text-white flex items-center">
            <PlusCircle className="w-5 h-5 mr-2 text-emerald-400" />
            Log Plantation Activity
          </h2>

          {submitted && (
            <div className="p-4 bg-emerald-950/90 border border-emerald-500 rounded-2xl text-emerald-200 text-sm flex items-center space-x-2 font-bold animate-fade-in shadow-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Plantation drive recorded under Community Records.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Target Coastal Location</label>
              <select
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name} ({loc.district})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Mangrove / Coastal Species</label>
              <select
                value={species}
                onChange={e => setSpecies(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
              >
                {speciesOptions.map(sp => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Number of Saplings Planted</label>
              <input
                type="number"
                min={1}
                required
                value={saplingCount}
                onChange={e => setSaplingCount(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Organization / Volunteer Group</label>
              <input
                type="text"
                value={organization}
                onChange={e => setOrganization(e.target.value)}
                placeholder="e.g. Green Tamil Nadu Mission Volunteer"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed font-medium">
              <strong className="text-emerald-300">Academic Integrity Disclaimer:</strong> Carbon storage offsets will NOT be automatically claimed or calculated without peer-reviewed site-specific methodology.
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <TreePine className="w-4 h-4" />
              <span>Record Activity</span>
            </button>
          </form>
        </div>

        {/* Community Contributions List */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">
              Community Restoration Log ({plantations.length})
            </h2>
            <span className="text-xs sm:text-sm text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-700 font-mono font-bold">
              Community / Volunteer Records
            </span>
          </div>

          <div className="space-y-4">
            {plantations.map(p => (
              <div key={p.id} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-mono font-black">
                      {p.saplingCount} Saplings
                    </span>
                    <span className="text-sm font-bold text-white">{p.species}</span>
                  </div>
                  <span className="text-xs text-slate-300 font-mono font-bold">Date: {p.date}</span>
                </div>

                <div className="text-sm text-slate-200">
                  Location: <span className="font-bold text-emerald-300">{p.locationName}</span>
                </div>

                <div className="flex items-center justify-between pt-2.5 text-xs text-slate-300 border-t border-slate-800/60 font-mono">
                  <span>Logged by: <strong className="text-white">{p.organization}</strong></span>
                  <span className="text-emerald-300 inline-flex items-center font-bold">
                    <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
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

