import React, { memo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "@/core/store";
import { addNewCompany } from "@/redux/addNewCompany/slice";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Colors } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const ModalAddNewCompany = memo((props: ModalLayoutProps) => {
  const { classes } = useStyles();

  const onCloseHandler = () => {
    props.setIsOpen(false);
  };
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const createCompany = () => {
    if (name.length < 1 || email.length < 1 || address.length < 1) {
      setError(true);
    } else {
      dispatch(addNewCompany({ name, email, address }));
      props.setIsOpen(false);
    }
  };

  return (
    <Modal open={props.isOpen}>
      <Box className={classes.box}>
        <CloseIcon className={classes.avatar} onClick={onCloseHandler} />
        <Box className={classes.items}>
          <Typography variant="h1" className={classes.title}>
            {STRINGS.ADD_YOUR_OWN_COMPANY}
          </Typography>
          <div className={classes.flexRow}>
            <Typography variant="h6" className={classes.itemName}>
              {STRINGS.NAME}
            </Typography>
            <TextField
              variant="standard"
              className={classes.inputField}
              onChange={(event) => {
                setName(event.target.value);
                setError(false);
              }}
            />
          </div>
          <div className={classes.flexRow}>
            <Typography variant="h6" className={classes.itemName}>
              {STRINGS.EMAIL}
            </Typography>
            <TextField
              variant="standard"
              className={classes.inputField}
              onChange={(event) => {
                setEmail(event.target.value);
                setError(false);
              }}
            />
          </div>
          <div className={classes.flexRow}>
            <Typography variant="h6" className={classes.itemName}>
              {STRINGS.ADDRESS}
            </Typography>
            <TextField
              variant="standard"
              className={classes.inputField}
              onChange={(event) => {
                setAddress(event.target.value);
                setError(false);
              }}
            />
          </div>
          <Button className={classes.button} onClick={createCompany}>
            {STRINGS.CREATE_YOUR_COMPANY_PROFILE}
          </Button>
          {error && (
            <div className={classes.boxError}>
              <ErrorOutlineIcon className={classes.error} />
              <Typography variant="h4" className={classes.textError}>
                {STRINGS.ERROR_ADD_NEW_COMPANY}
              </Typography>
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
});

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "70vh",
    width: "70vw",
    background: `linear-gradient(300deg,  ${theme.palette.primary.main} 10%, ${theme.palette.primary.dark} 70%, ${theme.palette.primary.main} 100%)`,

    radius: "5px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: `2px 2px 10px 0px ${theme.palette.primary.dark}`,
    borderRadius: "10px",
  },
  avatar: {
    float: "right",
    margin: theme.spacing(2),
    cursor: "pointer",
    height: "24px",
    width: "24px",
    color: theme.palette.secondary.light,
  },
  items: {
    height: "75vh",
    width: "70vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60vw",
    columnGap: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  title: {
    textAlign: "center",
    marginTop: "7vh",
    marginBottom: "5vh",
    fontWeight: "bold",
    color: theme.palette.secondary.light,
  },
  itemName: {
    fontWeight: "bold",
    width: theme.spacing(10),
    color: theme.palette.secondary.light,
    textAlign: "center",
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
  },
  inputField: {
    paddingLeft: theme.spacing(0.2),
    background: theme.palette.secondary.light,
    borderRadius: theme.spacing(1),
  },
  error: {
    color: Colors.redCalendar,
    height: "18px",
    width: "18px",
  },
  boxError: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: theme.spacing(1),
    verticalAlign: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(3),
    marginTop: theme.spacing(1),
    border: `1px solid ${Colors.redMedical}`,
  },

  textError: {
    color: Colors.redCalendar,
    textAlign: "center",
  },
}));

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
