import React, { useState } from 'react';
import { Database, Search, ExternalLink, ShieldCheck, CheckCircle2, Download, Printer, FileSpreadsheet } from 'lucide-react';
import { DataStatusBadge } from '../components/DataStatusBadge';
import { downloadFullMasterCSV, downloadAcademicPDFDossier } from '../utils/dossierExport';

export function DataSourcesPage({ dataSources }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const filteredSources = dataSources.filter(src =>
    src.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    src.dataset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    src.parameter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMasterCSVDownload = () => {
    downloadFullMasterCSV();
    setDownloadSuccess('Verified Master Environmental Dataset (Excel / CSV) downloaded!');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  const handlePDFDossierDownload = () => {
    downloadAcademicPDFDossier([], null);
    setDownloadSuccess('Academic ML Architecture & Data Provenance Dossier (PDF) opened!');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner - Clean Responsive Frame Layout */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm font-bold">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>Open-Data Transparency Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            Official Data Sources & Provenance Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-5xl">
            Complete directory proving that all environmental data in Blue Carbon Guardian is sourced strictly from legitimate government, research, and international open-data publications (<strong className="text-slate-100 font-bold">TNFD</strong>, <strong className="text-slate-100 font-bold">FSI ISFR</strong>, <strong className="text-slate-100 font-bold">IMD</strong>, <strong className="text-slate-100 font-bold">NCCR</strong>, <strong className="text-slate-100 font-bold">INCOIS</strong>, <strong className="text-slate-100 font-bold">Ramsar RIS</strong>).
          </p>
        </div>

        {/* 2 ACADEMIC DOWNLOAD BUTTONS - Contained Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
          <button
            onClick={handleMasterCSVDownload}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xl shadow-emerald-950/50 transition border border-emerald-400/40 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 shrink-0" />
            <span className="truncate">Download Master Dataset (CSV)</span>
          </button>

          <button
            onClick={handlePDFDossierDownload}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xl shadow-indigo-950/50 transition border border-cyan-400/40 cursor-pointer"
          >
            <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 shrink-0" />
            <span className="truncate">Download Data & ML Dossier (PDF)</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-4 bg-emerald-950 border border-emerald-600/80 rounded-xl text-sm text-emerald-200 flex items-center space-x-3 font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by source organization, dataset, or parameter..."
          className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-emerald-500 shadow-md font-semibold"
        />
      </div>

      {/* Data Sources Table - Enlarged Fonts */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center">
            <ShieldCheck className="w-6 h-6 mr-2 text-emerald-400" />
            Verified Source Publications ({filteredSources.length})
          </h2>
          <span className="text-xs sm:text-sm text-slate-300 font-mono font-bold">100% Clickable Public Government URLs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-900 text-slate-300 font-mono text-xs uppercase border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">Organization</th>
                <th className="py-3.5 px-4 font-bold">Dataset / Report Title</th>
                <th className="py-3.5 px-4 font-bold">Parameters Extracted</th>
                <th className="py-3.5 px-4 font-bold">Year / Period</th>
                <th className="py-3.5 px-4 font-bold">Geographic Level</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 text-right font-bold">Official Source Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredSources.map(src => (
                <tr key={src.id} className="hover:bg-slate-900/60">
                  <td className="py-4 px-4 font-extrabold text-emerald-400">{src.organization}</td>
                  <td className="py-4 px-4 font-bold text-slate-100">{src.dataset}</td>
                  <td className="py-4 px-4 text-slate-300 font-medium">{src.parameter}</td>
                  <td className="py-4 px-4 font-mono text-slate-300 font-bold">{src.year}</td>
                  <td className="py-4 px-4 text-slate-300">{src.geographicLevel}</td>
                  <td className="py-4 px-4">
                    <DataStatusBadge status={src.status} />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <a
                      href={src.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-3.5 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 rounded-xl border border-emerald-600/60 hover:border-emerald-500 transition-colors text-xs font-bold shadow-md"
                    >
                      <span>Access Portal</span>
                      <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
