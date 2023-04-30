import { Avatar, Box } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";

import { ProfileItemDropBox } from "./DropBoxProfile";
import { ProjectsItemDropBox } from "./DropBoxProjects";
import { TeamItemDropBox } from "./DropBoxTeam";

export const Navbar = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.box}>
      <Avatar src="weLogo.png" className={classes.avatar} />
      <Box className={classes.dropbox}>
        <ProjectsItemDropBox />
        <TeamItemDropBox />
        <ProfileItemDropBox />
      </Box>
    </div>
  );
};

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "70px",
    position: "fixed",
    backgroundColor: theme.palette.primary.dark,
    width: "100vw",
    color: theme.palette.common.white,
    columnGap: "40px",
  },
  icons: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  dropbox: {
    float: "right",
    marginRight: "50px",
    marginTop: "-76px",
    display: "flex",
    flexDirection: "row",
    columnGap: "50px",
  },
  avatar: {
    height: "70px",
    width: "110px",
    marginLeft: "10px",
  },
}));
