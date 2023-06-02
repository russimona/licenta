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
  OutlinedInput,
  Chip,
  Theme,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { STRINGS } from "@/utils/strings";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { useRouter } from "next/router";
import { getAllUserData } from "@/redux/getAllUsers/slice";
import { theme } from "@/core/theme";
import { AddAsignee } from "@/components/Project/add-ticket/AddAsigneeTicket";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { addNewMemberProject } from "@/redux/addNewMemberProj/slice";
import { getAllProjectData } from "@/redux/getAllProjects/slice";
import { removeMemberProject } from "@/redux/removeMemberToProject/slice";

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

export const ModalDeleteMember = memo((props: ModalLayoutProps) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const [personName, setPersonName] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [names, setNames] = useState<string[]>([]);
  const router = useRouter();
  const { projectId } = router.query;
  const allUsers = useAppSelector((state) => state.projects.project).filter(
    (item) => item.id === projectId
  )[0].asigne;

  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setNames([]);
    allUsers.forEach((user) => {
      setNames((prevState) => [...prevState, user]);
    });
  }, [allUsers, loggedUser.companyId]);

  useEffect(() => {
    dispatch(getAllProjectData());
    dispatch(getLoggedUserData());
  }, [dispatch]);

  const onCloseHandler = () => {
    props.setIsOpen(false);
  };

  const deleteMembersHandler = () => {
    dispatch(
      removeMemberProject({
        projectId: projectId?.toString() ?? "",
        members: personName,
      })
    );
    dispatch(getAllProjectData());
    setPersonName([]);
    props.setIsOpen(false);
  };

  return (
    <Modal open={props.isOpen}>
      <Box className={classes.box}>
        <CloseIcon className={classes.avatar} onClick={onCloseHandler} />
        <Box className={classes.items}>
          <Typography variant="h1" className={classes.title}>
            {STRINGS.REMOVE_MEMBERS_FROM_PROJECT}
          </Typography>
          <FormControl sx={{ m: 1, width: "90%" }}>
            <InputLabel />
            <Select
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button className={classes.button} onClick={deleteMembersHandler}>
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
