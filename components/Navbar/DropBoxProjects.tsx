import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { STRINGS } from "@/utils/strings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getAllProjectData } from "@/redux/getAllProjects/slice";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";

export const ProjectsItemDropBox = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.projects.project);
  const projectsStatus = useAppSelector((state) => state.projects.status);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(getAllProjectData());
  }, [dispatch]);
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
        {projectsStatus === ReduxThunkStatuses.FULFILLED ? (
          projects.map((project, index) => (
            <Link href={ROUTES.PROJECT} key={index}>
              <MenuItem onClick={handleClose}>{project.projectName}</MenuItem>
            </Link>
          ))
        ) : (
          <></>
        )}
        <Link href={ROUTES.ADD_NEW_PROJECT}>
          <MenuItem onClick={handleClose}>{STRINGS.ADD_NEW_PROJECT}</MenuItem>
        </Link>
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
