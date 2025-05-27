import type { FC } from 'react';
import { type WeatherData } from '../types/weather';
import { Droplet, Thermometer, Wind } from 'lucide-react'; 

const CurrentWeather: FC<{ data: WeatherData }> = ({ data }) => {
  const date = new Date(data.dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl w-full text-white shadow-2xl flex flex-col items-center">
      <div className="text-sm text-gray-300 mb-2">{date}</div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-300 text-center mb-1">
        {data.name}
      </h2>

      <div className="flex items-center justify-center my-4">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32 object-contain"
        />
        <div className="text-6xl md:text-7xl font-bold text-white ml-4">
          {Math.round(data.main.temp)}°C
        </div>
      </div>

      <div className="text-xl md:text-2xl capitalize text-gray-200 mb-4 text-center">
        {data.weather[0].description}
      </div>

      <div className="flex items-center text-md text-gray-300 space-x-2 mb-6">
        <Thermometer size={18} className="text-red-400" />
        <span>Feels like: {Math.round(data.main.feels_like)}°C</span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="flex items-center justify-center bg-gray-700/50 rounded-lg p-3">
          <Droplet size={20} className="text-blue-400 mr-2" />
          <span className="text-sm">Humidity: {data.main.humidity}%</span>
        </div>
        <div className="flex items-center justify-center bg-gray-700/50 rounded-lg p-3">
          <Wind size={20} className="text-green-400 mr-2" />
          <span className="text-sm">Wind: {data.wind.speed.toFixed(1)} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;