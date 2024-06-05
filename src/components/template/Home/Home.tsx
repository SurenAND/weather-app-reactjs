import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { Toaster, toast } from "sonner";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import RecentSearch from "./RecentSearch/RecentSearch";
import SearchInput from "./SearchInput/SearchInput";
import { BiLogIn } from "react-icons/bi";
import TimeAndLocation from "./TimeAndLocation/TimeAndLocation";
import TempAndDetails from "./TempAndDetails/TempAndDetails";
import Forecast from "./Forecast/Forecast";
import getFormattedWeatherData from "../../../services/getWeather";
import { WeatherData, recentSearch } from "../../../types/types";
import { AuthReducerAction } from "../../../types/enums";
import {
  capitalizeFirstLetter,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../../lib/helper";

export default function HomeTemplate() {
  const { state, dispatch } = useAuth();

  const handleLogOut = () => {
    removeFromLocalStorage("userName");
    removeFromLocalStorage("token");
    dispatch({
      type: AuthReducerAction.LOG_OUT,
      payload: { isLogin: false, username: "" },
    });
  };

  // weather states
  const [query, setQuery] = useState("?q=tehran");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recentSearches, setRecentSearches] = useState<recentSearch[]>([]);

  // getting data
  const getWeather = async () => {
    toast.promise(getFormattedWeatherData({ query, units }), {
      position: "top-right",
      loading: `Fetching weather for ${capitalizeFirstLetter(
        query.split("=")[1]
      )}`,
      success: (data) => {
        setWeather(data);
        return `Fetched weather for ${data.name}, ${data.country}`;
      },
      error: "City not found!",
    });
  };

  // useEffects
  useEffect(() => {
    toast.success(`Welcome ${state.username}`, { position: "top-left" });
  }, [state.username]);

  useEffect(() => {
    getWeather();
  }, [query, units]);

  useEffect(() => {
    const rsFromLocalStorage = getFromLocalStorage("recentSearches");
    if (rsFromLocalStorage) {
      setRecentSearches(JSON.parse(rsFromLocalStorage));
    }
  }, []);

  return (
    <Box my={4}>
      <Stack flexDirection="row" justifyContent="center" gap={2}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          color="black"
        >
          Hello, {state.username}
        </Typography>
        <IconButton onClick={handleLogOut}>
          <BiLogIn />
        </IconButton>
      </Stack>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "1024px",
          mt: 4,
          py: 5,
          px: 16,
          borderRadius: "15px",
          background: "linear-gradient(to bottom right, #5c6bc0, #512da8)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <RecentSearch recentSearches={recentSearches} setQuery={setQuery} />
        <SearchInput
          setRecentSearches={setRecentSearches}
          setQuery={setQuery}
          setUnits={setUnits}
        />

        {weather && (
          <>
            <TimeAndLocation {...weather} />
            <TempAndDetails weather={weather} units={units} />
            <Forecast title="3 hour step forecast" data={weather.hourly} />
            <Forecast title="daily forecast" data={weather.daily} />
          </>
        )}
      </Box>

      <Toaster richColors position="top-right" />
    </Box>
  );
}
