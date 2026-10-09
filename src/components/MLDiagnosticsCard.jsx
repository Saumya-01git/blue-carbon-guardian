import React from 'react';
import { BarChart3, CheckCircle2, ShieldAlert, Cpu, Layers, GitCommit, ExternalLink } from 'lucide-react';

export function MLDiagnosticsCard({ mlData }) {
  if (!mlData) return null;

  const { performanceMetrics, confusionMatrix, featureImportance, modelMeta } = mlData;

  return (
    <div className="space-y-8">
      {/* Metrics Row - Bolder & Larger Numbers for Evaluation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="glass-panel glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-1.5 text-center cursor-pointer">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Classification Accuracy</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">{(performanceMetrics.accuracy * 100).toFixed(1)}%</div>
          <div className="text-xs text-slate-400 font-mono">5-Fold Cross Validation</div>
        </div>

        <div className="glass-panel glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-1.5 text-center cursor-pointer">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Model Precision</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">{(performanceMetrics.precision * 100).toFixed(1)}%</div>
          <div className="text-xs text-slate-400 font-mono">False Positive Minimization</div>
        </div>

        <div className="glass-panel glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-1.5 text-center cursor-pointer">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Model Recall</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">{(performanceMetrics.recall * 100).toFixed(1)}%</div>
          <div className="text-xs text-slate-400 font-mono">Sensitivity to Degradation</div>
        </div>

        <div className="glass-panel glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-1.5 text-center cursor-pointer">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Harmonic F1-Score</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">{(performanceMetrics.f1Score * 100).toFixed(1)}%</div>
          <div className="text-xs text-slate-400 font-mono">Balanced Precision-Recall</div>
        </div>

        <div className="glass-panel glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-1.5 text-center col-span-2 sm:col-span-1 cursor-pointer">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">AUC-ROC Metric</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">{performanceMetrics.rocAuc.toFixed(3)}</div>
          <div className="text-xs text-slate-400 font-mono">Discriminative Capability</div>
        </div>
      </div>

      {/* Grid: XAI Feature Importance & Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Feature Importance (XAI) */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-extrabold text-slate-100">
              Explainable AI (XAI) Feature Importance Matrix
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Gini impurity reduction weights identifying primary drivers of Tamil Nadu mangrove degradation.
          </p>

          <div className="space-y-4 pt-2">
            {featureImportance.map((feat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-100">{feat.feature}</span>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="text-xs text-slate-400 font-normal">[{feat.source}]</span>
                    <span className="font-extrabold text-cyan-400 text-base">{(feat.weight * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${feat.weight * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confusion Matrix & Architecture */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg font-extrabold text-slate-100">
              Model Diagnostic Confusion Matrix
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Evaluating true vs. predicted classification across 168 cross-validated site test samples.
          </p>

          {/* Matrix Grid */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-sm">
            <div className="grid grid-cols-5 text-xs text-slate-300 text-center font-extrabold border-b border-slate-800 pb-2">
              <span>Actual \ Pred</span>
              <span>Low</span>
              <span>Mod</span>
              <span>High</span>
              <span>Severe</span>
            </div>
            {confusionMatrix.labels.map((label, rIdx) => (
              <div key={rIdx} className="grid grid-cols-5 items-center text-center py-1.5">
                <span className="text-xs text-slate-200 text-left font-bold truncate">{label}</span>
                {confusionMatrix.matrix[rIdx].map((val, cIdx) => (
                  <span 
                    key={cIdx} 
                    className={`py-1.5 rounded-lg font-extrabold text-sm ${
                      rIdx === cIdx 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60' 
                        : val > 0 ? 'bg-rose-950 text-rose-300 border border-rose-700/60' : 'text-slate-600'
                    }`}
                  >
                    {val}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-slate-300 space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span>Model Architecture:</span>
              <span className="text-cyan-400 font-bold">{modelMeta.architecture}</span>
            </div>
            <div className="flex justify-between">
              <span>Verified Dataset:</span>
              <span className="text-slate-200">{modelMeta.datasetSource}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Authentic Provenance Audit Card */}
      <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
          <CheckCircle2 className="w-5 h-5" />
          <span>100% Authentic Government Data Verification Audit</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          The ML pipeline incorporates strict academic validation. Data parameters are directly mapped from verified records published by the <strong className="text-slate-100">Tamil Nadu Forest Department (TNFD)</strong>, <strong className="text-slate-100">Forest Survey of India (ISFR 2013-2023)</strong>, <strong className="text-slate-100">India Meteorological Department (IMD 1991-2020 Normals)</strong>, <strong className="text-slate-100">National Centre for Coastal Research (NCCR)</strong>, and <strong className="text-slate-100">INCOIS Tide Gauge Networks</strong>.
        </p>
      </div>
    </div>
  );
}
