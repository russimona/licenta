import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { makeStyles } from "tss-react/mui";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { NotificationsMainPage } from "@/components/Notifications/NotificationsMainPage";

export default function Home() {
  const { classes } = useStyles();
  return (
    <ProtectedRoute>
      <Navbar />
      <div className={classes.background}>
        <NotificationsMainPage />
      </div>
    </ProtectedRoute>
  );
}

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.secondary.light,
    height: "100vh",
    width: "100vw",
    paddingTop: "70px",
    overflow: "auto",
  },
}));
