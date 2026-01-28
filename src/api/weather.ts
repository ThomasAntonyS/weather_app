const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

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

export const getAirQuality = async (lat: number, lon: number) => {
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

export const getCitySuggestions = async (query: string) => {
  try {
    const res = await fetch(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch city suggestions');
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching city suggestions for ${query}:`, error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch weather by coordinates');
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching weather for ${lat}, ${lon}:`, error);
    throw error;
  }
};