import { Navigate, createBrowserRouter } from "react-router-dom";
import { routes } from "../constants/routes";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading/Loading";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const HomePage = lazy(() => import("../pages/Home/Home"));
const RegisterPage = lazy(() => import("../pages/Register/Register"));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"));

export const router = createBrowserRouter([
  {
    path: routes.HOME_PAGE,
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      </ProtectedRoute>
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
