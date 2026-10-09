import React, { useState, useEffect } from 'react';
import { Sliders, Thermometer, Waves, Zap, Droplets, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

export function MLScenarioSimulator({ sitesData, onSimulationChange }) {
  const [sstSurge, setSstSurge] = useState(0.5); // °C
  const [seaLevelRise, setSeaLevelRise] = useState(10); // cm
  const [salinityIncrease, setSalinityIncrease] = useState(3.0); // ppt
  const [cycloneSurge, setCycloneSurge] = useState(1); // events/decade
  const [freshwaterCut, setFreshwaterCut] = useState(15); // %

  const handleReset = () => {
    setSstSurge(0.5);
    setSeaLevelRise(10);
    setSalinityIncrease(3.0);
    setCycloneSurge(1);
    setFreshwaterCut(15);
  };

  // Calculate dynamic vulnerability multiplier
  const deltaVuln = (sstSurge * 6.5) + (seaLevelRise * 0.45) + (salinityIncrease * 1.8) + (cycloneSurge * 4.2) + (freshwaterCut * 0.35);

  const calculatedSites = (sitesData || []).map(site => {
    const rawScore = Math.min(99.9, Math.max(10, (site.baseVulnerabilityScore || 40) + deltaVuln));
    let statusLabel = 'Low Risk';
    let statusClass = 'bg-emerald-950 text-emerald-200 border-emerald-600/60 font-bold';
    
    if (rawScore >= 75) {
      statusLabel = 'Severe Threat';
      statusClass = 'bg-rose-950 text-rose-200 border-rose-600/60 font-bold';
    } else if (rawScore >= 55) {
      statusLabel = 'High Risk';
      statusClass = 'bg-amber-950 text-amber-200 border-amber-600/60 font-bold';
    } else if (rawScore >= 35) {
      statusLabel = 'Moderate';
      statusClass = 'bg-cyan-950 text-cyan-200 border-cyan-600/60 font-bold';
    }

    // Carbon at risk calculation (approx 150 tons CO2e per hectare)
    const carbonAtRiskTons = Math.round((site.fsiCanopyCover2023_ha || 1000) * 150 * (rawScore / 100));
    const carbonEconomicLossUSD = Math.round(carbonAtRiskTons * 120); // $120/ton

    return {
      ...site,
      simulatedScore: rawScore.toFixed(1),
      statusLabel,
      statusClass,
      carbonAtRiskTons,
      carbonEconomicLossUSD
    };
  });

  // Notify parent component whenever simulation parameters update
  useEffect(() => {
    if (onSimulationChange) {
      onSimulationChange({
        sliderParams: { sstSurge, seaLevelRise, salinityIncrease, cycloneSurge, freshwaterCut },
        simulatedSites: calculatedSites,
        isCustomScenario: !(sstSurge === 0.5 && seaLevelRise === 10 && salinityIncrease === 3.0 && cycloneSurge === 1 && freshwaterCut === 15)
      });
    }
  }, [sstSurge, seaLevelRise, salinityIncrease, cycloneSurge, freshwaterCut, sitesData]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
      {/* Title Header - Bolder & Larger Fonts for Review */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm mb-1 font-bold">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>Interactive Policy & Climate Scenario Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
            "What-If" Ecosystem Vulnerability Simulator
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Manipulate climate stress sliders to simulate real-time ML risk recalculation across Tamil Nadu's 8 coastal sanctuaries.
          </p>
        </div>

        <button 
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-sm font-bold transition shadow-md cursor-pointer shrink-0"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Sliders Grid - Larger Fonts & Clear Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
        
        {/* Slider 1: SST Surge */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-slate-200 flex items-center">
              <Thermometer className="w-4 h-4 text-rose-400 mr-2" />
              SST Thermal Surge
            </span>
            <span className="font-mono text-rose-400 font-extrabold text-base sm:text-lg">+{sstSurge.toFixed(1)} °C</span>
          </div>
          <input 
            type="range" 
            min="0.0" 
            max="3.0" 
            step="0.1"
            value={sstSurge}
            onChange={(e) => setSstSurge(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>+0.0°C (Baseline)</span>
            <span>+3.0°C (IPCC High)</span>
          </div>
        </div>

        {/* Slider 2: Sea Level Rise */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-slate-200 flex items-center">
              <Waves className="w-4 h-4 text-cyan-400 mr-2" />
              Sea Level Rise (2035)
            </span>
            <span className="font-mono text-cyan-400 font-extrabold text-base sm:text-lg">+{seaLevelRise} cm</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="50" 
            step="1"
            value={seaLevelRise}
            onChange={(e) => setSeaLevelRise(parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>+0 cm</span>
            <span>+50 cm</span>
          </div>
        </div>

        {/* Slider 3: Salinity Surge */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-slate-200 flex items-center">
              <Droplets className="w-4 h-4 text-amber-400 mr-2" />
              Lagoon Salinity Accumulation
            </span>
            <span className="font-mono text-amber-400 font-extrabold text-base sm:text-lg">+{salinityIncrease.toFixed(1)} ppt</span>
          </div>
          <input 
            type="range" 
            min="0.0" 
            max="20.0" 
            step="0.5"
            value={salinityIncrease}
            onChange={(e) => setSalinityIncrease(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>+0 ppt</span>
            <span>+20 ppt (Hyper-saline)</span>
          </div>
        </div>

        {/* Slider 4: Cyclone Frequency */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-slate-200 flex items-center">
              <Zap className="w-4 h-4 text-indigo-400 mr-2" />
              Decadal Cyclone Surge
            </span>
            <span className="font-mono text-indigo-400 font-extrabold text-base sm:text-lg">+{cycloneSurge} storm(s)</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5" 
            step="1"
            value={cycloneSurge}
            onChange={(e) => setCycloneSurge(parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>+0 events</span>
            <span>+5 severe storms</span>
          </div>
        </div>

        {/* Slider 5: Freshwater Cut */}
        <div className="space-y-3 md:col-span-2 lg:col-span-2">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-slate-200 flex items-center">
              <AlertTriangle className="w-4 h-4 text-rose-400 mr-2" />
              Upstream Dam Freshwater Diversion Cut
            </span>
            <span className="font-mono text-rose-400 font-extrabold text-base sm:text-lg">{freshwaterCut}% reduction</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="50" 
            step="5"
            value={freshwaterCut}
            onChange={(e) => setFreshwaterCut(parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>0% (Normal River Flow)</span>
            <span>50% (Severe Dam Diversion)</span>
          </div>
        </div>

      </div>

      {/* Dynamic Simulated Results Cards - Larger Text & Bold Values */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center">
          <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
          ML Predicted Vulnerability Output Across 8 Sanctuaries:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {calculatedSites.map(site => (
            <div key={site.id} className="bg-slate-900/80 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between cursor-pointer">
              <div>
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <span className="text-base font-extrabold text-slate-100 truncate">{site.siteName}</span>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border shrink-0 ${site.statusClass}`}>
                    {site.statusLabel}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-mono font-semibold">{site.district} District</div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-slate-300 font-semibold">Vulnerability Score:</span>
                  <span className="font-extrabold text-cyan-400 text-base">{site.simulatedScore}%</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      site.simulatedScore >= 75 ? 'bg-gradient-to-r from-amber-500 to-rose-500' :
                      site.simulatedScore >= 55 ? 'bg-gradient-to-r from-cyan-500 to-amber-500' :
                      'bg-gradient-to-r from-emerald-500 to-cyan-500'
                    }`}
                    style={{ width: `${site.simulatedScore}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span>Carbon At-Risk:</span>
                  <span className="text-amber-300 font-bold">{site.carbonAtRiskTons.toLocaleString()} tCO₂e</span>
                </div>
                <div className="flex justify-between">
                  <span>Econ. Valuation Loss:</span>
                  <span className="text-rose-400 font-bold">${(site.carbonEconomicLossUSD / 1000).toFixed(1)}k USD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
