import React from "react";
import Image from "next/dist/client/image";
// import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "tss-react/mui";
import { ITicketInfo, ITicketItem } from "@/utils/interface";
import { Colors } from "@/utils/colors";
import { Typography } from "@mui/material";
import { PRIORYYTY_COLORS } from "@/utils/priorityColors";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

export const CardItem = (props: { data: ITicketInfo; index: number }) => {
  const { classes } = useStyles({ ticketType: props.index });

  return (
    <div className={classes.box}>
      <div className={classes.flexRow}>
        <div className={classes.priority}>High priority</div>
        <div className={classes.assigne}>AM</div>
      </div>
      <Typography variant="h5" className={classes.title}>
        {props.data.title}
      </Typography>

      <div className={classes.boxStoryPoints}>
        <LabelImportantIcon className={classes.icon} />
        <div className={classes.storyPoints}>9</div>
      </div>
    </div>
  );
};

const useStyles = makeStyles<{ ticketType: number }>()(
  (theme, { ticketType }) => ({
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: Colors.white,
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      width: "300px",
      height: "fit-content",
      border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
      borderRadius: theme.spacing(1),
      boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
    },
    title: {
      textAlign: "center",
    },
    assigne: {
      height: "fit-content",
      width: "fit-content",
      background: Colors.lightGreenWeekend,
      borderRadius: theme.spacing(10),
      padding: "4px",
      textAlign: "center",
      paddingTop: "3px",
      boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
    },
    storyPoints: {
      height: "20px",
      width: "20px",
      borderRadius: `${theme.spacing(1)} ${theme.spacing(5)} ${theme.spacing(
        5
      )} ${theme.spacing(5)}`,
      textAlign: "center",
    },
    priority: {
      background: `linear-gradient(to right,${
        PRIORYYTY_COLORS[ticketType % 3]
      })`,
      height: "fit-content",
      width: "fit-content",
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)} ${theme.spacing(
        0.5
      )} ${theme.spacing(1)}`,
      color: theme.palette.common.white,
      fontWeight: "bold",
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    flexRow: {
      display: "flex",
      justifyContent: "row",
      columnGap: theme.spacing(17),
      marginBottom: theme.spacing(2),
    },
    boxStoryPoints: {
      display: "flex",
      flexDirection: "row",
      background: theme.palette.secondary.light,
      width: "fit-content",
      borderRadius: theme.spacing(2),
      boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
      marginTop: theme.spacing(4),
    },
    icon: {
      height: "20px",
      width: "30px",
      marginTop: "3px",
      marginRight: "-7px",
    },
  })
);
