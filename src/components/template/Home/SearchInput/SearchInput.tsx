import {
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";
import { getCity } from "../../../../lib/gecoder";

export default function SearchInput({
  setQuery,
  setUnits,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setUnits: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city !== "") {
      setQuery(`?q=${city}`);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        // getCity(latitude, longitude);
        // const city = getCity(latitude, longitude);
        // setQuery(`?q=${city}`);
      });
    }
  };

  return (
    <Stack flexDirection="row" justifyContent="center" my={3}>
      <Stack
        flexDirection="row"
        width="75%"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <InputBase
          placeholder="Search by city..."
          sx={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            px: 2,
            py: "11px",
          }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <IconButton
          sx={{
            transitionTimingFunction: "ease-in",
            ":hover": {
              transform: "scale(1.1)",
              bgcolor: "rgba(250, 250, 250, 0.2)",
            },
          }}
          onClick={handleSearch}
        >
          <BiSearch color="white" size={30} />
        </IconButton>
        <IconButton
          sx={{
            transitionTimingFunction: "ease-in",
            ":hover": {
              transform: "scale(1.1)",
              bgcolor: "rgba(250, 250, 250, 0.2)",
            },
          }}
          onClick={handleLocationClick}
        >
          <BiCurrentLocation color="white" size={30} />
        </IconButton>
      </Stack>
      <Stack
        flexDirection="row"
        width="25%"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Button
          sx={{
            justifyContent: "end",
            fontSize: 24,
            fontWeight: 600,
            color: "white",
            transitionTimingFunction: "ease-in",
            ":hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={() => setUnits("metric")}
        >
          °C
        </Button>
        <Typography component="p" variant="h4" sx={{ color: "white" }}>
          |
        </Typography>
        <Button
          sx={{
            justifyContent: "start",
            fontSize: 24,
            fontWeight: 600,
            color: "white",
            transitionTimingFunction: "ease-in",
            ":hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={() => setUnits("imperial")}
        >
          °F
        </Button>
      </Stack>
    </Stack>
  );
}
