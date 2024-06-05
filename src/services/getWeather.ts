import { API_KEY, BASE_URL } from "../constants/url";
import { DateTime } from "luxon";
import { ForecastData } from "../types/types";

// https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=a6dcd4de28a793e8256b2ad775016cec
// https://api.openweathermap.org/data/2.5/forecast?lat=35.6944&lon=51.4215&appid=a6dcd4de28a793e8256b2ad775016cec

const getWeatherData = async (infoType: string, searchParams: any) => {
  const data = await fetch(
    `${BASE_URL}${infoType}${searchParams}&appid=${API_KEY}`
  );
  return data.json();
};

const iconUrlFromCode = (code: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

const formatToLocalTime = (
  secs: number,
  offset: number,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (data: any) => {
  const {
    coord: { lon, lat },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    sys: { country, sunrise, sunset },
    name,
    dt,
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (
  secs: number,
  offset: number,
  data: ForecastData[]
) => {
  // hourly
  const hourly = data
    .filter((f: ForecastData) => f.dt > secs)
    .map((f: ForecastData) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  // daily
  const daily = data
    .filter((f: ForecastData) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f: ForecastData) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams: any) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    `${searchParams.query}&units=${searchParams.units}`
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData(
    "forecast",
    `?lat=${lat}&lon=${lon}&units=${searchParams.units}`
  ).then((data) => formatForecastWeather(dt, timezone, data.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
