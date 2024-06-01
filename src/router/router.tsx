import { Navigate, createBrowserRouter } from "react-router-dom";
import { routes } from "../const/routes";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading/Loading";

const HomePage = lazy(() => import("../pages/Home/Home"));
const RegisterPage = lazy(() => import("../pages/Register/Register"));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"));

export const router = createBrowserRouter([
  {
    path: routes.HOME_PAGE,
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: routes.REGISTER_PAGE,
    element: (
      <Suspense fallback={<Loading />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: routes.ERROR_PAGE,
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  { path: "*", element: <Navigate to={routes.ERROR_PAGE} replace /> },
]);
