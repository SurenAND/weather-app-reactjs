import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import AuthProvider from "./contexts/AuthProvider";
import { CssBaseline } from "@mui/material";
import ThemeContextProvider from "./contexts/ThemeProvider";

function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <CssBaseline />
      </AuthProvider>
    </ThemeContextProvider>
  );
}

export default App;
