import { Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function ToLogIn({
  setActive,
  active,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setActive(false);
    setSearchParams({ login: "true" });
  };

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      gap={5}
      sx={{
        position: "absolute",
        height: "100%",
        px: 3,
        textAlign: "center",
        top: 0,
        right: 0,
        transform: active ? "translateX(0)" : "translateX(-200%)",
        transition: "all 0.6s ease-in-out",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Welcome Back!
      </Typography>
      <Typography variant="body1">
        Enter your personal details to use all of site features
      </Typography>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          color: "#fff",
          borderColor: "#fff",
          fontSize: "12px",
          padding: "10px 45px",
          borderRadius: "8px",
          fontWeight: 600,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginTop: "10px",
          "&:hover": {
            backgroundColor: "#a29bfe",
            borderColor: "#a29bfe",
          },
        }}
      >
        LogIn
      </Button>
    </Stack>
  );
}
