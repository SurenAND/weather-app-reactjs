import { Box, Stack, Typography } from "@mui/material";
import { WeatherData } from "../../../../types/types";

export default function TimeAndLocation({
  formattedLocalTime,
  name,
  country,
}: WeatherData) {
  return (
    <Box component="div">
      <Stack alignItems="center" justifyContent="center" my={3}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.2rem",
            fontWeight: "200",
            color: "white",
          }}
        >
          {formattedLocalTime}
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="center" my={2}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.875rem",
            fontWeight: "500",
            color: "white",
          }}
        >
          {name}, {country}
        </Typography>
      </Stack>
    </Box>
  );
}
