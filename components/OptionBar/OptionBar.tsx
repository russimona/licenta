import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import { STRINGS } from "@/utils/strings";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { logOut } from "@/redux/logOut/slice";
import { logInActions, logInAnonymously } from "@/redux/loginSlice/slice";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { USER_TYPE } from "@/utils/userType";

export const OptionBar = () => {
  const { classes, cx } = useStyles();
  const routes = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.loggedUser.user);
  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(logInAnonymously());
    dispatch(logInActions.reset());
    routes.push(ROUTES.LOGIN);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("companyId");
  };

  useEffect(() => {
    dispatch(getLoggedUserData());
  }, [dispatch]);

  console.log(user);

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

      {(user.role === USER_TYPE.BUSSINESS_OWNER ||
        user.role === USER_TYPE.HR) && (
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
      )}
      <Link href={ROUTES.ALL_MEMBERS}>
        <Box
          className={cx(
            classes.item,
            routes.asPath.includes("all-members")
              ? classes.itemClicked
              : classes.itemNotClicked
          )}
        >
          <PeopleAltIcon className={classes.icons} />
          {STRINGS.ALL_MEMBERS}
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
