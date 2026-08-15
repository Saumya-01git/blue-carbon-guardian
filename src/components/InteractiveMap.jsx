import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Waves, ArrowRight, ShieldCheck, TreePine, Anchor } from 'lucide-react';

// Custom SVG map marker icon creation
function createCustomMarkerIcon(category) {
  let color = '#10b981'; // Emerald default for mangroves
  if (category === 'Wetlands') color = '#06b6d4'; // Cyan
  if (category === 'Seagrass/Marine') color = '#3b82f6'; // Blue
  if (category === 'Urban Coastal') color = '#f59e0b'; // Amber
  if (category === 'Other Coastal') color = '#8b5cf6'; // Purple

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
}

export function InteractiveMap({ locations, selectedCategory, onSelectLocation }) {
  const filteredLocations = selectedCategory === 'All'
    ? locations
    : locations.filter(loc => loc.ecosystemCategory === selectedCategory);

  const tnCenter = [10.8, 78.8];

  return (
    <div className="w-full h-[520px] rounded-xl overflow-hidden shadow-2xl border border-slate-700/60 relative">
      <MapContainer
        center={tnCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredLocations.map(loc => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createCustomMarkerIcon(loc.ecosystemCategory)}
          >
            <Popup className="custom-popup">
              <div className="p-1 max-w-xs">
                <div className="flex items-center space-x-1.5 mb-1 text-emerald-400 font-semibold text-sm">
                  <Waves className="w-4 h-4" />
                  <span>{loc.name}</span>
                </div>
                <div className="text-xs text-slate-300 mb-1">
                  <span className="font-medium text-slate-400">District:</span> {loc.district}
                </div>
                <div className="text-xs text-slate-300 mb-2">
                  <span className="font-medium text-slate-400">Ecosystem:</span> {loc.ecosystemType}
                </div>
                <div className="bg-slate-900/80 p-1.5 rounded border border-slate-700/50 text-[11px] text-emerald-300 mb-3 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400 shrink-0" />
                  <span className="truncate">{loc.dataAvailabilityStatus}</span>
                </div>
                <button
                  onClick={() => onSelectLocation(loc.id)}
                  className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span>Explore Location</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
