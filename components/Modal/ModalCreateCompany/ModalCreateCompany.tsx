import React, { memo } from "react";
import { makeStyles } from "tss-react/mui";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const ModalCongrats = memo((props: ModalLayoutProps) => {
  const { classes } = useStyles();

  const onCloseHandler = () => {
    props.setIsOpen(false);
  };

  return (
    <Modal open={props.isOpen}>
      <Box className={classes.box}>
        <CloseIcon className={classes.avatar} onClick={onCloseHandler} />
        <Box className={classes.items}>
          <Typography variant="h1" className={classes.title}>
            Add your own company
          </Typography>
          <div className={classes.flexRow}>
            <Typography variant="h6" className={classes.itemName}>
              Name
            </Typography>
            <TextField variant="standard" />
          </div>
          <div className={classes.flexRow}>
            <Typography variant="h6" className={classes.itemName}>
              Address
            </Typography>
            <TextField variant="standard" />
          </div>
          <div className={classes.flexRow}>
            <Typography variant="h6" className={classes.itemName}>
              Phone number
            </Typography>
            <TextField variant="standard" type="standard" />
          </div>
          <div className={classes.flexRow}>
            <Typography variant="h6" className={classes.itemName}>
              Email
            </Typography>
            <TextField variant="standard" />
          </div>
          <Button className={classes.button}>
            Create your company profile
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "80vh",
    width: "70vw",
    background: theme.palette.common.white,
    radius: "5px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: `2px 2px 10px 0px ${theme.palette.common.black}`,
    borderRadius: "10px",
  },
  avatar: {
    float: "right",
    margin: theme.spacing(1),
    cursor: "pointer",
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
    marginTop: "10vh",
    marginBottom: "5vh",
    fontWeight: "bold",
    color: theme.palette.primary.dark,
  },
  itemName: {
    fontWeight: "bold",
    color: theme.palette.primary.dark,
  },
  button: {
    height: "fit-content",
    width: "fit-content",
    padding: `${theme.spacing(1)} ${theme.spacing(5)} ${theme.spacing(
      1
    )} ${theme.spacing(5)}`,
    marginTop: "7vh",
    // marginBottom: "0px",
  },
}));

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
