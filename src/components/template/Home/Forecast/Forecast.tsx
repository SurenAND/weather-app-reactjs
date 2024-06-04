import { Box, Stack, Typography } from "@mui/material";
import { FormattedForecastData } from "../../../../types/types";

export default function Forecast({
  title,
  data,
}: {
  title: string;
  data: FormattedForecastData[];
}) {
  return (
    <Box>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="start"
        mt={5}
        borderBottom="1px solid white"
        pb={1}
        mb={1}
      >
        <Typography
          sx={{
            fontWeight: "600",
            textTransform: "uppercase",
            color: "white",
          }}
        >
          {title}
        </Typography>
      </Stack>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {data.map((item, index) => {
          return (
            <Stack key={index} alignItems="center" justifyContent="center">
              <Typography
                variant="body2"
                fontWeight="300"
                fontSize="0.875rem"
                sx={{ color: "white" }}
              >
                {item.title}
              </Typography>
              <img
                src={item.icon}
                alt="weather icon"
                className="w-12 my-1 bg-gray-400 rounded-full"
              />
              <Typography fontWeight="500" sx={{ color: "white" }}>
                {item.temp.toFixed(0)}°
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
