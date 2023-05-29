import React, { memo, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Modal,
  Box,
  Typography,
  Button,
  Input,
  FormControl,
  SelectChangeEvent,
  Select,
  MenuItem,
  TextField,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { STRINGS } from "@/utils/strings";
import { TICKET_PRIORITY, TICKET_TYPE } from "@/utils/ticketsInfo";
import { AddAsignee } from "@/components/Project/add-ticket/AddAsigneeTicket";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { useRouter } from "next/router";
import { getAllProjectData } from "@/redux/getAllProjects/slice";
import { addNewTicket } from "@/redux/addNewTicket/slice";
import { PRIORITY_CODE } from "@/utils/priorityColors";
import { INewTicket } from "@/utils/interface";
import { numberTasks } from "@/utils/functions";
import { getAllUserData } from "@/redux/getAllUsers/slice";

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const ModalAddTicket = memo((props: ModalLayoutProps) => {
  const { classes } = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projectId } = router.query;
  const project = useAppSelector((state) => state.projects.project).filter(
    (item) => item.id === projectId
  )[0];
  const users = useAppSelector((state) => state.allUsers.user);

  const [asigne, setAsigne] = useState<string>();

  const [ticketType, setTicketType] = useState<string>(TICKET_TYPE.FEAT);
  const [ticketPriority, setTicketPriority] = useState<string>(
    TICKET_PRIORITY.LOW_PRIORITY
  );
  const [title, setTitle] = useState<string>("");
  const [storyPoints, setStoryPoints] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleChangeTicketType = (event: SelectChangeEvent) => {
    setTicketType(event.target.value as string);
  };
  const handleChangeTicketPriority = (event: SelectChangeEvent) => {
    setTicketPriority(event.target.value as string);
  };

  const onCloseHandler = () => {
    props.setIsOpen(false);
  };

  const addTicketHandler = () => {
    const task = {
      id: (numberTasks(project.taskStatus) + 1).toString(),
      title: title,
      ticketType: ticketType,
      priority: ticketPriority,
      description: description,
      asigne: asigne,
      storyPoints: storyPoints,
    } as INewTicket;
    dispatch(addNewTicket({ projectId: project.id, task: task }));
    dispatch(getAllProjectData());
    props.setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getAllProjectData());
    dispatch(getAllUserData());
  }, [dispatch]);

  return (
    <Modal open={props.isOpen}>
      <Box className={classes.box}>
        <CloseIcon className={classes.avatar} onClick={onCloseHandler} />
        <Box className={classes.items}>
          <Typography variant="h1" className={classes.title}>
            {STRINGS.ADD_NEW_TICKET}
          </Typography>
          <div className={classes.divRow}>
            <div className={classes.divColumn}>
              <div className={classes.divRow}>
                <Typography variant="h4" className={classes.itemName}>
                  {STRINGS.TITLE}
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  multiline={false}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div className={classes.divRow}>
                <Typography variant="h4" className={classes.itemName}>
                  {STRINGS.TICKET_TYPE}
                </Typography>
                <Box>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label" />
                    <Select
                      value={ticketType}
                      onChange={handleChangeTicketType}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className={classes.form}
                    >
                      <MenuItem value={TICKET_TYPE.FEAT}>
                        {TICKET_TYPE.FEAT}
                      </MenuItem>
                      <MenuItem value={TICKET_TYPE.BUG}>
                        {TICKET_TYPE.BUG}
                      </MenuItem>
                      <MenuItem value={TICKET_TYPE.REFACTOR}>
                        {TICKET_TYPE.REFACTOR}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className={classes.divRow}>
                <Typography variant="h4" className={classes.itemName}>
                  {STRINGS.PRIORITY}
                </Typography>
                <FormControl>
                  <InputLabel id="demo-simple-select-label" />
                  <Select
                    value={ticketPriority}
                    onChange={handleChangeTicketPriority}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className={classes.form}
                  >
                    <MenuItem value={TICKET_PRIORITY.LOW_PRIORITY}>
                      {TICKET_PRIORITY.LOW_PRIORITY}
                    </MenuItem>
                    <MenuItem value={TICKET_PRIORITY.MEDIUM_PRIORITY}>
                      {TICKET_PRIORITY.MEDIUM_PRIORITY}
                    </MenuItem>
                    <MenuItem value={TICKET_PRIORITY.HIGH_PRIORITY}>
                      {TICKET_PRIORITY.HIGH_PRIORITY}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={classes.divColumn}>
              <div className={classes.divRow}>
                <Typography variant="h4" className={classes.itemName}>
                  {STRINGS.STORY_POINTS}
                </Typography>
                <TextField
                  className={classes.storyPointsInput}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(event) => {
                    setStoryPoints(event.target.value);
                  }}
                />
              </div>
              <div className={classes.divRow}>
                <Typography variant="h4">{STRINGS.ASIGNEE}</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    value={asigne}
                    onChange={(event) => {
                      setAsigne(event.target.value);
                    }}
                  >
                    {users.map((user, index) => {
                      return (
                        <MenuItem key={user.uid} value={user.uid}>
                          {user.email}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <Typography variant="h4">
                {STRINGS.CREATED_ON} <span>data</span>
              </Typography>
              <Typography variant="h4">
                {STRINGS.CREATED_BY} <span>user email</span>
              </Typography>
            </div>
          </div>
          <Box className={classes.descriptionBox}>
            <Typography variant="h4">{STRINGS.DESCRIPTION}</Typography>
            <TextField
              className={classes.description}
              id="outlined-basic"
              variant="outlined"
              multiline={true}
              minRows={3}
              maxRows={3}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Box>
          <Button className={classes.button} onClick={addTicketHandler}>
            {STRINGS.ADD_NEW_TICKET}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "fit-content",
    width: "70vw",
    background: theme.palette.secondary.light,
    radius: "5px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: `2px 2px 10px 0px ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    padding: theme.spacing(2),
  },
  avatar: {
    float: "right",
    cursor: "pointer",
    height: "24px",
    width: "24px",
    color: theme.palette.primary.dark,
  },
  items: {
    height: "75vh",
    width: "70vw",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginTop: "1vh",
    marginBottom: "5vh",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  button: {
    height: "fit-content",
    width: "fit-content",
    padding: `${theme.spacing(1)} ${theme.spacing(5)} ${theme.spacing(
      1
    )} ${theme.spacing(5)}`,
    marginTop: "7vh",
    background: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    ":hover": {
      background: theme.palette.primary.main,
      color: theme.palette.secondary.light,
    },
    alignSelf: "center",
  },
  divRow: {
    display: "flex",
    flexDirection: "row",
    columnGap: theme.spacing(3),
    alignItems: "center",
  },
  divColumn: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    rowGap: theme.spacing(1),
  },
  itemName: {
    width: "fit-content",
  },
  form: {
    height: "30px",
  },
  description: {
    width: `calc(100% - ${theme.spacing(4)})`,
  },
  descriptionBox: {
    marginTop: theme.spacing(4),
  },
  storyPointsInput: {
    width: "60px",
  },
}));

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
