import React from 'react';
import { CheckCircle2, ShieldCheck, MapPin, Radio, AlertCircle, HelpCircle } from 'lucide-react';

export function DataStatusBadge({ status, notes }) {
  let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
  let icon = <HelpCircle className="w-3.5 h-3.5 mr-1 text-slate-400" />;

  switch (status) {
    case 'Verified - Site':
      badgeStyle = "bg-emerald-950/80 text-emerald-300 border-emerald-600/50";
      icon = <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />;
      break;

    case 'Verified - Administrative':
      badgeStyle = "bg-teal-950/80 text-teal-300 border-teal-600/50";
      icon = <ShieldCheck className="w-3.5 h-3.5 mr-1 text-teal-400" />;
      break;

    case 'Verified - Station Proxy':
      badgeStyle = "bg-cyan-950/80 text-cyan-300 border-cyan-500/50";
      icon = <Radio className="w-3.5 h-3.5 mr-1 text-cyan-400" />;
      break;

    case 'Verified - District Proxy':
      badgeStyle = "bg-blue-950/80 text-blue-300 border-blue-500/50";
      icon = <MapPin className="w-3.5 h-3.5 mr-1 text-blue-400" />;
      break;

    case 'Verified - Regional Proxy':
      badgeStyle = "bg-indigo-950/80 text-indigo-300 border-indigo-500/50";
      icon = <MapPin className="w-3.5 h-3.5 mr-1 text-indigo-400" />;
      break;

    case 'Verification pending':
      badgeStyle = "bg-amber-950/80 text-amber-300 border-amber-500/50";
      icon = <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-400" />;
      break;

    case 'Data unavailable':
      badgeStyle = "bg-slate-900 text-slate-400 border-slate-700/60";
      icon = <HelpCircle className="w-3.5 h-3.5 mr-1 text-slate-500" />;
      break;

    default:
      break;
  }

  return (
    <div className="inline-flex items-center group relative">
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${badgeStyle}`}>
        {icon}
        {status}
      </span>
      {notes && (
        <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-64 p-2 bg-slate-900 text-slate-200 text-xs rounded border border-slate-700 shadow-xl z-50">
          {notes}
        </div>
      )}
    </div>
  );
}
