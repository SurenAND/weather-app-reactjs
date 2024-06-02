import { IconButton } from "@mui/material";

export default function MyIconBtn({ children }: { children: React.ReactNode }) {
  return (
    <IconButton
      sx={{
        border: "1px solid #ccc",
        borderRadius: "20%",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: "45px",
        height: "45px",
      }}
    >
      {children}
    </IconButton>
  );
}
