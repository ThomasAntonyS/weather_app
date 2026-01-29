import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { type WeatherData } from '../types/weather';
import 'leaflet/dist/leaflet.css';

interface MapSectionProps {
  data: WeatherData;
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const layers = [
  { id: 'temp_new', label: 'Temperature' },
  { id: 'clouds_new', label: 'Clouds' },
  { id: 'precipitation_new', label: 'Precipitation' },
] as const;

function MapSection({ data }: MapSectionProps) {
  const { lat, lon } = data.coord;
  const [layerIndex, setLayerIndex] = useState(0);
  const currentLayer = layers[layerIndex];

  const getTempStatus = (temp: number) => {
    if (temp <= 0) return { label: 'Freezing', color: 'text-purple-300', bg: 'bg-purple-900/50' };
    if (temp <= 15) return { label: 'Cold', color: 'text-cyan-300', bg: 'bg-cyan-900/50' };
    if (temp <= 25) return { label: 'Mild', color: 'text-green-300', bg: 'bg-green-900/50' };
    if (temp <= 35) return { label: 'Warm', color: 'text-orange-300', bg: 'bg-orange-900/50' };
    return { label: 'Very Hot', color: 'text-red-400', bg: 'bg-red-900/50' };
  };

  const status = getTempStatus(data.main.temp);

  const iconHtml = `
    <div style="transform: translate(-50%, -100%); filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24">
        <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 1 1 16 0z" fill="rgba(255, 255, 255, 0.15)"/>
        <circle cx="12" cy="10" r="3" fill="#ffff" stroke="white" stroke-width="1"/>
      </svg>
    </div>
  `;

  const customIcon = L.divIcon({ html: iconHtml, className: '', iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -34] });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <p className="text-xl text-white font-bold">Weather Overlay: <span className="text-blue-400">{currentLayer.label}</span></p>
          <div className="flex items-center gap-2 mt-1">
             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${status.bg} ${status.color} border border-white/10`}>
                {status.label} ({Math.round(data.main.temp)}°C)
             </span>
          </div>
        </div>
        <button onClick={() => setLayerIndex((prev) => (prev + 1) % layers.length)} className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs font-bold transition-all active:scale-95 shadow-lg">
          Switch to {layers[(layerIndex + 1) % layers.length].label}
        </button>
      </div>

      <div className="h-96 w-full rounded-2xl overflow-hidden border border-gray-800 relative z-0 shadow-2xl">
        <div className="absolute bottom-6 left-6 z-[1000] bg-gray-900/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl min-w-[200px]">
          <p className="text-[11px] font-bold mb-3 text-white uppercase tracking-wider opacity-80">{currentLayer.label} Intensity</p>
          <div className="flex flex-col gap-2">
            <div className={`h-2.5 w-full rounded-full shadow-inner ${
              currentLayer.id === 'temp_new' 
                ? 'bg-gradient-to-r from-[#2d0d32] from-10% via-[#3befff] via-50% to-[#542f0f] to-90%' 
                    : currentLayer.id === 'precipitation_new' 
                    ? 'bg-gradient-to-r from-transparent to-[#232353]' 
                    : 'bg-gradient-to-r from-gray-800 via-gray-400 via-50% to-white'
            }`} />
            <div className="flex justify-between items-center px-0.5 text-[10px] font-medium text-gray-500 uppercase">
              <span>Low</span><span>High</span>
            </div>
          </div>
        </div>
        <MapContainer center={[lat, lon]} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <TileLayer key={currentLayer.id} url={`https://tile.openweathermap.org/map/${currentLayer.id}/{z}/{x}/{y}.png?appid=${API_KEY}`} attribution='&copy; OpenWeatherMap' />
          <Marker position={[lat, lon]} icon={customIcon}>
            <Popup><div className="p-1 min-w-[100px] text-gray-900"><h4 className="font-bold text-sm border-b pb-1 mb-1">{data.name}</h4><div className="flex justify-between items-center"><span className="text-xs">Temp</span><span className="font-bold text-blue-600">{data.main.temp}°C</span></div></div></Popup>
          </Marker>
        </MapContainer>
      </div>
      <style>{`.leaflet-container, .leaflet-pane { z-index: 0 !important; } .leaflet-top, .leaflet-bottom { z-index: 1 !important; } .leaflet-popup-content-wrapper { border-radius: 12px; }`}</style>
    </div>
  );
}

export default MapSection;