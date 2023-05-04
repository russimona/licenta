import { Colors } from "@/utils/colors";
import { Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";

export const ColorsMap = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.background}>
      <div>
        <div className={classes.item}>
          <div className={classes.color} />
          <Typography>Selected days off</Typography>
        </div>
        <div className={classes.item}>
          <div className={classes.colorDaysOff} />
          <Typography>Days off</Typography>
        </div>
        <div className={classes.item}>
          <div className={classes.colorMedical} />
          <Typography>Sick days</Typography>
        </div>
      </div>
      <div>
        <div className={classes.item}>
          <div className={classes.colorNationalDaysOff} />
          <Typography>National Days Off</Typography>
        </div>
        <div className={classes.item}>
          <div className={classes.colorUnpaid} />
          <Typography>Unpaid</Typography>
        </div>
        <div className={classes.item}>
          <div className={classes.colorWeekend} />
          <Typography>Weekend</Typography>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles()((theme) => ({
  background: {
    display: "flex",
    flexDirection: "row",
    columnGap: theme.spacing(1),
    height: "fit-content",
    width: "fit-content",
    background: theme.palette.common.white,
    alignItems: "center",
    margin: "auto",
    boxShadow: `1px 1px 5px 0px ${theme.palette.primary.light}`,
    padding: `${theme.spacing(1)} ${theme.spacing(5)} ${theme.spacing(
      1
    )} ${theme.spacing(5)}`,
    borderRadius: "10px",
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  color: {
    height: "20px",
    width: "20px",
    backgroundColor: Colors.lavanderSelection,
  },
  colorDaysOff: {
    height: "20px",
    width: "20px",
    backgroundColor: Colors.grayGreenFreeDay,
  },
  colorNationalDaysOff: {
    height: "20px",
    width: "20px",
    backgroundColor: Colors.redCalendar,
  },
  colorUnpaid: {
    height: "20px",
    width: "20px",
    backgroundColor: Colors.darkYellow,
  },
  colorMedical: {
    height: "20px",
    width: "20px",
    backgroundColor: Colors.redMedical,
  },
  colorWeekend: {
    height: "20px",
    width: "20px",
    backgroundColor: Colors.lightGreenWeekend,
  },
}));

/// grayGreenFreeDay :  days off
/// redCalendar : national days off
/// darkYellow : unpaid
/// lightGreenWeekend : weekends
/// redMEdical : medical
