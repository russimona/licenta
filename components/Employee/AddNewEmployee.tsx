import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { USER_TYPE } from "../../utils/userType";
import { makeStyles } from "tss-react/mui";
import { Colors } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";

interface IAddNewEmployeeProps {
  setRole: React.Dispatch<SetStateAction<string>>;
  setEmail: React.Dispatch<SetStateAction<string>>;
  setLastName: React.Dispatch<SetStateAction<string>>;
  setFirstName: React.Dispatch<SetStateAction<string>>;
  setNumberOfFreeDays: React.Dispatch<SetStateAction<number>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  role: string;
  error: boolean;
  success: boolean;
}
export const AddNewEmployee = (props: IAddNewEmployeeProps) => {
  const {
    setRole,
    setEmail,
    setLastName,
    setFirstName,
    setNumberOfFreeDays,
    setError,
    setSuccess,
    role,
    error,
    success,
  } = props;
  const { classes } = useStyles();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const handleCloseSuccess = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  const handleChangeUserType = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <Box className={classes.grid}>
      <div className={classes.box}>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {STRINGS.PLEASE_COMPLETE_ALL_FIELDS_TO_ADD_NEW_MEMBER}
          </Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            {STRINGS.REQUEST_SEND_SUCCESSFULLY}
          </Alert>
        </Snackbar>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Role :
          </Typography>
          <FormControl>
            <InputLabel />
            <Select
              value={role}
              onChange={handleChangeUserType}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className={classes.form}
            >
              <MenuItem value={USER_TYPE.DEVELOPER}>
                {USER_TYPE.DEVELOPER}
              </MenuItem>
              <MenuItem value={USER_TYPE.HR}>{USER_TYPE.HR}</MenuItem>
              <MenuItem value={USER_TYPE.PM}>{USER_TYPE.PM}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Email :{" "}
          </Typography>
          <TextField
            variant="standard"
            className={classes.textInputStyle}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            First name :{" "}
          </Typography>
          <TextField
            variant="standard"
            className={classes.textInputStyle}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Last name :{" "}
          </Typography>
          <TextField
            variant="standard"
            className={classes.textInputStyle}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Number of free days :
          </Typography>
          <TextField
            variant="standard"
            className={classes.textInputStyle}
            onChange={(event) =>
              setNumberOfFreeDays(Number(event.target.value))
            }
          />
        </Box>
      </div>
    </Box>
  );
};

export default AddNewEmployee;

const useStyles = makeStyles()((theme) => ({
  grid: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(1),
    paddingTop: "5vh",
    columnGap: theme.spacing(1),
    marginTop: theme.spacing(5),
    alignItems: "center",
    background: theme.palette.common.white,
    marginLeft: "15vw",
  },
  box: {
    padding: theme.spacing(3),
    background: theme.palette.secondary.light,
    boxShadow: `2px 2px 10px 0px ${Colors.gray}`,
  },
  form: {
    height: "30px",
    width: "30vw",
  },
  itemsForm: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    columnGap: theme.spacing(1),
    width: "fit-content",
  },
  textInputStyle: {
    width: "30vw",
  },
  typographyItemStyle: {
    width: "170px",
  },
}));
