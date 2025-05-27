import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    console.log(res.data);
    
    return res.data;
  } catch (error) {
    console.error(`Error fetching current weather for ${city}:`, error);
    throw error;
  }
};

export const getForecastByCity = async (city: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching forecast for ${city}:`, error);
    throw error;
  }
};