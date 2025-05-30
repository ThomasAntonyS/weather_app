// src/components/MapSection.tsx
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
] as const;

function MapSection({ data }: MapSectionProps) {
  const { lat, lon } = data.coord;
  const [layerIndex, setLayerIndex] = useState(0);
  const currentLayer = layers[layerIndex];

  const cycleLayer = () => {
    setLayerIndex((prev) => (prev + 1) % layers.length);
  };

  return (
    <div className="space-y-4">
      <div className="block space-y-3 sm:flex justify-between items-center">
        <p className="text-2xl text-gray-400">Current Layer: {currentLayer.label}</p>
      </div>

      <div className="h-80 w-full rounded-xl overflow-hidden border border-gray-700 shadow-lg">
        <MapContainer center={[lat, lon]} zoom={10} style={{ height: '100%', width: '100%' }}>
          {/* Dark base map */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Weather overlay */}
          <TileLayer
            url={`https://tile.openweathermap.org/map/${currentLayer.id}/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />

          <Marker position={[lat, lon]}>
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
