import { useEffect, useState } from 'react';
import { getWeatherByCity, getForecastByCity } from './api/weather';
import { type WeatherData } from './types/weather';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import OtherCountries from './components/OtherCountries';
import Highlights from './components/Highlights';
import Forecast from './components/Forecast';
import { Hatch } from 'ldrs/react';
import 'ldrs/react/Hatch.css';
import Footer from './components/Footer';

function App() {
  const [city, setCity] = useState('Bengaluru');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const otherCitiesList = [
    { name: 'London' },
    { name: 'New York' },
    { name: 'Sydney' },
    { name: 'Tokyo' },
    { name: 'Paris' },
    { name: 'Dubai' },
  ];

  const fetchMainWeatherData = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCity(cityName);
      const forecastData = await getForecastByCity(cityName);
      setWeather(weatherData);
      setForecast(forecastData.list);
    } catch (err: any) {
      console.error(`Error fetching data for ${cityName}:`, err);
      setWeather(null);
      setForecast([]);
      setError(err.message || 'Failed to load weather data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMainWeatherData(city);
  }, [city]);

  const handleCitySelect = (selectedCityName: string) => {
    setCity(selectedCityName);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white p-4 md:px-20 font-sans overflow-auto">
      <SearchBar onSearch={setCity} currentCity={city} />

      {isLoading ? (
        <div className="flex-grow flex flex-col items-center justify-center text-xl text-gray-400">
          <Hatch size="28" stroke="4" speed="3.5" color="white" />
          <p className="mt-4">Loading weather data for {city}...</p>
        </div>
      ) : error ? (
        <div className="flex-grow flex items-center justify-center text-xl text-red-400">
          {error.toUpperCase()}
        </div>
      ) : weather ? (
        <>
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-1 space-y-6 flex flex-col">
              <CurrentWeather data={weather} />
              <OtherCountries cities={otherCitiesList} onCitySelect={handleCitySelect} />
            </div>

            <div className="lg:col-span-2 space-y-6 flex flex-col">
              <Highlights data={weather} />
              <Forecast data={forecast} />
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center text-xl text-gray-400">
          Failed to load weather data. Please ensure your network is available.
        </div>
      )}
    </div>
  );
}

export default App;
