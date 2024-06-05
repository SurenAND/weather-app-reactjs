import { Box, Stack, SxProps, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { routes } from "../../../constants/routes";
const commonStyles: SxProps = {
  fontSize: 80,
  textShadow: "1px 1px 10px black",
};

export default function NotFoundTemplate() {
  const numbers = ["4", "0", "4"];
  return (
    <Stack
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="h1"
        sx={{
          display: "flex",
          gap: "5px",
        }}
      >
        {numbers.map((num, index) => (
          <Typography
            component={"span"}
            key={index}
            sx={{
              ...commonStyles,
              color: num === "0" ? "red" : "inherit",
            }}
          >
            {num}
          </Typography>
        ))}
      </Box>
      <Typography
        component={"span"}
        sx={{
          fontSize: 40,
          fontWeight: "bold",
          textShadow: "1px 1px 30px black",
        }}
      >
        Page Not Found
      </Typography>
      <Link to={routes.HOME_PAGE}>
        <Box
          sx={{
            bgcolor: "red",
            py: 1,
            px: 2,
            mt: 5,
            color: "white",
            fontWeight: "bold",
            borderRadius: 5,
            boxShadow: "1px 1px 10px red",
            ":hover": {
              bgcolor: red[500],
              boxShadow: "1px 1px 15px red",
            },
          }}
        >
          Back To Home
        </Box>
      </Link>
    </Stack>
  );
}
