import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthProvider";
import { generate_token, setToLocalStorage } from "../../../../lib/helper";
import { AuthReducerAction } from "../../../../types/enums";
import { routes } from "../../../../constants/routes";
import { useEffect, useState } from "react";
import { getUserData } from "../../../../services/getData";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { FaGooglePlusG, FaLinkedinIn } from "react-icons/fa6";
import MyIconBtn from "../../../shared/MyIconBtn";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import MyTextField from "../../../shared/MyTextField";
import { toast } from "sonner";

export default function LogInTemplate({ active }: { active: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    state.isLogin && navigate(routes.HOME_PAGE, { replace: true });
  }, [state.isLogin]);

  const handleLogin = () => {
    if (email && password) {
      getUserData(email, password).then((data) => {
        if (data.length > 0) {
          setToLocalStorage("userName", data[0].username);
          setToLocalStorage("token", generate_token(32));
          dispatch({
            type: AuthReducerAction.SET_USER,
            payload: { ...data[0], isLogin: true },
          });
          navigate(routes.HOME_PAGE, { replace: true });
        } else toast.warning("User Not Found Please Sign Up!");
      });
    } else toast.error("Please enter valid Email and Password!");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        height: "100%",
        transition: "all 0.6s ease-in-out",
        left: 0,
        width: "50%",
        zIndex: 2,
        transform: active ? "translateX(100%)" : "translateX(0)",
      }}
    >
      <Stack
        component="form"
        justifyContent="center"
        alignItems="center"
        sx={{
          py: 5,
          height: "100%",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Login
        </Typography>
        {/* login options */}
        <Stack flexDirection="row" gap={1.5} component="section" sx={{ my: 2 }}>
          <MyIconBtn>
            <FaGooglePlusG size={20} color="black" />
          </MyIconBtn>
          <MyIconBtn>
            <FaFacebookF size={15} color="black" />
          </MyIconBtn>
          <MyIconBtn>
            <FaGithub size={15} color="black" />
          </MyIconBtn>
          <MyIconBtn>
            <FaLinkedinIn size={15} color="black" />
          </MyIconBtn>
        </Stack>
        {/* inputs */}
        <Typography variant="body2" sx={{ fontSize: "12px" }}>
          or use your email password
        </Typography>
        <MyTextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MyTextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link
          href=""
          sx={{
            color: "#333",
            fontSize: "13px",
            textDecoration: "none",
            margin: "15px 0 10px",
            display: "block",
          }}
        >
          Forget Your Password?
        </Link>
        <Button
          onClick={handleLogin}
          variant="contained"
          sx={{
            backgroundColor: "#512da8",
            color: "#fff",
            fontSize: "12px",
            padding: "10px 45px",
            borderRadius: "8px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: "#6c5ce7",
            },
          }}
        >
          LogIn
        </Button>
      </Stack>
    </Box>
  );
}
