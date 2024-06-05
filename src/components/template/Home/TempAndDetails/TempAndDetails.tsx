import { Box, Stack, Typography } from "@mui/material";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { WeatherData } from "../../../../types/types";

export default function TempAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_max,
    temp_min,
    humidity,
    speed,
    sunrise,
    sunset,
    feels_like,
  },
  units,
}: {
  weather: WeatherData;
  units: string;
}) {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed(0)}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed(0)}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed(0)} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];
  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed(0)}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed(0)}°`,
    },
  ];
  return (
    <Box>
      <Stack
        alignItems="center"
        justifyContent="center"
        py={3}
        fontSize="1.25rem"
        color="#67e8f9"
      >
        <Typography fontWeight="600">{details}</Typography>
      </Stack>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        py={2}
      >
        <img src={icon} alt="weather icon" className="w-20" />
        <Typography fontSize="3rem" sx={{ color: "white" }}>
          {temp.toFixed(0)}°
        </Typography>

        <Stack alignItems="start" gap={1}>
          {verticalDetails.map((item) => {
            return (
              <Stack
                key={item.id}
                flexDirection="row"
                fontSize="0.875rem"
                fontWeight="300"
                justifyContent="center"
                alignItems="center"
              >
                <item.Icon size={18} className="mr-1 text-white" />
                <Typography variant="body2" sx={{ color: "white" }}>
                  {item.title}:
                </Typography>
                <Typography
                  fontWeight="500"
                  ml="0.25rem"
                  sx={{ color: "white" }}
                >
                  {item.value}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={5}
        fontSize="0.875rem"
        py={2}
      >
        {horizontalDetails.map((item) => {
          return (
            <Stack key={item.id} flexDirection="row" alignItems="center">
              <item.Icon size={30} className="mr-1 text-white" />
              <Typography variant="body2" sx={{ color: "white" }}>
                {item.title}:
              </Typography>
              <Typography
                textAlign="center"
                fontWeight="500"
                ml="0.25rem"
                sx={{ color: "white" }}
              >
                {item.value}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
