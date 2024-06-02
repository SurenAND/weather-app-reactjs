import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { routes } from "../../../constants/routes";
import { Paper, Stack } from "@mui/material";
import ToggleRegister from "./Toggle/ToggleRegister";
import { Toaster } from "sonner";
const SignUpTemplate = lazy(() => import("./SignUp/SignUp"));
const LogInTemplate = lazy(() => import("./LogIn/LogIn"));

export default function RegisterTemplate() {
  const [active, setActive] = useState(false);

  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("signup");

  useEffect(() => {
    if (searchParams.get("signup") === "true") {
      setActive(true);
    }
  }, [searchParams.get("signup")]);

  if (
    searchParams.size !== 0 &&
    !searchParams.has("signup") &&
    !searchParams.has("login")
  ) {
    return <Navigate to={routes.ERROR_PAGE} replace />;
  }

  return (
    <Stack
      component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#c9d6ff",
        background: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
        height: "100vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
          width: "768px",
          maxWidth: "100%",
          minHeight: "480px",
        }}
      >
        {isSignUp === "true" ? (
          <Suspense fallback={<Loading />}>
            <SignUpTemplate active={active} />
          </Suspense>
        ) : (
          <Suspense fallback={<Loading />}>
            <LogInTemplate active={active} />
          </Suspense>
        )}
        <ToggleRegister setActive={setActive} active={active} />
      </Paper>
      <Toaster richColors />
    </Stack>
  );
}
