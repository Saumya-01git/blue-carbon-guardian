import React from 'react';
import { Cpu, CheckCircle2, ArrowRight, ShieldAlert, GitBranch, Layers, BarChart2 } from 'lucide-react';

export function FutureMLPage({ mlSchema }) {
  if (!mlSchema) return null;

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
          <Cpu className="w-4 h-4" />
          <span>Phase 4 Roadmap & Technical Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Future AI Climate Risk Assessment Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Academic Machine Learning pipeline architecture designed for coastal climate risk prediction. Strict rule: <span className="text-rose-400 font-semibold">No fake AI risk predictions are displayed prior to dataset collection, cleaning, and model evaluation.</span>
        </p>
      </div>

      {/* Academic Disclaimer Box */}
      <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl text-xs text-amber-300 leading-relaxed flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Academic Integrity Mandate:</strong> ML model selection (Decision Tree vs. Random Forest vs. XGBoost) will occur strictly after the complete multi-state dataset has been collected, cleaned, and evaluated using cross-validated performance metrics.
        </div>
      </div>

      {/* Pipeline Steps Flow */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center">
          <GitBranch className="w-5 h-5 mr-2 text-emerald-400" />
          Planned Machine Learning Workflow (Steps 1–6)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mlSchema.pipelineSteps.map(step => (
            <div key={step.step} className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-emerald-950 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-emerald-700/50">
                  0{step.step}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  step.status.includes('Progress') || step.status.includes('Defined')
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}>
                  {step.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Matrix & Candidate Algorithms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature Matrix */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center">
            <Layers className="w-4 h-4 mr-2 text-cyan-400" />
            Candidate Feature Vector Matrix
          </h2>
          <div className="space-y-2">
            {mlSchema.candidateFeatures.map((feat, i) => (
              <div key={i} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{feat.feature}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-cyan-400">{feat.unit}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({feat.source})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Algorithms & Evaluation */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center">
            <BarChart2 className="w-4 h-4 mr-2 text-indigo-400" />
            Candidate ML Algorithms & Metrics
          </h2>

          <div className="space-y-3">
            {mlSchema.candidateAlgorithms.map((algo, i) => (
              <div key={i} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400">{algo.name}</div>
                <div className="text-xs text-slate-400">{algo.purpose}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-300 mb-2">Evaluation Metrics:</div>
            <div className="flex flex-wrap gap-2">
              {mlSchema.evaluationMetrics.map((met, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300 font-mono">
                  {met}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
