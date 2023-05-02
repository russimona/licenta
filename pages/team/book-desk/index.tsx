import { Navbar } from "@/components/Navbar/navbar";
import { OptionBar } from "@/components/OptionBar/OptionBar";
import { ProfileCard } from "@/components/profileCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { makeStyles } from "tss-react/mui";

export default function Home() {
  const { classes } = useStyles();
  return (
    <ProtectedRoute>
      <Navbar />
      <div className={classes.background}>desk</div>
    </ProtectedRoute>
  );
}

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.secondary.light,
    height: "100vh",
    width: "100vw",
    display: "flex",
    paddingTop: "70px",
    overflow: "auto",
    overflowX: "hidden",
  },
}));
