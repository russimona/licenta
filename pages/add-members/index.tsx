import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { OptionBar } from "@/components/OptionBar/OptionBar";

function App() {
  const { classes } = useStyles();

  const [emailHR, setEmailHR] = useState<string[]>([]);
  const [emailPM, setEmailPM] = useState<string[]>([]);
  const [emailDev, setEmailDev] = useState<string[]>([]);
  const [currentEmailHR, setCurrentEmailHR] = useState<string>("");
  const [currentEmailPM, setCurrentEmailPM] = useState<string>("");
  const [currentEmailDev, setCurrentEmailDev] = useState<string>("");
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
      <OptionBar />
      <div className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {STRINGS.NEW_MEMBERS.toLocaleUpperCase()}
        </Typography>
        <ArrowRightIcon className={classes.rightIcon} />
        <Button className={(classes.button, classes.button)}>
          {STRINGS.ADD_MEMBERS}
        </Button>
      </div>
      <div className={classes.line} />
      <Grid container direction="row" className={classes.grid}>
        <Grid item>
          <Typography className={classes.employeeType}>
            Human resources
          </Typography>
          {emailHR &&
            emailHR.map((item) => (
              <Typography
                variant="h5"
                key={item}
                className={classes.addesEmails}
              >
                {item}
              </Typography>
            ))}
          <TextField
            label={STRINGS.NEW_HR_EMAIL}
            onKeyDown={saveHREmailHandler}
            value={currentEmailHR}
            onChange={(event) => {
              setCurrentEmailHR(event.target.value);
            }}
            className={classes.fieldAddEmail}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.employeeType}>
            Project manager
          </Typography>
          {emailPM &&
            emailPM.map((item) => (
              <Typography
                variant="h5"
                key={item}
                className={classes.addesEmails}
              >
                {item}
              </Typography>
            ))}
          <TextField
            label={STRINGS.NEW_PM_EMAIL}
            onKeyDown={savePMEmailHandler}
            value={currentEmailPM}
            onChange={(event) => {
              setCurrentEmailPM(event.target.value);
            }}
            className={classes.fieldAddEmail}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.employeeType}>Developer</Typography>
          {emailDev &&
            emailDev.map((item) => (
              <Typography
                variant="h5"
                key={item}
                className={classes.addesEmails}
              >
                {item}
              </Typography>
            ))}
          <TextField
            label={STRINGS.NEW_DEV_EMAIL}
            onKeyDown={saveDevEmailHandler}
            value={currentEmailDev}
            onChange={(event) => {
              setCurrentEmailDev(event.target.value);
            }}
            className={classes.fieldAddEmail}
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
    marginLeft: "15vw",
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
    width: "70vw",
    marginLeft: "20vw",
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
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    textAlign: "center",
    height: "30px",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  grid: {
    display: "flex",
    alignContent: "center",
    paddingLeft: "15vw",
    justifyContent: "center",
    columnGap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  addesEmails: {
    width: "20vw",
    background: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    height: "50px",
    marginBottom: theme.spacing(1),
    textAlign: "center",
    borderRadius: theme.spacing(1),
    paddingTop: "10px",
  },
  fieldAddEmail: {
    width: "20vw",
  },
}));
