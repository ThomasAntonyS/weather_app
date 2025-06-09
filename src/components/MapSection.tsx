// src/components/MapSection.tsx
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
  { id: 'precipitation_new', label: 'Precipitation (Rain-Clouds)' },
  { id: 'pressure_new', label: 'Sea Level Pressure' },
] as const;

function MapSection({ data }: MapSectionProps) {
  const { lat, lon } = data.coord;
  const [layerIndex, setLayerIndex] = useState(0);
  const currentLayer = layers[layerIndex];

  const cycleLayer = () => {
    setLayerIndex((prev) => (prev + 1) % layers.length);
  };

  const iconHtml = `
    <div style="transform: translate(-50%, -100%);">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin" viewBox="0 0 24 24">
        <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 1 1 16 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: '', // Disable default icon class
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  return (
    <div className="space-y-4">
      <div className="block space-y-3 sm:flex justify-between items-center">
        <p className="text-2xl text-white font-semibold "><span className='underline border-white'>Current Layer</span>: {currentLayer.label}</p>
      </div>

      <div className="h-80 w-full rounded-xl overflow-hidden border border-gray-700 shadow-lg">
        <MapContainer center={[lat, lon]} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <TileLayer
            url={`https://tile.openweathermap.org/map/${currentLayer.id}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />

          <Marker position={[lat, lon]} icon={customIcon}>
            <Popup>
              {data.name} - {data.weather[0].main}, {data.main.temp}°C
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <button
        onClick={cycleLayer}
        className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-sm"
      >
        Switch to {layers[(layerIndex + 1) % layers.length].label}
      </button>
    </div>
  );
}

export default MapSection;