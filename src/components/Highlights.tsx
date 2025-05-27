import type { FC } from 'react';
import type { WeatherData } from '../types/weather';
import { Sunrise, Sunset } from 'lucide-react'; 

const Highlights: FC<{ data: WeatherData }> = ({ data }) => {
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const uvIndex = data.sys.country ?? "N/A";

  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-gray-800 rounded-xl p-5 flex flex-col justify-between items-start border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Wind Status</p>
          <p className="text-4xl font-extrabold mt-2 text-blue-400">{data.wind.speed.toFixed(1)} <span className="text-xl font-normal text-gray-300">km/h</span></p>
          <p className="text-xs text-gray-400 mt-3">Current speed</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 flex flex-col justify-between items-start border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Humidity</p>
          <p className="text-4xl font-extrabold mt-2 text-green-400">{data.main.humidity}<span className="text-xl font-normal text-gray-300">%</span></p>
          <p className="text-xs text-gray-400 mt-3">
            {data.main.humidity < 40 ? "A bit dry" : data.main.humidity > 70 ? "Quite humid" : "Comfortable"}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 flex flex-col items-center justify-between text-center border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Sunrise</p>
          <Sunrise className="w-20 h-10 my-3 text-yellow-400" /> 
          <p className="text-2xl font-bold text-gray-100">{sunrise}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 flex flex-col items-center justify-between text-center border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Sunset</p>
          <Sunset className="w-20 h-10 my-3 text-orange-500" /> 
          <p className="text-2xl font-bold text-gray-100">{sunset}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 flex flex-col justify-between items-start border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Visibility</p>
          <p className="text-4xl font-extrabold mt-2 text-teal-400">{(data.visibility / 1000).toFixed(0)} <span className="text-xl font-normal text-gray-300">km</span></p>
          <p className="text-xs text-gray-400 mt-3">Clear visibility</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 flex flex-col justify-between items-start border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Country</p>
          <p className="text-4xl font-extrabold mt-2 text-purple-400">{uvIndex}</p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;