import { useAppDispatch, useAppSelector } from "@/core/store";
import { Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { STRINGS } from "@/utils/strings";
import CheckIcon from "@mui/icons-material/Check";
import { Colors } from "@/utils/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/routes";
import { logOut } from "@/redux/logOut/slice";
import { deleteAccount } from "@/redux/deleteAccount/slice";

export const ProfileCard = () => {
  const { classes } = useStyles();
  const user = useAppSelector((state) => state.loggedUser.user);
  const [enabledEdit, setEnableEdit] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const deleteAcountHandler = () => {
    dispatch(logOut());
    dispatch(deleteAccount());
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className={classes.background}>
      <Typography variant="h1" className={classes.title}>
        {STRINGS.PROFILE_INFO.toLocaleUpperCase()}
      </Typography>
      <div className={classes.item}>
        <Typography variant="h2">{STRINGS.FIRST_NAME} :</Typography>
        <input
          disabled={!enabledEdit}
          defaultValue={user.firstName}
          className={
            enabledEdit ? classes.editFieldsEnabled : classes.editFieldsDisabled
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setFirstName(event.target.value);
          }}
        />
      </div>
      <div className={classes.item}>
        <Typography variant="h2">{STRINGS.LAST_NAME} :</Typography>
        <input
          disabled={!enabledEdit}
          defaultValue={user.lastName}
          className={
            enabledEdit ? classes.editFieldsEnabled : classes.editFieldsDisabled
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setLastName(event.target.value);
          }}
        />
      </div>
      <div className={classes.item}>
        <Typography variant="h2">{STRINGS.EMAIL} :</Typography>
        <input
          disabled={!enabledEdit}
          defaultValue={user.email}
          className={
            enabledEdit ? classes.editFieldsEnabled : classes.editFieldsDisabled
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setEmail(event.target.value);
          }}
        />
      </div>
  
      <div className={classes.buttons}>
        {!enabledEdit ? (
          <div
            className={classes.editProfileBtn}
            onClick={() => {
              setEnableEdit((enabled) => !enabled);
            }}
          >
            <Typography variant="h5">{STRINGS.EDIT_PROFILE}</Typography>
            <BorderColorIcon className={classes.editProfileIcon} />
          </div>
        ) : (
          <div
            className={classes.saveProfileBtn}
            onClick={() => {
              setEnableEdit((enabled) => !enabled);
            }}
          >
            <Typography variant="h5">{STRINGS.SAVE}</Typography>
            <CheckIcon className={classes.editProfileIcon} />
          </div>
        )}

        <div className={classes.deleteProfileBtn} onClick={deleteAcountHandler}>
          {STRINGS.DELETE_PROFILE}
          <DeleteOutlineIcon className={classes.editProfileIcon} />
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.common.white,
    height: "fit-content",
    width: "70vw",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    boxShadow: `2px 2px 5px 0px ${theme.palette.primary.dark}`,
    rowGap: theme.spacing(2),
    paddingTop: theme.spacing(7),
    paddingLeft: theme.spacing(4),
    borderRadius: "10px",
    marginLeft: "15vw",
  },

  title: {
    fontWeight: "bolder",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  item: {
    display: "flex",
    flexDirection: "row",
    columnGap: "5px",
    alignItems: "center",
  },
  editFieldsDisabled: {
    width: "50vw",
    background: theme.palette.common.white,
    border: `${theme.spacing(0)} solid ${theme.palette.common.white}`,
    height: "fit-content",
    color: theme.palette.primary.main,
    fontSize: theme.typography.h4.fontSize,
  },
  editFieldsEnabled: {
    width: "50vw",
    border: `${theme.spacing(0.1)} solid ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(0.6),
    height: "fit-content",
    color: theme.palette.primary.main,
    fontSize: theme.typography.h4.fontSize,
  },
  editProfileBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "auto",
    cursor: "pointer",
    columnGap: "5px",
    color: Colors.green,
    height: "fit-content",
    width: "fit-content",
    border: "0.5px solid",
    borderRadius: "10px",
    padding: theme.spacing(0.5),
  },
  saveProfileBtn: {
    display: "flex",
    flexDirection: "row",
    textAlign: "right",
    margin: "auto",
    justifyContent: "center",
    cursor: "pointer",
    columnGap: "5px",
    color: Colors.red,
    border: "0.5px solid",
    borderRadius: "10px",
    padding: theme.spacing(0.5),
    height: "fit-content",
    width: "fit-content",
  },
  deleteProfileBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "auto",
    cursor: "pointer",
    columnGap: "5px",
    color: Colors.red,
    height: "fit-content",
    width: "fit-content",
    border: "0.5px solid",
    borderRadius: "10px",
    padding: theme.spacing(0.5),
  },
  editProfileIcon: {
    height: "18px",
    width: "18px",
  },
  buttons: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(5),
  },
}));
