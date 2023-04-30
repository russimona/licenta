import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { makeStyles } from "tss-react/mui";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import { STRINGS } from "@/utils/strings";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { useAppDispatch } from "@/core/store";
import { logOut } from "@/redux/signUp/slice";
import { logInActions, logInAnonymously } from "@/redux/loginSlice/slice";

export const OptionBar = () => {
  const { classes, cx } = useStyles();
  const routes = useRouter();
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(logInAnonymously());
    dispatch(logInActions.reset());
    routes.push(ROUTES.LOGIN);
  };

  return (
    <Box className={classes.box}>
      <Link href={ROUTES.PROFILE}>
        <Box
          className={cx(
            classes.item,
            routes.asPath.includes("profile")
              ? classes.itemClicked
              : classes.itemNotClicked
          )}
        >
          <Person2Icon className={classes.icons} />
          {STRINGS.PROFILE}
        </Box>
      </Link>
      <Link href={ROUTES.SETTINGS}>
        <Box
          className={cx(
            classes.item,
            routes.asPath.includes("settings")
              ? classes.itemClicked
              : classes.itemNotClicked
          )}
        >
          <SettingsIcon className={classes.icons} />
          {STRINGS.SETTINGS}
        </Box>
      </Link>

      <Link href={ROUTES.ADD_MEMBERS}>
        <Box
          className={cx(
            classes.item,
            routes.asPath.includes("add-members")
              ? classes.itemClicked
              : classes.itemNotClicked
          )}
        >
          <PersonAddIcon className={classes.icons} />
          {STRINGS.ADD_MEMBERS}
        </Box>
      </Link>
      <Box
        className={cx(classes.item, classes.itemNotClicked)}
        onClick={logOutHandler}
      >
        <LogoutIcon className={classes.icons} />
        {STRINGS.LOG_OUT}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "calc( 100vh - 70px )",
    width: "15vw",
    background: theme.palette.primary.dark,
    radius: "5px",
    position: "fixed",
    marginTop: "70px",
  },
  item: {
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.light,
    cursor: "pointer",
  },
  itemClicked: {
    background: theme.palette.primary.dark,
    border: `${theme.spacing(0.1)} solid ${theme.palette.primary.light}`,
  },
  itemNotClicked: {
    background: theme.palette.primary.main,
    border: `${theme.spacing(0.1)} solid ${theme.palette.primary.dark}`,
  },
  icons: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    marginRight: "5px",
  },
}));
