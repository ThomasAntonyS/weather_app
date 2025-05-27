// types/weather.ts
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Optional
    grnd_level?: number; // Optional
  };
  visibility: number; // in meters
  wind: {
    speed: number; // in m/s, convert to km/h in component
    deg: number;
    gust?: number; // Optional
  };
  clouds: {
    all: number;
  };
  dt: number; // Unix timestamp
  sys: {
    type: number;
    id: number;
    country: string; // Country code (e.g., "US", "GB")
    sunrise: number; // Unix timestamp
    sunset: number; // Unix timestamp
  };
  timezone: number;
  id: number; // City ID
  name: string; // City name
  cod: number;
  // UV index is often a separate API call or not in the default 'weather' endpoint.
  // If you get it from another source, you'd add it here.
  // uvi?: number;
}

// OpenWeatherMap forecast response structure often has a 'list' of objects
// that are similar to WeatherData, plus a 'city' object.
export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[]; // Array of forecast data points
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}