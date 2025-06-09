
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string) => {
  try {
    const res = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching current weather for ${city}:`, error);
    throw error;
  }
};

export const getForecastByCity = async (city: string) => {
  try {
    const res = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch forecast data');
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching forecast for ${city}:`, error);
    throw error;
  }
};

// Fetch air quality data based on city coordinates
export const getAirQualityByCity = async (lat: number, lon: number) => {
  try {
    const res = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch air quality data');
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching air quality for coordinates ${lat}, ${lon}:`, error);
    throw error;
  }
};
