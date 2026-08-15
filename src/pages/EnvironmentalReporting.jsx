import React, { useState } from 'react';
import { FileText, AlertTriangle, Send, ShieldAlert, CheckCircle2, Camera } from 'lucide-react';

export function EnvironmentalReporting({ locations, reports, onAddReport, user }) {
  const [locationId, setLocationId] = useState(locations[0]?.id || 'pichavaram');
  const [issueType, setIssueType] = useState('Plastic Pollution');
  const [description, setDescription] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const issueOptions = [
    'Plastic Pollution',
    'Mangrove Damage',
    'Coastal Erosion Observation',
    'Waste Dumping',
    'Habitat Damage',
    'Other Coastal Issue'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const locObj = locations.find(l => l.id === locationId);
    
    onAddReport({
      locationId,
      locationName: locObj ? locObj.name : locationId,
      issueType,
      description,
      date: new Date().toISOString().split('T')[0],
      coordinates: coordinates || 'Not Provided',
      submittedBy: user ? user.name : 'Anonymous Community Observer'
    });

    setDescription('');
    setCoordinates('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs">
          <AlertTriangle className="w-4 h-4" />
          <span>Community Science & Environmental Observation Module</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Environmental Community Reporting
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Report coastal pollution, mangrove damage, or shoreline erosion observed in your area. All community reports are strictly segregated from official government-verified datasets and tagged as <span className="text-amber-300 font-semibold">"User Community Observation — Not Officially Verified"</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submission Form */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-emerald-400" />
            Submit Observation
          </h2>

          {submitted && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Observation recorded locally as Community Record.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Coastal Location</label>
              <select
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name} ({loc.district})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Issue Category</label>
              <select
                value={issueType}
                onChange={e => setIssueType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {issueOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Observation Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe observed issue (e.g. plastic debris accumulation near jetty channel)..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Optional GPS Coordinates</label>
              <input
                type="text"
                value={coordinates}
                onChange={e => setCoordinates(e.target.value)}
                placeholder="e.g. 11.4390° N, 79.7870° E"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-900/50 rounded-xl text-[11px] text-amber-300/90 leading-relaxed">
              <strong>Academic Notice:</strong> Your submission will be labeled as a unverified community observation. It will not mutate official government baseline records.
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Report</span>
            </button>
          </form>
        </div>

        {/* Existing Reports List */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100">
              Recent Community Observations ({reports.length})
            </h2>
            <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40 font-mono">
              Not Officially Verified Data
            </span>
          </div>

          <div className="space-y-4">
            {reports.map(rep => (
              <div key={rep.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 text-xs font-semibold">
                      {rep.issueType}
                    </span>
                    <span className="text-xs font-bold text-slate-200">{rep.locationName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Date: {rep.date}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{rep.description}</p>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-800/60 font-mono">
                  <span>Observer: {rep.submittedBy}</span>
                  <span>GPS: {rep.coordinates}</span>
                </div>

                <div className="mt-2 inline-flex items-center text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50">
                  <ShieldAlert className="w-3 h-3 mr-1" />
                  {rep.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
