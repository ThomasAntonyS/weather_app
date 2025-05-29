
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string) => {
  try {
    const res = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const response = await res.json()
    return response;
  } catch (error) {
    console.error(`Error fetching current weather for ${city}:`, error);
    throw error;
  }
};

export const getForecastByCity = async (city: string) => {
  try {
    const res = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    const response = await res.json()
    return response;
  } catch (error) {
    console.error(`Error fetching forecast for ${city}:`, error);
    throw error;
  }
};