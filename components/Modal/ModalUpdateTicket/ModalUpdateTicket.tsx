import React, { SetStateAction, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  SelectChangeEvent,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import { STRINGS } from "@/utils/strings";
import { TICKET_PRIORITY, TICKET_TYPE } from "@/utils/ticketsInfo";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getAllProjectData } from "@/redux/getAllProjects/slice";
import { INewTicket, ITaskStatus } from "@/utils/interface";
import { getAllUserData } from "@/redux/getAllUsers/slice";
import { Colors } from "@/utils/colors";
import { editTicketStatus } from "@/redux/editTicket /slice";
import { useRouter } from "next/router";

interface ModalTicketsProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedTicket: React.Dispatch<SetStateAction<INewTicket | null>>;
  isOpen: boolean;
  data: INewTicket;
  tickets: ITaskStatus[];
}

export const ModalUpdateTicket = (props: ModalTicketsProps) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { projectId } = router.query;
  const users = useAppSelector((state) => state.allUsers.user);
  const [asigne, setAsigne] = useState<string>(props.data.asigne);
  const [ticketType, setTicketType] = useState<string>(props.data?.ticketType);
  const [ticketPriority, setTicketPriority] = useState<string>(
    props.data?.priority
  );
  const [title, setTitle] = useState<string>(props.data?.title);
  const [storyPoints, setStoryPoints] = useState<string>(
    props.data?.storyPoints
  );
  const [description, setDescription] = useState<string>(
    props.data?.description
  );
  const [ticketUpdated, setTicketUpdated] = useState<INewTicket>(props.data);

  const handleChangeTicketType = (event: SelectChangeEvent) => {
    setTicketType(event.target.value as string);
  };
  const handleChangeTicketPriority = (event: SelectChangeEvent) => {
    setTicketPriority(event.target.value as string);
  };

  const updateTicket = () => {
    const newColumns = props.tickets.map((column) =>
      column.items.map((ticket) =>
        ticket.id.match(ticketUpdated.id)
          ? {
              id: props.data.id,
              title,
              asigne,
              ticketType,
              priority: ticketPriority,
              storyPoints,
              description,
            }
          : ticket
      )
    );
    const finalColumns = props.tickets.map((item) => item.name);
    const updatedList = [] as ITaskStatus[];
    for (let i = 0; i < finalColumns.length; i++) {
      updatedList.push({
        name: finalColumns[i],
        items: newColumns[i],
      });
    }
    dispatch(
      editTicketStatus({
        projectId: projectId?.toString() ?? "",
        task: updatedList,
      })
    );

    dispatch(getAllProjectData());
    props.setSelectedTicket(null);
    props.setIsOpen(false);
  };

  const deleteTicket = () => {
    const newColumns = props.tickets.map((column) =>
      column.items.filter((ticket) => !ticket.id.match(ticketUpdated.id))
    );

    const finalColumns = props.tickets.map((item) => item.name);
    const updatedList = [] as ITaskStatus[];
    for (let i = 0; i < finalColumns.length; i++) {
      updatedList.push({
        name: finalColumns[i],
        items: newColumns[i],
      });
    }
    dispatch(
      editTicketStatus({
        projectId: projectId?.toString() ?? "",
        task: updatedList,
      })
    );

    dispatch(getAllProjectData());
    props.setSelectedTicket(null);
    props.setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getAllProjectData());
    dispatch(getAllUserData());
  }, [dispatch]);

  const onCloseHandler = () => {
    props.setIsOpen(false);
    props.setSelectedTicket(null);
  };

  return (
    <Modal open={props.isOpen}>
      <Box className={classes.box}>
        {props.isOpen}
        <CloseIcon className={classes.avatar} onClick={onCloseHandler} />
        <Box className={classes.items}>
          <div className={classes.divRow}>
            <div className={classes.divColumn}>
              <div className={classes.divRow}>
                <Typography variant="h4" className={classes.itemName}>
                  {STRINGS.TITLE}
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={title}
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
                  value={storyPoints}
                  onChange={(event) => {
                    setStoryPoints(event.target.value);
                  }}
                />
              </div>
              <div className={classes.divRow}>
                <Typography variant="h4">{STRINGS.ASIGNEE}</Typography>

                <FormControl fullWidth>
                  <NativeSelect
                    defaultValue={asigne}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                    onChange={(event) => {
                      setAsigne(event.target.value);
                    }}
                  >
                    {users.map((user) => {
                      return (
                        <option value={user.uid} key={user.uid}>
                          {user.email}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
              </div>
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
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Box>
          <Button className={classes.button} onClick={updateTicket}>
            {STRINGS.SAVE}
          </Button>
          <Box className={classes.boxRow} onClick={deleteTicket}>
            <Typography>{STRINGS.DELETE_TASK}</Typography>
            <DeleteForeverIcon />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "70vh",
    background: theme.palette.secondary.light,
    radius: "5px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: `2px 2px 10px 0px ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    padding: theme.spacing(2),
    justifyContent: "center",
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
  boxRow: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: theme.spacing(5),
    color: Colors.redCalendar,
    width: "fit-content",
    alignSelf: "center",
    cursor: "pointer",
  },
}));
