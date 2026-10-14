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
        <p className="text-sm sm:text-base text-slate-200 font-medium">
          Report coastal pollution, mangrove damage, or shoreline erosion observed in your area. All community reports are strictly segregated from official government-verified datasets and tagged as <span className="text-amber-300 font-bold">"User Community Observation — Not Officially Verified"</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submission Form */}
        <div className="lg:col-span-1 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 shadow-xl">
          <h2 className="text-xl font-black text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-emerald-400" />
            Submit Observation
          </h2>

          {submitted && (
            <div className="p-4 bg-emerald-950/90 border border-emerald-500 rounded-2xl text-emerald-200 text-sm flex items-center space-x-2 font-bold animate-fade-in shadow-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Observation recorded locally as Community Record.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Target Coastal Location</label>
              <select
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name} ({loc.district})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Issue Category</label>
              <select
                value={issueType}
                onChange={e => setIssueType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
              >
                {issueOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Observation Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe observed issue (e.g. plastic debris accumulation near jetty channel)..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">Optional GPS Coordinates</label>
              <input
                type="text"
                value={coordinates}
                onChange={e => setCoordinates(e.target.value)}
                placeholder="e.g. 11.4390° N, 79.7870° E"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3.5 bg-amber-950/50 border border-amber-800/60 rounded-xl text-xs text-amber-200 leading-relaxed font-medium">
              <strong className="text-amber-300">Academic Notice:</strong> Your submission will be labeled as an unverified community observation. It will not mutate official government baseline records.
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Report</span>
            </button>
          </form>
        </div>

        {/* Existing Reports List */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">
              Recent Community Observations ({reports.length})
            </h2>
            <span className="text-xs sm:text-sm text-amber-300 bg-amber-950 px-3 py-1.5 rounded-xl border border-amber-700 font-mono font-bold">
              Not Officially Verified Data
            </span>
          </div>

          <div className="space-y-4">
            {reports.map(rep => (
              <div key={rep.id} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-3 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-700 text-xs font-semibold">
                      {rep.issueType}
                    </span>
                    <span className="text-sm font-bold text-white">{rep.locationName}</span>
                  </div>
                  <span className="text-xs text-slate-300 font-mono font-bold">Date: {rep.date}</span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-normal">{rep.description}</p>

                <div className="flex items-center justify-between pt-2.5 text-xs text-slate-300 border-t border-slate-800/60 font-mono">
                  <span>Observer: <strong className="text-white">{rep.submittedBy}</strong></span>
                  <span>GPS: <strong className="text-emerald-300">{rep.coordinates}</strong></span>
                </div>

                <div className="mt-2 inline-flex items-center text-xs text-amber-300 bg-amber-950 px-3 py-1 rounded-lg border border-amber-700 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
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
