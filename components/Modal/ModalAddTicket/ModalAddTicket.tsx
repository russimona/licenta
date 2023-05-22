import React, { memo, useState } from "react";
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

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const ModalAddTicket = memo((props: ModalLayoutProps) => {
  const { classes } = useStyles();
  const [ticketType, setTicketType] = useState<string>(TICKET_TYPE.FEAT);
  const [ticketPriority, setTicketPriority] = useState<string>(
    TICKET_PRIORITY.LOW_PRIORITY
  );
  const handleChangeTicketType = (event: SelectChangeEvent) => {
    setTicketType(event.target.value as string);
  };
  const handleChangeTicketPriority = (event: SelectChangeEvent) => {
    setTicketPriority(event.target.value as string);
  };

  const onCloseHandler = () => {
    props.setIsOpen(false);
  };
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

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
                <Typography className={classes.itemName}>
                  {STRINGS.TITLE}
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  multiline={false}
                />
              </div>
              <div className={classes.divRow}>
                <Typography className={classes.itemName}>
                  Ticket type
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
                <Typography className={classes.itemName}>Priority</Typography>
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
                <Typography className={classes.itemName}>
                  Story points
                </Typography>
                <TextField
                  className={classes.storyPointsInput}
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
              <Typography>Asignee</Typography>
              <AddAsignee />
              <Typography>
                Created on : <span>data</span>
              </Typography>
              <Typography>
                Created by : <span>user email</span>
              </Typography>
            </div>
          </div>
          <Box className={classes.descriptionBox}>
            <Typography>Description</Typography>
            <TextField
              className={classes.description}
              id="outlined-basic"
              variant="outlined"
              multiline={true}
              minRows={3}
              maxRows={3}
            />
          </Box>
          <Button className={classes.button}>
            {STRINGS.CREATE_YOUR_COMPANY_PROFILE}
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
    background: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    ":hover": {
      background: theme.palette.secondary.light,
      color: theme.palette.primary.dark,
    },
    alignSelf: "center",
  },
  divRow: {
    display: "flex",
    flexDirection: "row",
    columnGap: theme.spacing(3),
  },
  divColumn: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    rowGap: theme.spacing(1),
  },
  itemName: {
    width: "70px",
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
    height: "30px",
    width: "50px",
  },
}));

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
