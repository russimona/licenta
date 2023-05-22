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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch } from "@/core/store";
import { resetPasswordUser } from "@/redux/forgotPassword/slice";

export const ResetPassword = () => {
  const { classes } = useStyles();
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const checkEmail = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorLogin(true);
      return false;
    }
    return true;
  };

  const submitLogin = () => {
    if (checkEmail()) {
      dispatch(resetPasswordUser({ email }));
    }
  };

  const loginHandler = () => {
    router.push(ROUTES.LOGIN);
  };

  return (
    <Box className={classes.box}>
      <Avatar src="weLogo.png" className={classes.avatar} />
      <Box className={classes.form}>
        <Typography className={classes.title}>
          {STRINGS.FORGOT_YOUR_PASSWORD}
        </Typography>
        <Typography className={classes.subtitle}>
          {
            STRINGS.PLEASE_ENTER_YOUR_EMAIL_ADDRESS_YOU_LIKE_YOUR_PASSWORD_INFORMATION_SEND_TO
          }
        </Typography>
        <div className={classes.input}>
          <TextField
            error={errorLogin}
            variant="standard"
            placeholder={STRINGS.EMAIL}
            onChange={(event) => {
              setErrorLogin(false);
              setEmail(event.target.value);
            }}
          />
          {errorLogin && <ErrorOutlineIcon className={classes.error} />}
        </div>
        {errorLogin && (
          <Alert severity="error">{STRINGS.ENTER_VALID_EMAIL}</Alert>
        )}
        <Button onClick={submitLogin} className={classes.button}>
          {STRINGS.RESET_PASSWORD}
        </Button>
        <Typography className={classes.login} onClick={loginHandler}>
          <ArrowBackIosIcon className={classes.backIcon} />
          {STRINGS.BACK_TO_LOGIN}
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
  subtitle: {
    color: Colors.darkBlue,
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
  login: {
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: "700",
    color: Colors.gray,
  },
  backIcon: {
    height: "10px",
    width: "10px",
  },
  avatar: {
    height: "100px",
    width: "200px",
    marginBottom: "0px",
    marginTop: "0px",
    position: "absolute",
  },
  button: {
    backgroundColor: `${theme.palette.primary.main}!important`,
  },
}));
