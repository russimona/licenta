import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import { Button, Typography } from "@mui/material";
import React from "react";
import { OptionBar } from "@/components/OptionBar/OptionBar";
import { makeStyles } from "tss-react/mui";
import { AllMembersTable } from "@/components/all-members-profile/AllMembersTable";

function App() {
  const { classes } = useStyles();

  return (
    <div className={classes.background}>
      <Navbar />
      <OptionBar />
      <div className={classes.header}>
        <Typography variant="h3" className={classes.title}>
          {STRINGS.ALL_MEMBERS}
        </Typography>
        <AllMembersTable />
      </div>
    </div>
  );
}

export default App;

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.common.white,
    height: "100vh",
    width: "100vw",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "100px",
    alignContent: "center",
    marginLeft: "15vw",
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
    marginBottom: theme.spacing(5),
  },
  button: {
    width: "300px",
    display: "flex",
    alignItems: "center",
    margin: "auto",
    marginLeft: "calc(38vw + 150px )",
    marginTop: theme.spacing(10),
    backgroundColor: `${theme.palette.primary.main}!important`,
  },
}));
