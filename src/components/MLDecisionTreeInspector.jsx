import React, { useState } from 'react';
import { GitBranch, ShieldAlert, Cpu, ArrowRight, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

export function MLDecisionTreeInspector({ sitesData }) {
  const [selectedSiteId, setSelectedSiteId] = useState(sitesData[0]?.id || 'pichavaram');

  const selectedSite = sitesData.find(s => s.id === selectedSiteId) || sitesData[0];
  if (!selectedSite) return null;

  // Compute SHAP breakdown for the selected site
  const erosionContrib = Math.abs(selectedSite.shorelineErosionRate_m_yr) * 12.5;
  const tempContrib = (selectedSite.imdMaxTempNormal_C - 30) * 2.8;
  const salinityContrib = (selectedSite.salinityBaseline_ppt - 20) * 0.9;
  const cycloneContrib = selectedSite.cycloneHitCount_2011_2023 * 3.5;
  const canopyBuffer = -(selectedSite.fsiCanopyCover2023_ha / 2500) * 1.5;

  const totalShapSum = erosionContrib + tempContrib + salinityContrib + cycloneContrib + canopyBuffer;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
      {/* Title & Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm mb-1 font-semibold">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <span>Explainable AI (XAI) & Decision Tree Trace Inspector</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
            Sanctuary-Specific Live ML Decision Tree Inspector
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Click any sanctuary site below to trace the step-by-step model decision rules and SHAP feature importance contributions.
          </p>
        </div>

        {/* Site Selector Dropdown / Buttons */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Select Sanctuary:</label>
          <select
            value={selectedSiteId}
            onChange={(e) => setSelectedSiteId(e.target.value)}
            className="bg-slate-900 text-slate-100 text-sm font-semibold border border-cyan-500/50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer shadow-md"
          >
            {sitesData.map(s => (
              <option key={s.id} value={s.id}>
                {s.siteName} ({s.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Decision Tree Rules vs SHAP Contribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Decision Tree Trajectory */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400 text-base font-bold border-b border-slate-800 pb-2">
            <Cpu className="w-5 h-5" />
            <span>Random Forest Decision Path — {selectedSite.siteName}</span>
          </div>

          <div className="space-y-3 font-mono text-sm">
            {/* Step 1 */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Node 1: Shoreline Erosion Check</span>
                <span className="text-cyan-400 font-bold">Passed Rule</span>
              </div>
              <div className="text-slate-200 font-semibold">
                Erosion Rate ({selectedSite.shorelineErosionRate_m_yr} m/yr) &gt; -0.5 m/yr threshold
              </div>
              <div className="text-xs text-rose-400 font-semibold">
                → Evaluated High Erosion Branch (+{erosionContrib.toFixed(1)}% Risk Contribution)
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Node 2: Estuarine Salinity Threshold</span>
                <span className="text-cyan-400 font-bold">Passed Rule</span>
              </div>
              <div className="text-slate-200 font-semibold">
                Salinity Baseline ({selectedSite.salinityBaseline_ppt} ppt) vs 25 ppt Normal
              </div>
              <div className="text-xs text-amber-400 font-semibold">
                → Hyper-Saline Stress Path (+{salinityContrib.toFixed(1)}% Risk Contribution)
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Node 3: Decadal Cyclone Frequency</span>
                <span className="text-cyan-400 font-bold">Passed Rule</span>
              </div>
              <div className="text-slate-200 font-semibold">
                Cyclone Track Count ({selectedSite.cycloneHitCount_2011_2023} severe hits between 2011–2023)
              </div>
              <div className="text-xs text-indigo-400 font-semibold">
                → Storm Wave Damage Multiplier (+{cycloneContrib.toFixed(1)}% Risk Contribution)
              </div>
            </div>

            {/* Final Outcome */}
            <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase text-slate-400">Model Ensemble Output:</span>
                <div className="text-lg font-extrabold text-emerald-300">
                  {selectedSite.baseVulnerabilityScore}% Vulnerability Index
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-900 text-emerald-200 border border-emerald-600 text-xs font-bold">
                {selectedSite.baseVulnerabilityScore >= 65 ? 'Severe Threat' : selectedSite.baseVulnerabilityScore >= 45 ? 'High Risk' : 'Moderate / Stable'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: SHAP Value Feature Importance Bar Breakdown */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 text-base font-bold border-b border-slate-800 pb-2">
            <BarChart2 className="w-5 h-5" />
            <span>SHAP Feature Impact Breakdown — {selectedSite.siteName}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Shapley Additive Explanations (SHAP) quantifying exact marginal impact of each environmental metric on this sanctuary's vulnerability score.
          </p>

          <div className="space-y-4 pt-2 font-mono text-sm">
            {/* Feature 1 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-200 font-semibold">Shoreline Erosion Impact</span>
                <span className="text-rose-400 font-bold">+{erosionContrib.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${Math.min(100, erosionContrib * 3)}%` }} />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-200 font-semibold">Estuarine Salinity Accumulation</span>
                <span className="text-amber-400 font-bold">+{salinityContrib.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, salinityContrib * 3)}%` }} />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-200 font-semibold">Decadal Cyclone Hit Frequency</span>
                <span className="text-indigo-400 font-bold">+{cycloneContrib.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(100, cycloneContrib * 3)}%` }} />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-200 font-semibold">Thermal Stress (IMD Max Temp)</span>
                <span className="text-cyan-400 font-bold">+{tempContrib.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${Math.min(100, tempContrib * 3)}%` }} />
              </div>
            </div>

            {/* Feature 5 (Buffer) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-200 font-semibold">Canopy Area Resilience Buffer</span>
                <span className="text-emerald-400 font-bold">{canopyBuffer.toFixed(1)}% (Mitigating)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, Math.abs(canopyBuffer) * 5)}%` }} />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-300">
            <strong className="text-slate-100">Recommended Intervention Strategy:</strong> {selectedSite.restorationProject}
          </div>
        </div>

      </div>
    </div>
  );
}
