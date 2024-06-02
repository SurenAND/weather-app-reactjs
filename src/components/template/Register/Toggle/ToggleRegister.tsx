import { Box } from "@mui/material";
import ToSignUp from "./ToSignUp/ToSignUp";
import ToLogIn from "./ToLogIn/ToLogIn";

export default function ToggleRegister({
  setActive,
  active,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "50%",
        height: "100%",
        overflow: "hidden",
        transition: "all 0.6s ease-in-out",
        borderRadius: active ? "0 150px 100px 0" : "150px 0 0 100px",
        zIndex: 1000,
        transform: active ? "translateX(-100%)" : "translateX(0)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#512da8",
          height: "100%",
          background: "linear-gradient(to right, #5c6bc0, #512da8)",
          color: "#fff",
          position: "relative",
          transition: "all 0.6s ease-in-out",
        }}
      >
        <ToSignUp setActive={setActive} active={active} />
        <ToLogIn setActive={setActive} active={active} />
      </Box>
    </Box>
  );
}
