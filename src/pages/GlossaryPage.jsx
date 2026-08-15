import React, { useState } from 'react';
import { BookOpen, Search, TreePine, Waves, Thermometer, ShieldCheck, Sparkles, Info } from 'lucide-react';

export function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const terms = [
    // Mangrove & Ecosystem Types
    {
      term: 'Estuarine Mangroves',
      category: 'Ecosystems',
      icon: <TreePine className="w-4 h-4 text-emerald-400" />,
      simpleDefinition: 'Mangrove trees that grow where freshwater rivers mix with salty ocean tides (e.g. Pichavaram).',
      detailedDescription: 'Estuarine mangroves thrive in brackish water habitats where river channels discharge into tidal estuaries. They have prop roots that absorb oxygen during low tide and shelter juvenile fish.'
    },
    {
      term: 'Lagoon Mangroves',
      category: 'Ecosystems',
      icon: <TreePine className="w-4 h-4 text-emerald-400" />,
      simpleDefinition: 'Mangroves growing around shallow, calm coastal lakes separated from the open sea by sandbars (e.g. Muthupet).',
      detailedDescription: 'Lagoon mangroves adapt to shallow, low-wave energy environments dominated by salt-tolerant species like Avicennia marina that survive high summer evaporation.'
    },
    {
      term: 'Deltaic Bio-Shield',
      category: 'Ecosystems',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      simpleDefinition: 'A dense wall of coastal trees planted to absorb ocean storm waves and protect villages behind them.',
      detailedDescription: 'Natural vegetative barriers planted along river deltas to dissipate tsunami wave energy, reduce coastal wind velocity, and bind beach sand against erosion.'
    },
    {
      term: 'Seagrass Meadows',
      category: 'Ecosystems',
      icon: <Waves className="w-4 h-4 text-teal-400" />,
      simpleDefinition: 'Underwater flowering grass beds in shallow ocean waters that trap carbon and feed dugongs and sea turtles.',
      detailedDescription: 'Submerged marine plant beds that sequester blue carbon up to 35 times faster than tropical rainforests while serving as critical marine species nurseries.'
    },

    // Coastal Risk Indicators
    {
      term: 'Shoreline High Erosion',
      category: 'Coastal Risk',
      icon: <Waves className="w-4 h-4 text-amber-400" />,
      simpleDefinition: 'When ocean waves wash away land and beaches faster than natural sand can rebuild them.',
      detailedDescription: 'The net loss of land along the coast caused by strong wave action, tidal currents, or reduced river sediment supply, measured as a percentage of coastline.'
    },
    {
      term: 'Coastal Vulnerability Index (CVI)',
      category: 'Coastal Risk',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      simpleDefinition: 'A rating system (Low, Moderate, High) that shows how easily a coastal area can be damaged by cyclones and sea level rise.',
      detailedDescription: 'A multi-criteria hazard metric published by INCOIS rating coastal sensitivity based on beach slope, wave height, shoreline erosion rate, and sea level rise.'
    },
    {
      term: 'Sea Level Rise Baseline',
      category: 'Coastal Risk',
      icon: <Waves className="w-4 h-4 text-cyan-400" />,
      simpleDefinition: 'The steady upward movement of average ocean heights over decades (measured in millimeters per year).',
      detailedDescription: 'Multi-decadal trend of rising sea levels measured by coastal tide gauges resulting from thermal expansion of seawater and global ice sheet melting.'
    },

    // Climate Terms
    {
      term: 'Climatological Normal',
      category: 'Climate',
      icon: <Thermometer className="w-4 h-4 text-rose-400" />,
      simpleDefinition: 'The 30-year average weather pattern (temperature or rainfall) used as a baseline benchmark.',
      detailedDescription: 'The standard 30-year average (1991–2020) compiled by IMD to establish baseline climate expectations distinct from short-term daily weather.'
    },
    {
      term: 'Verified Station Proxy',
      category: 'Climate',
      icon: <Info className="w-4 h-4 text-cyan-400" />,
      simpleDefinition: 'Using weather data from the nearest official weather station when a specific mangrove site does not have its own sensor.',
      detailedDescription: 'An official meteorological record collected at a certified IMD station (e.g. Cuddalore station) used to represent environmental conditions at nearby coastal sites.'
    },

    // Conservation Schemes
    {
      term: 'Fishbone Canalization',
      category: 'Conservation',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      simpleDefinition: 'Digging herring-bone shaped channels so ocean tides can freely flow in and out to water young mangrove trees.',
      detailedDescription: 'An ecological engineering technique developed by MSSRF where feeder canals branch out at 30° angles across hypersaline mudflats to restore daily tidal flushing.'
    },
    {
      term: 'MISHTI Scheme',
      category: 'Conservation',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      simpleDefinition: 'India’s central government mission to plant and restore mangroves along all coastal states.',
      detailedDescription: 'Mangrove Initiative for Shoreline Habitats & Tangible Incomes (launched 2023) converging CAMPA funds and local employment to restore coastal bio-shields.'
    },
    {
      term: 'TN-SHORE Mission',
      category: 'Conservation',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      simpleDefinition: 'Tamil Nadu state project to restore 2,500 hectares of coastal mangroves and protect local fishing communities.',
      detailedDescription: 'Tamil Nadu Coastal Restoration Mission (2023–2028) establishing Village Mangrove Councils (VMCs) and conservation centres across 14 coastal districts.'
    },
    {
      term: 'Ramsar Site Designation',
      category: 'Conservation',
      icon: <ShieldCheck className="w-4 h-4 text-teal-400" />,
      simpleDefinition: 'An official international badge given to globally important wetlands under the international Ramsar Convention.',
      detailedDescription: 'Wetlands of international importance recognized under the UNESCO Ramsar Convention (e.g. Pichavaram Ramsar Site No. 2482).'
    }
  ];

  const categories = ['All', 'Ecosystems', 'Coastal Risk', 'Climate', 'Conservation'];

  const filteredTerms = terms.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.simpleDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center">
          <BookOpen className="w-7 h-7 mr-3 text-emerald-400" />
          Environmental Glossary & Simple Key Terms Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Simple, plain-English definitions of scientific environmental terms, coastal risk indicators, climate metrics, and conservation schemes used in this application.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search key terms (e.g. erosion, fishbone)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Dictionary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item, index) => (
          <div
            key={index}
            className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-100">{item.term}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-emerald-300 border border-slate-800 text-[10px] font-mono">
                {item.category}
              </span>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-1">
              <div className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                💡 Simple English Definition:
              </div>
              <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                {item.simpleDefinition}
              </p>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed pt-1">
              {item.detailedDescription}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
