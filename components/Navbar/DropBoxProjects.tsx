import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { STRINGS } from "@/utils/strings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const ProjectsItemDropBox = () => {
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
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.button}
      >
        {STRINGS.PROJECTS}
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{STRINGS.FREE_DAYS}</MenuItem>
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
