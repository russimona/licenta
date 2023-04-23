import {
  Alert,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { STRINGS } from "@/utils/strings";
import { Colors } from "@/utils/colors";
import GoogleIcon from "@mui/icons-material/Google";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { auth, googleProvider } from "@/core/firebaseApp";
import { signInWithPopup } from "firebase/auth";
import { sendUserData } from "@/services/sendUserData";
import { getLoggedUser } from "@/redux/signUp/slice";
import { logIn } from "@/redux/loginSlice/slice";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";

export const LoginForm = () => {
  const { classes } = useStyles();
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const routes = useRouter();
  const fetchError = useAppSelector((state) => state.logIn.status);

  const checkEmail = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorLogin(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (fetchError === ReduxThunkStatuses.REJECTED) {
      setErrorLogin(true);
    }
    if (fetchError === ReduxThunkStatuses.FULFILLED) {
      router.push(ROUTES.HOME);
      setErrorLogin(false);
    }
  }, [fetchError, router]);

  const checkPassword = () => {
    if (password.length < 8) {
      setErrorLogin(true);
      return false;
    }
    return true;
  };

  const submitLogin = () => {
    if (checkEmail() && checkPassword()) {
      dispatch(logIn({ email, password }));
    }
  };

  const signUpHandler = () => {
    router.push(ROUTES.SIGN_UP);
  };

  const forgotPasswordHandler = () => {
    router.push(ROUTES.FORGOT_PASSWORD);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        sessionStorage.setItem("authToken", result.user.uid);
        const userData = {
          email: user.email || "",
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          uid: user.uid,
        };
        sendUserData(user.uid, {
          firstName: userData.firstName ?? "",
          lastName: userData.lastName ?? "",
          email: userData.email,
          password: "",
        });
        dispatch(getLoggedUser());
        router.push(ROUTES.HOME);
      })
      .catch((error) => {
        throw new Error(error as string);
      });
  };

  return (
    <Box className={classes.box}>
      <Box className={classes.info}>
        <Avatar src="weLogo.png" className={classes.avatar} />
        <Typography className={classes.description}>
          {STRINGS.EFFORTLESSLY_MANAGE_YOUR_TASKS}
        </Typography>
      </Box>
      <Box className={classes.form}>
        <Typography className={classes.title}>{STRINGS.LOGIN}</Typography>
        <Typography>{STRINGS.EMAIL}</Typography>
        <div className={classes.input}>
          <TextField
            error={errorLogin}
            variant="standard"
            placeholder={STRINGS.EMAIL.toLocaleLowerCase()}
            onChange={(event) => {
              setErrorLogin(false);
              setEmail(event.target.value);
            }}
          />
          {errorLogin && <ErrorOutlineIcon className={classes.error} />}
        </div>

        <Typography>{STRINGS.PASSWORD}</Typography>
        <div className={classes.input}>
          <TextField
            error={errorLogin}
            placeholder={STRINGS.PASSWORD.toLocaleLowerCase()}
            variant="standard"
            type="password"
            onChange={(event) => {
              setErrorLogin(false);
              setPassword(event.target.value);
            }}
          />
          {errorLogin && <ErrorOutlineIcon className={classes.error} />}
        </div>
        {errorLogin && <Alert severity="error">{STRINGS.LOGIN_FAILED}</Alert>}
        <Typography
          className={classes.forgotPassword}
          onClick={forgotPasswordHandler}
        >
          {STRINGS.FORGOT_PASSWORD_QUESTION}
        </Typography>
        <Button onClick={submitLogin}>{STRINGS.LOGIN}</Button>
        <div className={classes.orBox}>
          <div className={classes.line} />
          <Typography>{STRINGS.OR}</Typography>
          <div className={classes.line} />
        </div>
        <Button
          className={classes.googleLoginButton}
          onClick={signInWithGoogle}
        >
          <GoogleIcon />
          {STRINGS.LOGIN_GOOGLE}
        </Button>
        <Typography className={classes.dontHaveAccount}>
          {STRINGS.DONT_HAVE_ACCOUNT}{" "}
          <span className={classes.signUP} onClick={signUpHandler}>
            {STRINGS.SIGN_UP}{" "}
          </span>
          {STRINGS.NOW}
        </Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles()((theme) => ({
  box: {
    background: `linear-gradient(300deg, ${theme.palette.common.white} 10%, ${theme.palette.primary.main} 70%, ${theme.palette.common.black} 100%)`,
    height: "fit-content",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  info: {
    height: "100vh",
    width: "50vw",
  },
  form: {
    background: theme.palette.common.white,
    height: "fit-content",
    width: "30vw",
    margin: "auto",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    boxShadow: `2px 2px 10px 0px ${theme.palette.common.black}`,
    padding: "30px",
  },
  title: {
    fontSize: "32px",
    textAlign: "center",
  },
  line: {
    borderTop: `1px solid ${Colors.gray}`,
    width: "40%",
    marginTop: "10px",
  },
  orBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: "10px",
    margin: "0px",
  },
  forgotPassword: {
    cursor: "pointer",
    textDecoration: "underline",
    color: Colors.gray,
  },
  googleLoginButton: {
    display: "flex",
    flexDirection: "row",
    columnGap: "10px",
  },
  error: {
    color: theme.palette.error.main,
    height: "18px",
    width: "18px",
    marginTop: "20px",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    marginTop: "-20px",
  },
  snackbar: {
    background: theme.palette.error.main,
  },
  dontHaveAccount: {
    marginBottom: "50px",
    color: Colors.black,
    margin: "auto",
  },
  signUP: {
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: "700",
  },
  avatar: {
    height: "100px",
    width: "200px",
    marginBottom: "0px",
    marginTop: "0px",
  },
  description: {
    width: "40vw",
    textAlign: "center",
    color: theme.palette.common.white,
    fontSize: "52px",
    margin: "auto",
    marginTop: "30vh",
    textShadow: `5px 10px ${theme.palette.primary.dark}`,
    fontWeight: "bolder",
  },
}));
