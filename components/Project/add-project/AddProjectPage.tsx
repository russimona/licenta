import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { ITaskStatus } from "@/utils/interface";
import { Colors } from "@/utils/colors";
import { AddAsignee } from "@/components/Project/add-ticket/AddAsigneeTicket";
import { TabContext, TabPanel } from "@material-ui/lab";
import { addNewProject } from "@/redux/addNewProject/slice";
import { useAppDispatch } from "@/core/store";
import { getAllProjectData } from "@/redux/getAllProjects/slice";

const AddProjectPage = () => {
  const { classes, cx } = useStyles();
  const [projectLeader, setProjectLeader] = useState<string[]>([]);
  const [asigne, setAsigne] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [currentTaskStatus, setCurrentTaskStatus] = useState<string>("");

  const dispatch = useAppDispatch();
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

  const addNewProjectHandler = () => {
    dispatch(
      addNewProject({
        taskStatus,
        asigne,
        projectLeader,
        projectName,
        projectDescription,
      })
    ).then(() => {
      dispatch(getAllProjectData());
    });
  };

  const [value, setValue] = useState<string>("1");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };

  return (
    <div className={classes.background}>
      <Navbar />
      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <div className={classes.header}>
          <Typography variant="h1" className={classes.title}>
            {STRINGS.NEW_PROJECT_SPECIFICATIONS.toLocaleUpperCase()}
          </Typography>
          <ArrowRightIcon className={classes.rightIcon} />
          <Button
            className={cx(classes.button, classes.button)}
            onClick={addNewProjectHandler}
          >
            {STRINGS.ADD_NEW_PROJECT}
          </Button>
        </div>
        <div>
          <Typography>{STRINGS.PROJECT_NAME}</Typography>
          <TextField
            label={STRINGS.NAME}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
          />
        </div>
        <div>
          <Typography>{STRINGS.PROJECT_DESCRIPTION}</Typography>
          <TextField
            label={STRINGS.DESCRIPTION}
            multiline
            id="outlined-multiline-flexible"
            minRows={5}
            maxRows={5}
            onChange={(event) => {
              setProjectDescription(event.target.value);
            }}
          />
        </div>
        <div className={classes.page}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs onChange={handleChange}>
                  <Tab label="Add project leader" value={1} />
                  <Tab label="Add project assignees" value={2} />
                  <Tab label="Add tickets statuses" value={3} />
                </Tabs>
              </Box>
              <TabPanel value="1">
                <Typography>{STRINGS.PROJECT_LEADER}</Typography>
                <AddAsignee
                  personName={projectLeader}
                  setPersonName={setProjectLeader}
                />
              </TabPanel>
              <TabPanel value="2">
                <div>
                  <Typography>{STRINGS.PROJECT_ASIGNEE}</Typography>
                  <AddAsignee personName={asigne} setPersonName={setAsigne} />
                </div>
              </TabPanel>
              <TabPanel value="3">
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
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.common.white,
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
  },
  page: {
    paddingTop: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
    columnGap: theme.spacing(2),
    justifyContent: "center",
    margin: "auto",
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
    background: `${theme.palette.primary.dark}!important`,
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
