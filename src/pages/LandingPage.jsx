import React from 'react';
import { Waves, Shield, MapPin, ArrowRight, TreePine, Fish, CloudRain, Database, Cpu, CheckCircle2 } from 'lucide-react';

export function LandingPage({ onExplore, onOpenAuth, user }) {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-emerald-900/40 p-8 sm:p-12 text-center bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Academic Project — Tamil Nadu, India</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            BLUE CARBON GUARDIAN
          </h1>

          <p className="text-xl sm:text-2xl font-light bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent italic">
            "Explore. Understand. Restore."
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            AI-Based Coastal Ecosystem Monitoring and Climate Risk Assessment Platform for Tamil Nadu, India. Initially focusing on 8 verified coastal and Blue Carbon study locations across Tamil Nadu.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-950/60 flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Explore Tamil Nadu's Coastal Ecosystems</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {!user && (
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-6 py-3.5 glass-panel hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                Researcher Sign In
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Blue Carbon Ecosystem Highlights */}
      <section className="space-y-6 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Understanding Blue Carbon Ecosystems
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Coastal vegetated habitats capture and store organic carbon up to 10 times faster per hectare than terrestrial tropical rainforests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Mangrove Forests</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Salt-tolerant trees along intertidal zones protecting shorelines from storm surge, wave erosion, and storing organic sediment carbon.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-800">
              <Fish className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Seagrass Meadows</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submerged marine flowering plants feeding dugongs & sea turtles while sequestering carbon into marine soil beds.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800">
              <CloudRain className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Salt Marshes & Wetlands</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Intertidal wetland vegetation buffering estuaries against high tide flooding, sea level rise, and land-derived pollution.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Open-Data Guarantee */}
      <section className="glass-panel p-8 rounded-2xl border border-slate-800 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            <span>100% Legal Open Public Government Datasets</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Verified Legal Source Attribution</h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Every environmental value is sourced from verified public sources: IMD 30-Year Climatological Tables, FSI ISFR Reports, Ramsar RIS Sheet #2482 & #1210, and INCOIS Coastal Risk Atlases.
          </p>
        </div>
        <button
          onClick={onExplore}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 hover:border-emerald-600 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
        >
          View 8 Mangrove Sanctuaries
        </button>
      </section>
    </div>
  );
}
