import React, { useState } from 'react';
import { Database, Search, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DataStatusBadge } from '../components/DataStatusBadge';

export function DataSourcesPage({ dataSources }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSources = dataSources.filter(src =>
    src.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    src.dataset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    src.parameter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs">
          <Database className="w-4 h-4" />
          <span>Open-Data Transparency Registry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Official Data Sources Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Complete directory proving that all environmental data in Blue Carbon Guardian is sourced strictly from legitimate government, research, and international open-data publications.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by source organization, dataset, or parameter..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500 shadow-sm"
        />
      </div>

      {/* Data Sources Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-100 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" />
            Verified Source Publications ({filteredSources.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">100% Clickable Public URLs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Dataset / Report Title</th>
                <th className="py-3 px-4">Parameters Extracted</th>
                <th className="py-3 px-4">Year / Period</th>
                <th className="py-3 px-4">Geographic Level</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Official Source Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredSources.map(src => (
                <tr key={src.id} className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-emerald-400">{src.organization}</td>
                  <td className="py-3 px-4 font-medium text-slate-200">{src.dataset}</td>
                  <td className="py-3 px-4 text-slate-300">{src.parameter}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{src.year}</td>
                  <td className="py-3 px-4 text-slate-300">{src.geographicLevel}</td>
                  <td className="py-3 px-4">
                    <DataStatusBadge status={src.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={src.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded-lg border border-emerald-600/50 hover:border-emerald-500 transition-colors text-xs font-semibold"
                    >
                      <span>Access Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
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
