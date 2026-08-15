import { useState, useEffect } from 'react';

const COMMUNITY_REPORTS_KEY = 'blue_carbon_community_reports';
const PLANTATION_LOGS_KEY = 'blue_carbon_plantation_logs';

export function useDataStore() {
  const [locations, setLocations] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [mlPipeline, setMlPipeline] = useState(null);
  const [fsiMangroveTrends, setFsiMangroveTrends] = useState(null);
  const [cycloneHistory, setCycloneHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LocalStorage state for community submissions & plantation logs
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(COMMUNITY_REPORTS_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'report-demo-1',
          locationId: 'pichavaram',
          locationName: 'Pichavaram Mangroves',
          issueType: 'Plastic Pollution',
          description: 'Accumulation of plastic bottles near main boat jetty channel observed during volunteer field visit.',
          date: '2026-08-10',
          coordinates: '11.4390° N, 79.7870° E',
          status: 'User Community Observation — Not Officially Verified',
          submittedBy: 'Environmental Student Group'
        },
        {
          id: 'report-demo-2',
          locationId: 'punnakayal',
          locationName: 'Punnakayal Mangroves',
          issueType: 'Mangrove Damage Observation',
          description: 'Siltation blocking tidal fishbone channel inlet observed in southern sector.',
          date: '2026-08-12',
          coordinates: '8.6390° N, 78.1220° E',
          status: 'User Community Observation — Not Officially Verified',
          submittedBy: 'Local Coastal Warden'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [plantations, setPlantations] = useState(() => {
    try {
      const saved = localStorage.getItem(PLANTATION_LOGS_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'plant-demo-1',
          species: 'Rhizophora mucronata',
          saplingCount: 150,
          locationId: 'pichavaram',
          locationName: 'Pichavaram Mangroves',
          date: '2026-07-28',
          organization: 'Green Tamil Nadu Youth Club',
          status: 'Community / Volunteer Record'
        },
        {
          id: 'plant-demo-2',
          species: 'Avicennia marina',
          saplingCount: 200,
          locationId: 'muthupet',
          locationName: 'Muthupet Lagoon sector',
          date: '2026-08-04',
          organization: 'Coastal Delta Restoration Forum',
          status: 'Community / Volunteer Record'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [locRes, envRes, srcRes, mlRes, fsiRes, cycRes] = await Promise.all([
          fetch('/data/locations.json'),
          fetch('/data/environmental_data.json'),
          fetch('/data/data_sources.json'),
          fetch('/data/ml_pipeline_schema.json'),
          fetch('/data/verified_fsi_mangrove_trends.json'),
          fetch('/data/verified_cyclone_history.json')
        ]);

        const locs = await locRes.json();
        const envs = await envRes.json();
        const srcs = await srcRes.json();
        const mls = await mlRes.json();
        const fsi = await fsiRes.json();
        const cyc = await cycRes.json();

        setLocations(locs);
        setEnvironmentalData(envs);
        setDataSources(srcs);
        setMlPipeline(mls);
        setFsiMangroveTrends(fsi);
        setCycloneHistory(cyc);
      } catch (err) {
        console.error('Error loading verified datasets:', err);
        setError('Failed to load verified datasets');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const addReport = (newReport) => {
    const entry = {
      id: `report-${Date.now()}`,
      ...newReport,
      status: 'User Community Observation — Not Officially Verified'
    };
    const updated = [entry, ...reports];
    setReports(updated);
    localStorage.setItem(COMMUNITY_REPORTS_KEY, JSON.stringify(updated));
  };

  const addPlantation = (newPlantation) => {
    const entry = {
      id: `plant-${Date.now()}`,
      ...newPlantation,
      status: 'Community / Volunteer Record'
    };
    const updated = [entry, ...plantations];
    setPlantations(updated);
    localStorage.setItem(PLANTATION_LOGS_KEY, JSON.stringify(updated));
  };

  const getLocationData = (locationId) => {
    const loc = locations.find(l => l.id === locationId);
    const records = environmentalData.filter(d => d.locationId === locationId);
    const fsiLocationTrends = fsiMangroveTrends && fsiMangroveTrends.locations ? fsiMangroveTrends.locations[locationId] : [];
    const locationCyclones = cycloneHistory.filter(c => c.affectedSites && c.affectedSites.includes(locationId));
    return { location: loc, records, fsiLocationTrends, locationCyclones };
  };

  return {
    locations,
    environmentalData,
    dataSources,
    mlPipeline,
    fsiMangroveTrends,
    cycloneHistory,
    reports,
    plantations,
    loading,
    error,
    addReport,
    addPlantation,
    getLocationData
  };
}
