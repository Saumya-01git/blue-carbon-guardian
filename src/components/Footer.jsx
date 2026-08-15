import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-8 text-xs text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-slate-200 font-semibold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Blue Carbon Guardian — AI-Based Coastal Ecosystem Monitoring & Climate Risk Assessment</span>
            </div>
            <p className="text-slate-400">
              Academic Environmental Research Platform for Tamil Nadu Coastal & Blue Carbon Ecosystems.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-slate-400">
            <span className="inline-flex items-center text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
              Real Open-Data Sources Active
            </span>
            <a
              href="https://rsis.ramsar.org/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-200 transition-colors inline-flex items-center"
            >
              RSIS <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
            <a
              href="https://fsi.nic.in"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-200 transition-colors inline-flex items-center"
            >
              FSI ISFR <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
            <a
              href="https://imdpune.gov.in"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-200 transition-colors inline-flex items-center"
            >
              IMD <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
        <div className="border-t border-slate-900 mt-6 pt-4 text-center text-slate-400 text-[11px]">
          Strict Academic Integrity Standards: No fabricated environmental values. Uncollected metrics display "Data unavailable" or "Verification pending".
        </div>
      </div>
    </footer>
  );
}
