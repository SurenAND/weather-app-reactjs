import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthProvider";
import { routes } from "../../../../constants/routes";
import { generate_token, setToLocalStorage } from "../../../../lib/helper";
import { AuthReducerAction } from "../../../../types/enums";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FaGooglePlusG, FaLinkedinIn } from "react-icons/fa6";
import MyIconBtn from "../../../shared/MyIconBtn";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import MyTextField from "../../../shared/MyTextField";
import { postUserData } from "../../../../services/postData";
import { toast } from "sonner";
import { newUser } from "../../../../types/types";

export default function SignUpTemplate({ active }: { active: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    state.isLogin && navigate(routes.HOME_PAGE, { replace: true });
  }, [state.isLogin]);

  const handleSignUp = () => {
    if (name && email && password) {
      const newUser: newUser = {
        id: generate_token(32),
        username: name,
        email: email,
        password: password,
      };
      postUserData(newUser).then((data) => {
        setToLocalStorage("userName", data.username);
        setToLocalStorage("token", data.id);
        dispatch({
          type: AuthReducerAction.SET_USER,
          payload: { ...data, isLogin: true },
        });
        navigate(routes.HOME_PAGE, { replace: true });
      });
    } else toast.error("Please enter valid Name,Email and Password!");
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
        zIndex: 5,
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
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Create Account
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
          or use your email for registration
        </Typography>
        <MyTextField
          type="text"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <MyTextField
          type="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <MyTextField
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          onClick={handleSignUp}
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
          SignUp
        </Button>
      </Stack>
    </Box>
  );
}
