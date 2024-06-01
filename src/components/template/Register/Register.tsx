import { Suspense, lazy } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { routes } from "../../../constants/routes";
const SignUpTemplate = lazy(() => import("./SignUp/SignUp"));
const LogInTemplate = lazy(() => import("./LogIn/LogIn"));

export default function RegisterTemplate() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");

  if (view && view !== "login" && view !== "signup") {
    return <Navigate to={routes.ERROR_PAGE} replace />;
  }

  return (
    <div>
      {view === "signup" ? (
        <Suspense fallback={<Loading />}>
          <SignUpTemplate />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <LogInTemplate />
        </Suspense>
      )}
    </div>
  );
}
