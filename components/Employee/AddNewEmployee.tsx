import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { USER_TYPE } from "../../utils/userType";
import { makeStyles } from "tss-react/mui";
import { Colors } from "@/utils/colors";

export const AddNewEmployee = () => {
  const { classes } = useStyles();

  const [userType, setUserType] = useState<string>("");
  const handleChangeUserType = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
  };
  return (
    <Box className={classes.grid}>
      <div className={classes.box}>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Role :
          </Typography>
          <FormControl>
            <InputLabel />
            <Select
              value={userType}
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
              <MenuItem value={USER_TYPE.DEVELOPER}>
                {USER_TYPE.DEVELOPER}
              </MenuItem>
              <MenuItem value={USER_TYPE.QA}>{USER_TYPE.QA}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Email :{" "}
          </Typography>
          <TextField variant="standard" className={classes.textInputStyle} />
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            First name :{" "}
          </Typography>
          <TextField variant="standard" className={classes.textInputStyle} />
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Last name :{" "}
          </Typography>
          <TextField variant="standard" className={classes.textInputStyle} />
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Phone number :{" "}
          </Typography>
          <TextField variant="standard" className={classes.textInputStyle} />
        </Box>
        <Box className={classes.itemsForm}>
          <Typography variant="h3" className={classes.typographyItemStyle}>
            Number of free days :
          </Typography>
          <TextField variant="standard" className={classes.textInputStyle} />
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
