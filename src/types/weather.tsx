// src/types/weather.ts

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
    sea_level?: number; 
    grnd_level?: number;
  };
  visibility: number; // in meters
  wind: {
    speed: any;
    deg: number;
    gust?: number; 
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string; 
    sunrise: number; 
    sunset: number; 
  };
  timezone: number;
  id: number; 
  name: string; 
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
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

// Interface for Air Quality Data (from /air_pollution API endpoint)
export interface AirQualityData {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number; 
    };
    components: {
      co: number;
      no: number; 
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number; 
      pm10: number; 
      nh3: number; 
    };
    dt: number; 
  }>;
}
