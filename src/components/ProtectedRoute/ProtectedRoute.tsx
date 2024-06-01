import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { state } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (state.isLogin === false) {
      navigate(routes.REGISTER_PAGE, { replace: true });
    }
  }, [navigate, state.isLogin]);
  return children;
}
