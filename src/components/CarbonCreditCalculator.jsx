import React, { useState } from 'react';
import { DollarSign, TreePine, ShieldCheck, RefreshCw, Calculator, Globe, TrendingUp, HelpCircle } from 'lucide-react';

export function CarbonCreditCalculator({ sitesData }) {
  const [carbonPriceUSD, setCarbonPriceUSD] = useState(120); // $120/ton default
  const [reforestationHa, setReforestationHa] = useState(1500); // ha target

  const handleReset = () => {
    setCarbonPriceUSD(120);
    setReforestationHa(1500);
  };

  // Robust calculation handling both tnfd_verified_master.json (fsiCanopyCover2023_ha) and locations.json (areaHectares)
  const calculatedHa = (sitesData && sitesData.length > 0)
    ? sitesData.reduce((acc, s) => acc + (s.fsiCanopyCover2023_ha || s.areaHectares || 0), 0)
    : 28538.60;
  const totalCanopyHa = calculatedHa > 0 ? calculatedHa : 28538.60;

  const totalSoilCarbonTons = Math.round(totalCanopyHa * 150); // ~150 tons CO2e/ha
  const annualSequestrationTons = Math.round(totalCanopyHa * 6.5); // ~6.5 tons CO2e/ha/yr
  const annualCreditRevenueUSD = Math.round(annualSequestrationTons * carbonPriceUSD);

  const reforestedCarbonTons = Math.round(reforestationHa * 6.5 * 10); // 10-year carbon gain
  const reforestedRevenueUSD = Math.round(reforestedCarbonTons * carbonPriceUSD);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm mb-1 font-bold">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span className="px-2.5 py-1 bg-emerald-950 text-emerald-200 border border-emerald-600/60 rounded-lg text-xs">Paris Agreement Article 6 Framework</span>
            <span>• Blue Carbon Monetization Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
            Blue Carbon Credit & Economic Value Estimator ($ USD)
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Quantify carbon sequestration revenue and avoided climate damage savings for Tamil Nadu's 12 coastal mangrove sanctuaries.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition shadow-md cursor-pointer shrink-0"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span>Reset Calculator</span>
        </button>
      </div>

      {/* Simple Plain-English Explanation Box for tCO2e */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 flex items-start space-x-3">
        <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-emerald-300 block">💡 What is "tCO₂e"? (Simple Plain English Explanation)</span>
          <p className="text-slate-300 leading-relaxed text-xs">
            <strong className="text-emerald-200">tCO₂e</strong> stands for <strong className="text-white font-mono font-bold">Tonnes of Carbon Dioxide Equivalent</strong>.
            It is the standard international unit used to measure how much carbon dioxide gas mangroves capture and clean from the atmosphere.
            <span className="block mt-1 text-slate-400">
              • <strong className="text-emerald-300">1 tCO₂e</strong> = 1 Metric Ton (1,000 kg) of CO₂ absorbed by mangrove trees & mud soil.
              <br />
              • <strong className="text-emerald-300">Carbon Credits</strong>: Each 1 tCO₂e saved can be sold as 1 Carbon Credit on international carbon markets (ranging from $20 to $200 USD per credit).
            </span>
          </p>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
        
        {/* Slider 1: Carbon Market Price */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-slate-200 flex items-center">
              <DollarSign className="w-4 h-4 text-emerald-400 mr-2" />
              Global Carbon Market Price ($/tCO₂e)
            </span>
            <span className="font-mono text-emerald-400 font-extrabold text-base sm:text-lg">${carbonPriceUSD} USD/ton</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="200" 
            step="5"
            value={carbonPriceUSD}
            onChange={(e) => setCarbonPriceUSD(parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>$20 (Compliance Minimum)</span>
            <span>$200 (EU ETS Premium)</span>
          </div>
        </div>

        {/* Slider 2: Afforestation Target */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-slate-200 flex items-center">
              <TreePine className="w-4 h-4 text-cyan-400 mr-2" />
              TN-SHORE Afforestation Target (ha)
            </span>
            <span className="font-mono text-cyan-400 font-extrabold text-base sm:text-lg">+{reforestationHa.toLocaleString()} ha</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="5000" 
            step="100"
            value={reforestationHa}
            onChange={(e) => setReforestationHa(parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>100 ha (Pilot Creek)</span>
            <span>5,000 ha (MISHTI State Horizon)</span>
          </div>
        </div>

      </div>

      {/* Outputs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        <div className="bg-slate-900/90 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
          <div className="text-slate-400 text-xs font-semibold uppercase">Total Soil Carbon Stock</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{totalSoilCarbonTons.toLocaleString()} tCO₂e</div>
          <div className="text-xs text-slate-400 font-semibold">Across 12 TN Coastal Sanctuaries</div>
        </div>

        <div className="bg-slate-900/90 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
          <div className="text-slate-400 text-xs font-semibold uppercase">Annual Sequestration Rate</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">{annualSequestrationTons.toLocaleString()} tCO₂e/yr</div>
          <div className="text-xs text-slate-400 font-semibold">Active Net Sequestration</div>
        </div>

        <div className="bg-slate-900/90 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
          <div className="text-slate-400 text-xs font-semibold uppercase">Annual Carbon Credit Revenue</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">${(annualCreditRevenueUSD / 1000000).toFixed(2)}M USD/yr</div>
          <div className="text-xs text-emerald-400 font-bold">At ${carbonPriceUSD}/ton Market Value</div>
        </div>

        <div className="bg-slate-900/90 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
          <div className="text-slate-400 text-xs font-semibold uppercase">10-Yr Afforestation Yield</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">${(reforestedRevenueUSD / 1000000).toFixed(2)}M USD</div>
          <div className="text-xs text-emerald-400 font-bold">From +{reforestationHa.toLocaleString()} ha Planting Target</div>
        </div>

      </div>
    </div>
  );
}

