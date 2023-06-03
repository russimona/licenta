import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { STRINGS } from "@/utils/strings";
import { Colors } from "@/utils/colors";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getInvitedUserData } from "@/redux/getInvitedUser/slice";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { joinTeam } from "@/redux/joinTeam/slice";
import { logInAnonymously } from "@/redux/loginSlice/slice";

export const InviteNewMemberForm = () => {
  const { classes } = useStyles();
  const userData = useAppSelector((state) => state.invitedUser.user);
  const router = useRouter();
  const { inviteId } = router.query;
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>("");
  const [passwordRepeated, setPasswordRepeated] = useState<string>("");
  const [errorSignUp, setErrorSignUp] = useState<boolean>(false);

  useEffect(() => {
    dispatch(logInAnonymously());
    if (inviteId?.toString()) {
      console.log(inviteId.toString());
      dispatch(getInvitedUserData({ uid: inviteId?.toString() }));
    }
  }, [dispatch, inviteId]);

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

  const loginHandler = () => {
    if (checkPassword()) {
      dispatch(
        joinTeam({
          email: userData.email,
          password: password,
          companyId: userData.companyId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          freeDaysTotal: userData.numberOfFreeDays,
          role: userData.role,
        })
      );
      router.push(ROUTES.LOGIN);
    }
  };
  return (
    <Box className={classes.box}>
      <Box className={classes.form}>
        <Typography variant="h3" className={classes.subtitles}>
          {STRINGS.HELLO} {userData.email} !
        </Typography>
        <Typography className={classes.title}>
          {STRINGS.WELCOME_TO_THE_TEAM}
        </Typography>
        <Typography variant="h3" className={classes.subtitles}>
          {STRINGS.JOIN_US_BY_CLICKING}
        </Typography>
        <Box className={classes.boxPassword}>
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
        </Box>
        <Button className={classes.button} onClick={loginHandler}>
          {STRINGS.LOGIN}
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
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background: Colors.lightGray,
    height: "fit-content",
    width: "70vw",
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
    textAlign: "center",
    fontSize: "32px",
    color: theme.palette.primary.dark,
  },
  subtitles: {
    color: theme.palette.primary.dark,
    textAlign: "center",
  },
  button: {
    background: `${theme.palette.primary.main}!important`,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    marginTop: "-20px",
  },
  error: {
    color: theme.palette.error.main,
    height: "18px",
    width: "18px",
    marginTop: "20px",
  },
  boxPassword: {
    marginTop: theme.spacing(2),
  },
}));
