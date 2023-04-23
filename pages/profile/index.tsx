import { Navbar } from "@/components/Navbar/navbar";
import { ProfileCard } from "@/components/profileCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { makeStyles } from "tss-react/mui";

export default function Home() {
  const { classes } = useStyles();
  return (
    <ProtectedRoute>
      <Navbar />
      <div className={classes.background}>
        <ProfileCard />
      </div>
    </ProtectedRoute>
  );
}

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.secondary.light,
    height: "calc(100vh - 70px)",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
}));
