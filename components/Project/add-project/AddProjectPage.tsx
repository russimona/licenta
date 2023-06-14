import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { ITaskStatus } from "@/utils/interface";
import { AddAsignee } from "@/components/Project/add-ticket/AddAsigneeTicket";
import { TabContext, TabPanel } from "@material-ui/lab";
import { addNewProject } from "@/redux/addNewProject/slice";
import { useAppDispatch } from "@/core/store";
import { getAllProjectData } from "@/redux/getAllProjects/slice";
import { Colors } from "@/utils/colors";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloseIcon from "@mui/icons-material/Close";

const AddProjectPage = () => {
  const { classes, cx } = useStyles();
  const [projectLeader, setProjectLeader] = useState<string[]>([]);
  const [asigne, setAsigne] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [currentTaskStatus, setCurrentTaskStatus] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

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
    if (
      taskStatus.length === 0 ||
      asigne.length === 0 ||
      projectLeader.length === 0 ||
      projectName.length === 0 ||
      projectDescription.length === 0
    ) {
      setOpen(true);
    } else {
      dispatch(
        addNewProject({
          taskStatus,
          asigne,
          projectLeader,
          projectName,
          projectDescription,
        })
      ).then(() => {
        alert("Project added succesfully");
        dispatch(getAllProjectData());
        setAsigne([]);
        setCurrentTaskStatus("");
        setProjectLeader([]);
        setProjectName("");
        setProjectDescription("");
      });
    }
  };

  const [value, setValue] = useState<string>("1");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseSuccess = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {STRINGS.PLEASE_COMPLETE_ALL_FIELDS_TO_ADD_NEW_PROJECT}
          </Alert>
        </Snackbar>

        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            {STRINGS.PROJECT_ADDED_SUCCESFULLY}
          </Alert>
        </Snackbar>

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
                      <Box key={item.name} className={classes.boxTaxkStatus}>
                        <Typography
                          variant="h5"
                          className={classes.boartStatsTypo}
                        >
                          {item.name}
                        </Typography>
                        <DeleteForeverOutlinedIcon
                          className={classes.iconDelete}
                          onClick={() => {
                            setTaskStatus((prev) =>
                              prev.filter(
                                (itemPref) => item.name !== itemPref.name
                              )
                            );
                          }}
                        />
                      </Box>
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
    borderStyle: "outset",
    background: Colors.lightGray,
    borderRadius: theme.spacing(0.7),
    color: theme.palette.secondary.dark,
    height: "40px",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    paddingTop: "10px",
    width: "30vw",
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
  boxTaxkStatus: {
    display: "flex",
    flexDirection: "row",
    width: "calc(20vw + 20px)",
  },
  iconDelete: {
    color: "#5c5e69",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    verticalAlign: "center",
    height: "25px",
    width: "23px",
    marginTop: "7px",
    marginLeft: theme.spacing(1),
  },
}));
