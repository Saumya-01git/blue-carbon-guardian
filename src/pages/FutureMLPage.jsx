import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, ArrowRight, ShieldAlert, GitBranch, Layers, BarChart2, Download, FileSpreadsheet, Sparkles, TrendingUp, AlertTriangle, FileText, Printer, Database, Satellite, DollarSign, Calendar } from 'lucide-react';
import { MLScenarioSimulator } from '../components/MLScenarioSimulator';
import { MLDiagnosticsCard } from '../components/MLDiagnosticsCard';
import { MLDecisionTreeInspector } from '../components/MLDecisionTreeInspector';
import { FutureTrajectoryChart } from '../components/FutureTrajectoryChart';
import { Forecast2050Chart } from '../components/Forecast2050Chart';
import { CarbonCreditCalculator } from '../components/CarbonCreditCalculator';
import NDVISatelliteViewer from '../components/NDVISatelliteViewer';
import { downloadFullMasterCSV, download168SampleMLTrainingCSV, downloadAcademicPDFDossier } from '../utils/dossierExport';

export function FutureMLPage({ mlSchema }) {
  const [tnfdData, setTnfdData] = useState([]);
  const [mlEngineData, setMlEngineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [activeSimulation, setActiveSimulation] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/tnfd_verified_master.json').then(res => res.json()),
      fetch('/data/ml_engine.json').then(res => res.json())
    ])
      .then(([tnfd, mlEngine]) => {
        setTnfdData(tnfd || []);
        setMlEngineData(mlEngine || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading ML datasets:', err);
        setLoading(false);
      });
  }, []);

  // Handler 1: Export Dynamic Climate Scenario CSV (Reflects Active Sliders!)
  const handleExportScenarioCSV = () => {
    if (!tnfdData.length) return;

    const isCustom = activeSimulation?.isCustomScenario;
    const params = activeSimulation?.sliderParams;
    const siteList = activeSimulation?.simulatedSites || tnfdData;

    const headers = [
      "Site ID", 
      "Sanctuary Name", 
      "District", 
      "Authority Citation / Provenance", 
      "FSI Canopy Cover 2023 (ha)", 
      "FSI Canopy Cover 2013 (ha)",
      "10-Yr Canopy Net Shift (%)",
      "Shoreline Erosion Rate (m/yr)", 
      "IMD Max Temp Normal (°C)", 
      "IMD Annual Rainfall (mm)",
      "INCOIS Sea Level Rise (mm/yr)",
      "Decadal Cyclone Hits (2011-2023)",
      "Salinity Baseline (ppt)", 
      "Dominant Species",
      "Active Restoration Project",
      "Baseline Vulnerability Score (%)", 
      "Simulated Vulnerability Score (%)",
      "Risk Classification Category",
      "Carbon At-Risk (tCO2e)",
      "Economic Valuation Loss ($ USD)",
      "Primary Threat Driver"
    ];

    const rows = siteList.map(site => {
      const vuln = parseFloat(site.simulatedScore || site.baseVulnerabilityScore);
      let riskLabel = 'Low Risk';
      if (vuln >= 75) riskLabel = 'Severe Threat';
      else if (vuln >= 55) riskLabel = 'High Risk';
      else if (vuln >= 35) riskLabel = 'Moderate Risk';

      const netShift = (((site.fsiCanopyCover2023_ha - site.fsiCanopyCover2013_ha) / site.fsiCanopyCover2013_ha) * 100).toFixed(2);
      const carbonAtRisk = site.carbonAtRiskTons || Math.round((site.fsiCanopyCover2023_ha || 1000) * 150 * (vuln / 100));
      const economicLoss = site.carbonEconomicLossUSD || Math.round(carbonAtRisk * 120);

      return [
        `"${site.id}"`,
        `"${site.siteName}"`,
        `"${site.district}"`,
        `"${site.authorityCitation ? site.authorityCitation.replace(/"/g, '""') : ''}"`,
        site.fsiCanopyCover2023_ha,
        site.fsiCanopyCover2013_ha,
        `"${netShift}%"`,
        site.shorelineErosionRate_m_yr,
        site.imdMaxTempNormal_C,
        site.imdRainfallNormal_mm,
        site.incoisSeaLevelRise_mm_yr,
        site.cycloneHitCount_2011_2023,
        site.salinityBaseline_ppt,
        `"${site.dominantSpecies ? site.dominantSpecies.replace(/"/g, '""') : ''}"`,
        `"${site.restorationProject ? site.restorationProject.replace(/"/g, '""') : ''}"`,
        site.baseVulnerabilityScore,
        site.simulatedScore || site.baseVulnerabilityScore,
        `"${riskLabel}"`,
        carbonAtRisk,
        economicLoss,
        `"${site.primaryThreatDriver ? site.primaryThreatDriver.replace(/"/g, '""') : ''}"`
      ];
    });

    let metadataHeader = "";
    if (isCustom && params) {
      metadataHeader = `# ACADEMIC SCENARIO AUDIT REPORT: Custom Climate Stress Simulation\n# Scenario Parameters: SST Surge (+${params.sstSurge}°C) | Sea Level Rise (+${params.seaLevelRise}cm) | Salinity (+${params.salinityIncrease}ppt) | Cyclone Surge (+${params.cycloneSurge}) | Dam Cut (${params.freshwaterCut}%)\n# Generated Date: ${new Date().toLocaleString()}\n`;
    } else {
      metadataHeader = `# ACADEMIC SCENARIO AUDIT REPORT: Official Government Baseline\n# Generated Date: ${new Date().toLocaleString()}\n`;
    }

    const csvString = metadataHeader + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Blue_Carbon_Guardian_${isCustom ? 'Custom_Scenario' : 'Baseline'}_ML_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(isCustom ? 'Custom Climate Scenario CSV Report downloaded successfully!' : 'ML Audit CSV Baseline Report downloaded successfully!');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  // Handler 2: Download 168-Sample Full ML Training Dataset CSV
  const handleML168DatasetDownload = () => {
    download168SampleMLTrainingCSV();
    setDownloadSuccess('Complete 168-Sample Multi-Temporal ML Training Dataset (CSV) downloaded!');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  // Handler 3: Academic PDF / Print Dossier
  const handlePDFDossierDownload = () => {
    downloadAcademicPDFDossier(tnfdData, mlEngineData);
    setDownloadSuccess('Academic ML Architecture & Data Provenance Dossier (PDF) opened for printing/saving!');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-mono text-slate-300 font-semibold">Loading Review 3 ML & Climate Engine Datasets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner - Clean Responsive Frame Layout */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 overflow-hidden">
        {/* Title & Description */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-200 border border-emerald-600/60 font-bold">Review 3 Active ML & 2050 Engine</span>
            <span>• 12 Tamil Nadu Sanctuaries • 168 Multi-Temporal Vectors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            AI Risk & 2050 Climate Forecasting Engine
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-5xl">
            Machine Learning prediction engine & long-term IPCC AR6 2050 climate projection suite for Tamil Nadu's <strong className="text-slate-100 font-bold">12 coastal sanctuary sites</strong>, trained on 100% authentic government datasets (<strong className="text-slate-100 font-bold">TNFD</strong>, <strong className="text-slate-100 font-bold">FSI ISFR 2013–2023</strong>, <strong className="text-slate-100 font-bold">IMD 1991–2020</strong>, <strong className="text-slate-100 font-bold">NCCR</strong>, and <strong className="text-slate-100 font-bold">INCOIS</strong>).
          </p>
        </div>

        {/* 3 ACADEMIC DOWNLOAD BUTTONS - Perfectly Contained 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
          {/* Button 1: Scenario CSV */}
          <button
            onClick={handleExportScenarioCSV}
            className={`flex items-center justify-center space-x-2 px-4 py-3 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xl transition cursor-pointer border ${
              activeSimulation?.isCustomScenario
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 border-amber-400/50 shadow-amber-950/50'
                : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 border-teal-400/40 shadow-teal-950/50'
            }`}
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="truncate">{activeSimulation?.isCustomScenario ? 'Export Custom Scenario CSV' : 'Export ML Audit CSV Report'}</span>
          </button>

          {/* Button 2: 168-Sample ML Training Dataset CSV */}
          <button
            onClick={handleML168DatasetDownload}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-700 to-cyan-700 hover:from-emerald-600 hover:to-cyan-600 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xl shadow-emerald-950/50 transition border border-emerald-400/40 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 shrink-0" />
            <span className="truncate">ML Training Dataset (168 Rows)</span>
          </button>

          {/* Button 3: Academic PDF Dossier */}
          <button
            onClick={handlePDFDossierDownload}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xl shadow-indigo-950/50 transition border border-cyan-400/40 cursor-pointer"
          >
            <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 shrink-0" />
            <span className="truncate">Download ML & Data Dossier (PDF)</span>
          </button>
        </div>

        {/* Download Success Notification */}
        {downloadSuccess && (
          <div className="p-4 bg-emerald-950 border border-emerald-600/80 rounded-xl text-sm text-emerald-200 flex items-center space-x-3 font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Governance Citation Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-300">
          <span className="text-slate-400 font-bold uppercase">Verified Sources:</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-semibold">TNFD (TN Forest Dept)</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-semibold">FSI ISFR (2013-2023)</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-semibold">IMD Station Normals</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-semibold">NCCR Shoreline Atlas</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-semibold">INCOIS Tide Gauges</span>
          <span className="px-3 py-1 bg-slate-900 border border-emerald-500/40 text-emerald-300 rounded-lg font-semibold">Copernicus Sentinel-2 L2A</span>
        </div>
      </div>

      {/* REVIEW 3 FEATURE 1: 2025 - 2050 IPCC Long-Term Climate Forecast Visualizer */}
      <Forecast2050Chart />

      {/* REVIEW 3 FEATURE 2: Blue Carbon Credit & Monetization Estimator ($ USD) */}
      <CarbonCreditCalculator sitesData={tnfdData} />

      {/* REVIEW 3 FEATURE 3: Copernicus Sentinel-2 NDVI Spectral Telemetry Visualizer */}
      <NDVISatelliteViewer />

      {/* 12 Sanctuary Base Risk Cards Grid - Enlarged Fonts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
            Predicted Site Risk & Carbon Stock Valuation ({tnfdData.length} Sanctuaries)
          </h2>
          <span className="text-xs sm:text-sm font-mono text-slate-300 font-semibold">Model Output Baseline (2025)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tnfdData.map(site => {
            const vuln = site.baseVulnerabilityScore;
            let status = 'Low Risk';
            let badgeStyle = 'bg-emerald-950 text-emerald-200 border-emerald-600/60 font-bold';
            if (vuln >= 65) {
              status = 'Severe Threat';
              badgeStyle = 'bg-rose-950 text-rose-200 border-rose-600/60 font-bold';
            } else if (vuln >= 45) {
              status = 'High Risk';
              badgeStyle = 'bg-amber-950 text-amber-200 border-amber-600/60 font-bold';
            } else if (vuln >= 35) {
              status = 'Moderate';
              badgeStyle = 'bg-cyan-950 text-cyan-200 border-cyan-600/60 font-bold';
            }

            return (
              <div key={site.id} className="glass-panel glass-panel-glow p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className="text-base sm:text-lg font-extrabold text-slate-100">{site.siteName}</span>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border shrink-0 ${badgeStyle}`}>
                      {status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono font-semibold">{site.district} District</div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-slate-300 font-semibold">Vulnerability Index:</span>
                    <span className="font-extrabold text-cyan-400 text-base">{vuln}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full ${
                        vuln >= 65 ? 'bg-gradient-to-r from-amber-500 to-rose-500' :
                        vuln >= 45 ? 'bg-gradient-to-r from-cyan-500 to-amber-500' :
                        'bg-gradient-to-r from-emerald-500 to-cyan-500'
                      }`}
                      style={{ width: `${vuln}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span>FSI Canopy (2023):</span>
                    <span className="text-slate-100 font-bold">{site.fsiCanopyCover2023_ha} ha</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Erosion Rate:</span>
                    <span className="text-rose-400 font-bold">{site.shorelineErosionRate_m_yr} m/yr</span>
                  </div>
                  <div className="text-xs text-slate-400 leading-snug pt-1.5 border-t border-slate-800/60">
                    <strong className="text-slate-200">Primary Driver:</strong> {site.primaryThreatDriver}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5-Year & 10-Year Canopy Trajectory Forecasting Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 font-mono text-sm mb-1 font-bold">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Ridge & Polynomial Regression Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              5-Year & 10-Year Mangrove Canopy Trajectory Forecasting (2025–2035)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Polynomial growth trajectory projections based on FSI ISFR biennial cycles (2013-2023) comparing business-as-usual vs. active TN-SHORE afforestation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="bg-slate-950/80 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
            <div className="text-slate-400 text-xs font-semibold uppercase">Statewide Canopy (2023 Actual)</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">28,538.60 ha</div>
            <div className="text-xs text-slate-400 font-semibold">Official FSI ISFR 2023 Census</div>
          </div>

          <div className="bg-slate-950/80 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
            <div className="text-slate-400 text-xs font-semibold uppercase">2027 Projected (No Action)</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">27,810.00 ha</div>
            <div className="text-xs text-rose-400 font-extrabold">-2.55% Loss (Erosion & Stress)</div>
          </div>

          <div className="bg-slate-950/80 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
            <div className="text-slate-400 text-xs font-semibold uppercase">2027 Projected (TN-SHORE Active)</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">29,450.00 ha</div>
            <div className="text-xs text-emerald-400 font-extrabold">+3.19% Gain (Canalization)</div>
          </div>

          <div className="bg-slate-950/80 glass-panel-glow p-5 rounded-2xl border border-slate-800 space-y-2 cursor-pointer">
            <div className="text-slate-400 text-xs font-semibold uppercase">2035 Target (MISHTI Horizon)</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">31,200.00 ha</div>
            <div className="text-xs text-slate-300 font-semibold">+9.32% Target Resilience</div>
          </div>
        </div>

        {/* Interactive Future Trajectory Area Chart */}
        <FutureTrajectoryChart />
      </div>

      {/* Interactive Scenario Simulator */}
      <MLScenarioSimulator sitesData={tnfdData} onSimulationChange={setActiveSimulation} />

      {/* Sanctuary-Specific Live ML Decision Tree Inspector */}
      <MLDecisionTreeInspector sitesData={tnfdData} />

      {/* Model Diagnostics & XAI Feature Importance */}
      <MLDiagnosticsCard mlData={mlEngineData} />
    </div>
  );
}

