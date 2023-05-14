import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import { Button, TextField, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { ITaskStatus } from "@/utils/interface";
import { CustomizedHook } from "@/components/Project/add-project/AddPersonDropdown";
import { Colors } from "@/utils/colors";

function App() {
  const { classes } = useStyles();

  const [taskStatus, setTaskStatus] = useState<ITaskStatus[]>([]);
  const onKeyPressTextField = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setTaskStatus((prev) => [
        ...prev,
        { name: currentTaskStatus, items: [] },
      ]);
      setCurrentTaskStatus("");
    }
  };

  const [currentTaskStatus, setCurrentTaskStatus] = useState<string>("");

  return (
    <div className={classes.background}>
      <Navbar />
      <div className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {STRINGS.NEW_PROJECT_SPECIFICATIONS.toLocaleUpperCase()}
        </Typography>
        <ArrowRightIcon className={classes.rightIcon} />
        <Button className={classes.button}>{STRINGS.ADD_NEW_PROJECT}</Button>
      </div>
      <div className={classes.line} />
      <div className={classes.page}>
        <div className={classes.infoProject}>
          <div>
            <Typography>{STRINGS.PROJECT_NAME}</Typography>
            <TextField label={STRINGS.NAME} />
          </div>
          <div>
            <Typography>{STRINGS.PROJECT_DESCRIPTION}</Typography>
            <TextField
              label={STRINGS.DESCRIPTION}
              multiline
              id="outlined-multiline-flexible"
              minRows={5}
              maxRows={5}
            />
          </div>
        </div>
        <div>
          <Typography>{STRINGS.PROJECT_LEADER}</Typography>
          <CustomizedHook />
        </div>
        <div>
          <Typography>{STRINGS.PROJECT_ASIGNEE}</Typography>
          <CustomizedHook />
        </div>

        <div className={classes.taskStatus}>
          <Typography style={{ marginBottom: "18px" }}>
            {STRINGS.BOARD_STATUSES}
          </Typography>
          {taskStatus &&
            taskStatus.map((item) => (
              <Typography
                variant="h5"
                className={classes.boartStatsTypo}
                key={item.name}
              >
                {item.name}
              </Typography>
            ))}
          <TextField
            label={STRINGS.ADD_NEW_BOARD_STATS}
            className={classes.textFieldBoardStats}
            onKeyDown={onKeyPressTextField}
            value={currentTaskStatus}
            onChange={(event) => {
              setCurrentTaskStatus(event.target.value);
            }}
          />
        </div>
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
    justifyContent: "center",
  },
  page: {
    paddingTop: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    columnGap: theme.spacing(2),
    justifyContent: "center",
    margin: "auto",
    marginTop: "0px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "100px",
    alignContent: "center",
  },
  icons: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    marginLeft: "5px",
    paddingTop: "100px",
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
  taskStatus: {
    width: "20vw",
    height: "20vh",
    maxHeight: "20vh",
  },
  infoProject: {
    display: "flex",
    flexDirection: "column",
    width: "25vw",
    rowGap: theme.spacing(1),
  },
  description: {
    height: "50vh",
    width: "25vw",
  },
  textFieldBoardStats: {
    backgroundColor: theme.palette.secondary.light,
    marginTop: "0px",
  },
  boartStatsTypo: {
    background: Colors.lightBlue,
    borderRadius: theme.spacing(1),
    color: theme.palette.secondary.dark,
    height: "40px",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    paddingTop: "10px",
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
}));
