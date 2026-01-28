import { useState, type FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{ main: string; description: string; icon: string }>;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  visibility: number;
  pop: number;
}

interface Props {
  data: ForecastItem[];
}

const Forecast: FC<Props> = ({ data }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const daily = data.filter((item, idx, arr) => {
    const currentDay = new Date(item.dt * 1000).getDate();
    if (idx === 0) return true;
    return currentDay !== new Date(arr[idx - 1].dt * 1000).getDate();
  }).slice(0, 5);

  const filteredData = data.filter(
    (item) => new Date(item.dt * 1000).toLocaleDateString() === selectedDay
  );

  const summary = filteredData[0];

  const getChartData = () => ({
    labels: filteredData.map((item) =>
      new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [
      {
        fill: true,
        label: 'Temp',
        data: filteredData.map((item) => Math.round(item.main.temp)),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#60a5fa',
        pointRadius: 4,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
    },
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white">
      <h3 className="text-2xl font-bold mb-8">5-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-4">
        {daily.map((item: ForecastItem) => (
          <div
            key={item.dt}
            onClick={() => setSelectedDay(new Date(item.dt * 1000).toLocaleDateString())}
            className="bg-gray-800 w-full p-5 rounded-xl flex flex-col items-center justify-between
                       border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
          >
            <div className="text-md text-gray-300 font-semibold mb-2">
              {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
            </div>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-20 h-20 object-contain"
            />
            <div className="font-bold text-2xl mt-2 text-blue-300">{Math.round(item.main.temp)}°C</div>
            <div className="text-sm text-gray-300 mt-1">
              Feels like: {Math.round(item.main.feels_like)}°C
            </div>
            <div className="text-sm text-gray-200 capitalize mt-2 text-center">
              {item.weather[0].description}
            </div>
          </div>
        ))}
      </div>

      {selectedDay && summary && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 md:p-8 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-800 no-scrollbar">
            <div className="flex justify-between items-start mb-6 bg-gray-900 z-10 pb-4">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold">{selectedDay}</h4>
                <p className="text-blue-400 capitalize">{summary.weather[0].description}</p>
              </div>
              <button 
                onClick={() => setSelectedDay(null)} 
                className="p-2 text-gray-400 hover:text-white text-2xl transition-colors cursor-pointer"
              >✕</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Feels Like', val: `${Math.round(summary.main.feels_like)}°C` },
                { label: 'Wind Speed', val: `${summary.wind.speed} m/s` },
                { label: 'Humidity', val: `${summary.main.humidity}%` },
                { label: 'Pressure', val: `${summary.main.pressure} hPa` }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50 flex flex-col items-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="h-64 md:h-80 w-full mb-8 bg-gray-800/20 p-4 rounded-2xl border border-gray-700/30">
              <Line data={getChartData()} options={options} />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {filteredData.map((hour) => (
                <div key={hour.dt} className="min-w-[150px] max-w-[170px] line-clamp-1 flex-shrink-0 flex flex-col items-center bg-gray-800/40 border border-gray-700/30 p-4 rounded-xl">
                  <span className="text-xs text-gray-400 font-bold mb-2">
                    {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="icon" className="w-10 h-10" />
                  <span className="text-lg font-bold text-blue-300">{Math.round(hour.main.temp)}°</span>
                  <span className="text-[10px] text-gray-400 font-medium">Humidity - {hour.main.humidity}% </span>
                  <span className='text-[12px] text-gray-400 font-medium mt-2 capitalize'>{hour.weather[0].description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Forecast;