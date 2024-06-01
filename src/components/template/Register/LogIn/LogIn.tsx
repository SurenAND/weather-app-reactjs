import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthProvider";
import { generate_token, setToLocalStorage } from "../../../../lib/helper";
import { AuthReducerAction } from "../../../../types/enums";
import { routes } from "../../../../constants/routes";
import { useEffect } from "react";

export default function LogInTemplate() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    state.isLogin && navigate(routes.HOME_PAGE, { replace: true });
  }, [state.isLogin]);

  const handleLogin = () => {
    setToLocalStorage("userName", "Ashkan");
    setToLocalStorage("token", generate_token(32));
    dispatch({
      type: AuthReducerAction.SET_USER,
      payload: { isLogin: true, username: "Ashkan" },
    });
    navigate(routes.HOME_PAGE, { replace: true });
  };

  return (
    <>
      <div>LogInTemplate</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={handleLogin}
      >
        Login
      </button>
    </>
  );
}
