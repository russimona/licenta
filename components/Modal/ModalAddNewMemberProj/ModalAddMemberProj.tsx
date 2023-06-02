import React, { memo, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Modal, Box, Typography, Button, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { STRINGS } from "@/utils/strings";
import { useAppDispatch } from "@/core/store";
import { useRouter } from "next/router";
import { AddAsignee } from "@/components/Project/add-ticket/AddAsigneeTicket";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { addNewMemberProject } from "@/redux/addNewMemberProj/slice";
import { getAllProjectData } from "@/redux/getAllProjects/slice";

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (
  name: string,
  personName: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export const ModalAddMember = memo((props: ModalLayoutProps) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { projectId } = router.query;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLoggedUserData());
  }, [dispatch]);

  const onCloseHandler = () => {
    props.setIsOpen(false);
  };
  const [personName, setPersonName] = useState<string[]>([]);

  const addMembersHandler = () => {
    dispatch(
      addNewMemberProject({
        projectId: projectId?.toString() ?? "",
        newMembers: personName,
      })
    ).then(() => {
      dispatch(getAllProjectData());
    });
    props.setIsOpen(false);
  };
  return (
    <Modal open={props.isOpen}>
      <Box className={classes.box}>
        <CloseIcon className={classes.avatar} onClick={onCloseHandler} />
        <Box className={classes.items}>
          <Typography variant="h1" className={classes.title}>
            {STRINGS.ADD_NEW_PROJECT_MEMBERS}
          </Typography>
          <AddAsignee personName={personName} setPersonName={setPersonName} />
          <Button className={classes.button} onClick={addMembersHandler}>
            {STRINGS.ADD_MEMBERS}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

const useStyles = makeStyles()((theme) => ({
  box: {
    height: "40vh",
    width: "40vw",
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
    height: "30vh",
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
}));

interface ModalLayoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
