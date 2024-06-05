import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";
import { ReactNode } from "react";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

type Props = {
  children: ReactNode;
};
function ThemeContextProvider(props: Props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
export default ThemeContextProvider;
