import { ReactNode, createContext, useContext, useReducer } from "react";
import { AuthReducerAction } from "../types/enums";
import { getFromLocalStorage } from "../lib/helper";

type AuthState = {
  isLogin: boolean;
  username: string;
};

type AuthAction = {
  type: AuthReducerAction;
  payload: AuthState;
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthReducerAction.SET_USER:
      return {
        isLogin: action.payload.isLogin,
        username: action.payload.username,
      };
    default:
      return state;
  }
}

const token = getFromLocalStorage("token");
const username = getFromLocalStorage("userName");

const authInit = {
  isLogin: token ? true : false,
  username: username ? username : "",
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: authInit,
  dispatch: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, authInit);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
