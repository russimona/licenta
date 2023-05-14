import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { ITaskStatus } from "@/utils/interface";

function App() {
  const { classes } = useStyles();

  const [emailHR, setEmailHR] = useState<string[]>([]);
  const [emailPM, setEmailPM] = useState<string[]>([]);
  const [emailDev, setEmailDev] = useState<string[]>([]);
  const [currentEmailHR, setCurrentEmailHR] = useState<string>("");
  const [currentEmailPM, setCurrentEmailPM] = useState<string>("");
  const [currentEmailDev, setCurrentEmailDev] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<ITaskStatus[]>([]);
  const saveHREmailHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setEmailHR((prev) => [...prev, currentEmailHR]);
      setCurrentEmailHR("");
    }
  };
  const savePMEmailHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setEmailPM((prev) => [...prev, currentEmailPM]);
      setCurrentEmailPM("");
    }
  };
  const saveDevEmailHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setEmailDev((prev) => [...prev, currentEmailDev]);
      setCurrentEmailDev("");
    }
  };

  return (
    <div className={classes.background}>
      <Navbar />
      <div className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {STRINGS.NEW_MEMBERS.toLocaleUpperCase()}
        </Typography>
        <ArrowRightIcon className={classes.rightIcon} />
        <Button className={classes.button}>{STRINGS.ADD_MEMBERS}</Button>
      </div>
      <div className={classes.line} />
      <Grid container direction="column" className={classes.grid}>
        <Grid item>
          <Typography className={classes.employeeType}>
            Human resources
          </Typography>
          {emailHR &&
            emailHR.map((item) => (
              <Typography variant="h5" key={item}>
                {item}
              </Typography>
            ))}
          <TextField
            label={STRINGS.ADD_NEW_BOARD_STATS}
            onKeyDown={saveHREmailHandler}
            value={currentEmailHR}
            onChange={(event) => {
              setCurrentEmailHR(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.employeeType}>
            Project manager
          </Typography>
          {emailPM &&
            emailPM.map((item) => (
              <Typography variant="h5" key={item}>
                {item}
              </Typography>
            ))}
          <TextField
            label={STRINGS.ADD_NEW_BOARD_STATS}
            onKeyDown={savePMEmailHandler}
            value={currentEmailPM}
            onChange={(event) => {
              setCurrentEmailPM(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.employeeType}>Developer</Typography>
          {emailDev &&
            emailDev.map((item) => (
              <Typography variant="h5" key={item}>
                {item}
              </Typography>
            ))}
          <TextField
            label={STRINGS.ADD_NEW_BOARD_STATS}
            onKeyDown={saveDevEmailHandler}
            value={currentEmailDev}
            onChange={(event) => {
              setCurrentEmailDev(event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.common.white,
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "100px",
    alignContent: "center",
  },
  button: {
    background: theme.palette.primary.dark,
    width: "fit-content",
    alignSelf: "center",
    height: "fit-content",
    marginTop: "7px",
    ":hover": {
      background: theme.palette.primary.dark,
    },
  },
  line: {
    height: "1px",
    background: theme.palette.primary.main,
    width: "90vw",
    marginLeft: "5vw",
    marginTop: theme.spacing(2),
  },
  rightIcon: {
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
  },
  employeeType: {
    // marginTop: "15px",
  },
  grid: {
    display: "flex",
    alignContent: "center",
  },
}));
