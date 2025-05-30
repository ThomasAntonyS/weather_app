import { type FC } from 'react';
import { type WeatherData } from '../types/weather';
import { type AirQualityData } from '../types/weather';
import { Sunrise, Sunset } from 'lucide-react';
import { Smile, Meh, Frown, CloudDrizzle, Skull } from 'lucide-react';

const getAQIColor = (aqi: number) => {
  if (aqi <= 1) return  'bg-green-500 text-green-300';
  if (aqi === 2) return 'bg-yellow-400 text-yellow-200';
  if (aqi === 3) return 'bg-orange-500 text-orange-200';
  if (aqi === 4) return 'bg-red-600 text-red-300';
  return 'bg-purple-700 text-purple-300';
};

const getAQIIcon = (aqi: number) => {
  switch (aqi) {
    case 1: return <Smile size={36} />;
    case 2: return <Meh size={36} />;
    case 3: return <Frown size={36} />;
    case 4: return <CloudDrizzle size={36} />;
    case 5: return <Skull size={36} />;
    default: return <Meh size={36} />;
  }
};

interface HighlightsProps {
  data: WeatherData;
  airQuality: AirQualityData | null;
}

const Highlights: FC<HighlightsProps> = ({ data, airQuality }) => {

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

  const aqi = airQuality?.list[0]?.main.aqi ?? 1; 
  const aqiDescription =
    aqi === 1
      ? 'Good'
      : aqi === 2
      ? 'Fair'
      : aqi === 3
      ? 'Moderate'
      : aqi === 4
      ? 'Poor'
      : 'Very Poor';

  const colorClass = getAQIColor(aqi);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Wind Status */}
        <div className="bg-gray-800 rounded-xl p-5 flex flex-col justify-between items-start border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Wind Status</p>
          <p className="text-4xl font-extrabold mt-2 text-blue-400">
            {data.wind.speed.toFixed(1)} <span className="text-xl font-normal text-gray-300">km/h</span>
          </p>
          <p className="text-xs text-gray-400 mt-3">Current speed</p>
        </div>

        {/* Humidity */}
        <div className="bg-gray-800 rounded-xl p-5 flex flex-col justify-between items-start border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Humidity</p>
          <p className="text-4xl font-extrabold mt-2 text-green-400">
            {data.main.humidity}<span className="text-xl font-normal text-gray-300">%</span>
          </p>
          <p className="text-xs text-gray-400 mt-3">
            {data.main.humidity < 40 ? "A bit dry" : data.main.humidity > 70 ? "Quite humid" : "Comfortable"}
          </p>
        </div>

        {/* Sunrise */}
        <div className="bg-gray-800 rounded-xl p-5 flex flex-col items-center justify-between text-center border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Sunrise</p>
          <Sunrise className="w-20 h-10 my-3 text-yellow-400" />
          <p className="text-2xl font-bold text-gray-100">{sunrise}</p>
        </div>

        {/* Sunset */}
        <div className="bg-gray-800 rounded-xl p-5 flex flex-col items-center justify-between text-center border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Sunset</p>
          <Sunset className="w-20 h-10 my-3 text-orange-500" />
          <p className="text-2xl font-bold text-gray-100">{sunset}</p>
        </div>

        {/* Visibility */}
        <div className="bg-gray-800 rounded-xl p-5 flex flex-col justify-between items-start border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <p className="text-sm text-gray-300">Visibility</p>
          <p className="text-4xl font-extrabold mt-2 text-teal-400">
            {(data.visibility / 1000).toFixed(0)} <span className="text-xl font-normal text-gray-300">km</span>
          </p>
          <p className="text-xs text-gray-400 mt-3">Clear visibility</p>
        </div>

        {/* Air Quality Index */}
        <div className={` bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white mb-1">Air Quality Index (AQI)</p>
              <p className="text-4xl font-extrabold">
                {aqi} <span className="text-lg text-white">/ 5</span>
              </p>
              <p className="text-xs text-white mt-2">Description: {aqiDescription}</p>
            </div>
            <div>{getAQIIcon(aqi)}</div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
              <div
                className={`${colorClass.split(' ')[0]} h-full transition-all duration-500`}
                style={{ width: `${(aqi / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
