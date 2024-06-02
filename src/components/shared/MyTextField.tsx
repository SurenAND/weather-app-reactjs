import { TextField } from "@mui/material";

export default function MyTextField({
  type,
  label,
  onChange,
  value,
}: {
  type: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <TextField
      margin="dense"
      variant="outlined"
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      sx={{
        width: "70%",
        backgroundColor: "#eee",
        borderRadius: 4,
        "& label.Mui-focused": {
          color: "#512da8",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#512da8",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: 4,
          "& fieldset": {
            borderColor: "#eee",
          },
          "&:hover fieldset": {
            borderColor: "#512da8",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#512da8",
          },
        },
      }}
    />
  );
}
