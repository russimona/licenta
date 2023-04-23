import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { STRINGS } from "@/utils/strings";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/core/store";
import { logOut } from "@/redux/signUp/slice";
import { logInActions, logInAnonymously } from "@/redux/loginSlice/slice";

export const ProfileItemDropBox = () => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(logInAnonymously());
    dispatch(logInActions.reset());
    setAnchorEl(null);
    router.push(ROUTES.LOGIN);
  };

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.button}
      >
        {STRINGS.ACCOUNT}
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          {STRINGS.PROFILE}
          <AccountCircleSharpIcon className={classes.icons} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {STRINGS.SETTINGS}
          <SettingsIcon className={classes.icons} />
        </MenuItem>
        <MenuItem onClick={logOutHandler}>
          {STRINGS.LOG_OUT}
          <LogoutIcon className={classes.icons} />
        </MenuItem>
      </Menu>
    </div>
  );
};

const useStyles = makeStyles()((theme) => ({
  icons: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  button: {
    background: theme.palette.primary.dark,
    ":hover": {
      background: theme.palette.primary.dark,
    },
  },
}));
