export type newUser = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type recentSearch = {
  id: string;
  search: string;
};

export type ForecastData = {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
  dt_txt: string;
};

export type FormattedForecastData = {
  temp: number;
  title: string;
  icon: string;
  date: string;
};

export type WeatherData = {
  hourly: FormattedForecastData[];
  daily: FormattedForecastData[];
  country: string;
  details: string;
  dt: number;
  feels_like: number;
  formattedLocalTime: string;
  humidity: number;
  icon: string;
  lat: number;
  lon: number;
  name: string;
  speed: number;
  sunrise: string;
  sunset: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  timezone: number;
};
