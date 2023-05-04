import {
  Alert,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { STRINGS } from "@/utils/strings";
import { Colors } from "@/utils/colors";
import GoogleIcon from "@mui/icons-material/Google";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch } from "@/core/store";
import { signUp } from "@/redux/signUp/slice";

export const SignUpForm = () => {
  const { classes } = useStyles();
  const [errorSignUp, setErrorSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeated, setPasswordRepeated] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const checkEmail = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorSignUp(true);
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (
      password.length < 8 ||
      passwordRepeated.length < 8 ||
      passwordRepeated !== password
    ) {
      setErrorSignUp(true);
      return false;
    }
    return true;
  };

  const checkName = () => {
    if (firstName.length === 0 || lastName.length === 0) {
      setErrorSignUp(true);
      return false;
    }
    return true;
  };

  const submitSignUp = () => {
    if ((checkEmail(), checkPassword(), checkName())) {
      dispatch(signUp({ email, firstName, lastName, password })).then(() => {
        router.push(ROUTES.LOGIN);
      });
    }
  };

  const loginHandler = () => {
    router.push(ROUTES.LOGIN);
  };

  return (
    <Box className={classes.box}>
      <Avatar src="weLogo.png" className={classes.avatar} />
      <Box className={classes.form}>
        <Typography className={classes.title}>{STRINGS.SIGN_UP}</Typography>
        <Typography className={classes.dontHaveAccount}>
          {STRINGS.ALREADY_HAVE_ACCOUNT} {STRINGS.GO_TO}
          <span className={classes.login} onClick={loginHandler}>
            {" "}
            {STRINGS.LOGIN.toLocaleLowerCase()}{" "}
          </span>
          {STRINGS.PAGE}
        </Typography>
        <Typography>{STRINGS.EMAIL}</Typography>
        <div className={classes.input}>
          <TextField
            error={errorSignUp}
            variant="standard"
            placeholder={STRINGS.EMAIL.toLocaleLowerCase()}
            onChange={(event) => {
              setErrorSignUp(false);
              setEmail(event.target.value);
            }}
          />
          {errorSignUp && <ErrorOutlineIcon className={classes.error} />}
        </div>

        <Typography>{STRINGS.FIRST_NAME}</Typography>
        <div className={classes.input}>
          <TextField
            error={errorSignUp}
            placeholder={STRINGS.FIRST_NAME.toLocaleLowerCase()}
            variant="standard"
            onChange={(event) => {
              setErrorSignUp(false);
              setFirstName(event.target.value);
            }}
          />
          {errorSignUp && <ErrorOutlineIcon className={classes.error} />}
        </div>

        <Typography>{STRINGS.LAST_NAME}</Typography>
        <div className={classes.input}>
          <TextField
            error={errorSignUp}
            placeholder={STRINGS.LAST_NAME.toLocaleLowerCase()}
            variant="standard"
            onChange={(event) => {
              setErrorSignUp(false);
              setLastName(event.target.value);
            }}
          />
          {errorSignUp && <ErrorOutlineIcon className={classes.error} />}
        </div>

        <Typography>{STRINGS.PASSWORD}</Typography>
        <div className={classes.input}>
          <TextField
            error={errorSignUp}
            placeholder={STRINGS.PASSWORD.toLocaleLowerCase()}
            variant="standard"
            type="password"
            onChange={(event) => {
              setErrorSignUp(false);
              setPassword(event.target.value);
            }}
          />
          {errorSignUp && <ErrorOutlineIcon className={classes.error} />}
        </div>
        <Typography>{STRINGS.REPEAT_PASSWORD}</Typography>
        <div className={classes.input}>
          <TextField
            error={errorSignUp}
            placeholder={STRINGS.PASSWORD.toLocaleLowerCase()}
            variant="standard"
            type="password"
            onChange={(event) => {
              setErrorSignUp(false);
              setPasswordRepeated(event.target.value);
            }}
          />
          {errorSignUp && <ErrorOutlineIcon className={classes.error} />}
        </div>

        {errorSignUp && (
          <Alert severity="error">{STRINGS.SIGN_UP_FAILED}</Alert>
        )}
        <Button onClick={submitSignUp}>{STRINGS.SIGN_UP}</Button>
        <div className={classes.orBox}>
          <div className={classes.line} />
          <Typography>{STRINGS.OR}</Typography>
          <div className={classes.line} />
        </div>
        <Button className={classes.googleLoginButton}>
          <GoogleIcon />
          {STRINGS.LOGIN_GOOGLE}
        </Button>
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
    marginTop: "50px",
    marginBottom: "50px",
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
    margin: "-5px",
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
  login: {
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: "700",
  },
  avatar: {
    height: "100px",
    width: "200px",
    marginBottom: "0px",
    marginTop: "0px",
    position: "absolute",
  },
}));
