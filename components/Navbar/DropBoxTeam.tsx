import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { STRINGS } from "@/utils/strings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { USER_TYPE } from "@/utils/userType";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export const TeamItemDropBox = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const user = useAppSelector((state) => state.loggedUser.user);
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(getLoggedUserData());
  }, [dispatch]);
  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.button}
      >
        {STRINGS.FOR_TEAM}
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link href={ROUTES.FREE_DAYS}>
          <MenuItem onClick={handleClose}>
            {STRINGS.FREE_DAYS}
            <CalendarMonthIcon className={classes.icons} />
          </MenuItem>
        </Link>
        {user.role === USER_TYPE.HR && (
          <Link href={ROUTES.NOTIFICATIONS}>
            <MenuItem onClick={handleClose}>
              {STRINGS.NOTIFICATIONS}
              <NotificationsActiveIcon className={classes.icons} />
            </MenuItem>
          </Link>
        )}
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
