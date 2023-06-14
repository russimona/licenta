import { useAppDispatch, useAppSelector } from "@/core/store";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { ROUTES } from "@/utils/routes";
import { USER_TYPE } from "@/utils/userType";
import { Avatar, Box, Link } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";

import { ProfileItemDropBox } from "./DropBoxProfile";
import { ProjectsItemDropBox } from "./DropBoxProjects";
import { TeamItemDropBox } from "./DropBoxTeam";

export const Navbar = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.loggedUser.user);
  useEffect(() => {
    dispatch(getLoggedUserData());
  }, [dispatch]);

  return (
    <div className={classes.box}>
      <Link href={ROUTES.HOME}>
        <Avatar src="../weLogo.png" className={classes.avatar} />
      </Link>
      <Box className={classes.dropbox}>
        {user.role !== USER_TYPE.HR && <ProjectsItemDropBox />}
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
    cursor: "pointer",
  },
}));
