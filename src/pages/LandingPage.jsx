import React from 'react';
import { Waves, Shield, MapPin, ArrowRight, TreePine, Fish, CloudRain, Database, Cpu, CheckCircle2, Layers, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

export function LandingPage({ onExplore, onOpenAuth, user }) {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Banner Section with Expanded Width */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-emerald-500/40 p-8 sm:p-14 text-center bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-7">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Academic Project — Tamil Nadu, India</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-md">
            BLUE CARBON GUARDIAN
          </h1>

          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent italic">
            "Explore. Understand. Restore."
          </p>

          <p className="text-base sm:text-lg lg:text-xl text-slate-100 leading-relaxed max-w-4xl mx-auto font-medium">
            AI-Based Coastal Ecosystem Monitoring, Climate Risk Assessment & 2050 Long-Term Forecasting Platform for Tamil Nadu, India. Covering 12 verified coastal and Blue Carbon study sanctuary locations.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center justify-center space-x-2.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Explore Tamil Nadu's Coastal Ecosystems</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {!user && (
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-7 py-4 glass-panel hover:bg-slate-800 text-slate-100 font-bold text-base rounded-2xl border border-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                Researcher Sign In
              </button>
            )}
          </div>
        </div>
      </section>

      {/* What is a Mangrove Ecosystem & Blue Carbon Science with Expanded Wide Cards */}
      <section className="space-y-8 w-full">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-mono text-emerald-300 bg-emerald-950 px-4 py-1.5 rounded-full border border-emerald-600 font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Ecosystem Science & Biological Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            What are Mangrove Forests & How Do They Store Carbon?
          </h2>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto font-medium">
            Mangroves are specialized, salt-tolerant trees (*halophytes*) that thrive in intertidal coastal zones where ocean tides mix with freshwater river estuaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Root System & Adaptation */}
          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-300 flex items-center justify-center border border-emerald-700">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Specialized Root Adaptations</h3>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                Mangroves utilize specialized respiratory roots like <strong className="text-emerald-300 font-bold">Pneumatophores (peg roots)</strong> in <em className="text-teal-200 font-semibold">Avicennia marina</em> and <strong className="text-emerald-300 font-bold">Stilt roots</strong> in <em className="text-teal-200 font-semibold">Rhizophora mucronata</em> to absorb oxygen from mudflats during low tide.
              </p>
            </div>
          </div>

          {/* Card 2: Tidal Zonation */}
          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-teal-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-950 text-teal-300 flex items-center justify-center border border-teal-700">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Tidal Zonation Architecture</h3>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                Tamil Nadu mangrove swamps exhibit distinct zonation: <strong className="text-teal-300 font-bold">Seaward Zone</strong> (*Rhizophora* withstanding high wave energy), <strong className="text-teal-300 font-bold">Mid-Lagoon Zone</strong> (*Avicennia* dominating saline mudflats), and <strong className="text-teal-300 font-bold">Landward Zone</strong> (*Excoecaria agallocha*).
              </p>
            </div>
          </div>

          {/* Card 3: Blue Carbon Sequestration */}
          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-300 flex items-center justify-center border border-cyan-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Blue Carbon Soil Storage</h3>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                Mangrove sediment soils trap organic carbon under oxygen-depleted (anaerobic) waterlogged conditions, storing carbon <strong className="text-cyan-300 font-bold">4x to 10x faster per hectare</strong> than terrestrial tropical rainforests for thousands of years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Carbon Ecosystem Highlights */}
      <section className="space-y-8 w-full">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Tamil Nadu Blue Carbon Habitats
          </h2>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium">
            Coastal vegetated habitats along the Coromandel Coast, Palk Bay, and Gulf of Mannar Biosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-300 flex items-center justify-center border border-emerald-700">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Mangrove Forests</h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Estuarine & lagoon mangrove buffers protecting Tamil Nadu shorelines from cyclonic storm surges and erosion.
            </p>
          </div>

          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-950 text-teal-300 flex items-center justify-center border border-teal-700">
              <Fish className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Seagrass Meadows</h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Submerged marine flowering plants in Palk Bay & Gulf of Mannar feeding dugongs and sea turtles while sequestering soil carbon.
            </p>
          </div>

          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-300 flex items-center justify-center border border-cyan-700">
              <CloudRain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Salt Marshes & Wetlands</h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Intertidal wetland vegetation buffering estuaries against high tide flooding, sea level rise, and land-derived pollution.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Open-Data Guarantee */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/40 w-full flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-mono text-emerald-300 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-1" />
            <span>100% Legal Open Public Government Datasets</span>
          </div>
          <h2 className="text-2xl font-black text-white">Verified Legal Source Attribution</h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Every environmental value is sourced from verified public sources: IMD 30-Year Climatological Tables, FSI ISFR Reports, Ramsar RIS Sheets, and INCOIS Coastal Risk Atlases.
          </p>
        </div>
        <button
          onClick={onExplore}
          className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 border-2 border-emerald-500 hover:border-emerald-400 rounded-2xl text-sm font-black transition-all shrink-0 cursor-pointer shadow-lg"
        >
          View 12 Mangrove Sanctuaries
        </button>
      </section>
    </div>
  );
}
