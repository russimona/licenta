import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

import { STRINGS } from "@/utils/strings";

export const Navbar = () => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.box}>
      <Typography>Actions</Typography>

      <Box className={classes.rightBox}>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>{STRINGS.PROFILE}</MenuItem>
            <MenuItem onClick={handleClose}>{STRINGS.SETTINGS}</MenuItem>
            <MenuItem onClick={handleClose}>{STRINGS.LOG_OUT}</MenuItem>
          </Menu>
        </div>
      </Box>
      <div className={classes.rightBox}>
        <Typography>Profile</Typography>
        <AccountCircleSharpIcon />
        <SettingsIcon className={classes.settingsIcon} />
      </div>
    </div>
  );
};

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "62px",
    // background: `linear-gradient(300deg, ${theme.palette.common.white} 10%, ${theme.palette.primary.main} 70%, ${theme.palette.common.black} 100%)`,
    backgroundColor: theme.palette.primary.dark,
    width: "100vw",
    color: theme.palette.common.white,
    display: "flex",
    flexDirection: "row",
    columnGap: "40px",
    margin: "auto",
  },
  settingsIcon: {
    // flexDirection: "flex-end",
    width: "36px",
    height: "36px",
    cursor: "pointer",
  },
  rightBox: {
    width: "100px",
  },
}));
