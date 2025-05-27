import type { FC } from 'react';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface Props {
  data: ForecastItem[];
}

const Forecast: FC<Props> = ({ data }) => {
  const daily = data.filter((item: ForecastItem, idx: number, arr: ForecastItem[]) => {
    const currentDay = new Date(item.dt * 1000).getDate();
    if (idx === 0) return true;

    const prevDay = new Date(arr[idx - 1].dt * 1000).getDate();
    return currentDay !== prevDay;
  }).slice(0, 5);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-8">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-4">
        {daily.map((item: ForecastItem) => (
          <div
            key={item.dt}
            className="bg-gray-800 w-full p-5 rounded-xl flex flex-col items-center justify-between
                       border border-gray-700 hover:border-blue-500 transition-all duration-300"
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
            <div className="text-sm text-gray-400 mt-1">
              Feels like: {Math.round(item.main.feels_like)}°C
            </div>
            <div className="text-sm text-gray-500 capitalize mt-2">
              {item.weather[0].description}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Forecast;