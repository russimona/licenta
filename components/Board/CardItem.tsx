import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { INewTicket } from "@/utils/interface";
import { Colors } from "@/utils/colors";
import { Typography } from "@mui/material";
import { PRIORITY_CODE, PRIORYYTY_COLORS } from "@/utils/priorityColors";
import BugReportIcon from "@mui/icons-material/BugReport";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { TICKET_PRIORITY, TICKET_TYPE } from "@/utils/ticketsInfo";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getAllUserData } from "@/redux/getAllUsers/slice";

export const CardItem = (props: {
  data: INewTicket;
  index: number;
  numberColumns: number;
}) => {
  const [ticketType, setTicketType] = useState<number>(
    PRIORITY_CODE.LOW_PRIORITY
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.allUsers.user).filter((user) =>
    user.uid.match(props.data.asigne)
  )[0];

  useEffect(() => {
    dispatch(getAllUserData());
    switch (props.data.priority) {
      case TICKET_PRIORITY.LOW_PRIORITY:
        setTicketType(PRIORITY_CODE.LOW_PRIORITY);
        break;
      case TICKET_PRIORITY.MEDIUM_PRIORITY:
        setTicketType(PRIORITY_CODE.MEDIUM_PRIORITY);
        break;
      default:
        setTicketType(PRIORITY_CODE.HIGH_PRIORITY);
        break;
    }
  }, [props.data.priority, dispatch]);

  const { classes, cx } = useStyles({
    ticketType: ticketType,
    numberColumns: props.numberColumns,
  });

  return (
    <div className={classes.box}>
      <div className={classes.flexRow}>
        <Typography variant="body2" className={classes.priority}>
          {props.data.priority === TICKET_PRIORITY.HIGH_PRIORITY &&
            "High priority"}
          {props.data.priority === TICKET_PRIORITY.MEDIUM_PRIORITY &&
            "Medium priority"}
          {props.data.priority === TICKET_PRIORITY.LOW_PRIORITY &&
            "Low priority"}
        </Typography>
      </div>
      <Typography variant="h5" className={classes.title}>
        {props.data.title}
      </Typography>

      <div className={classes.boxBottom}>
        <Typography variant="h5" className={classes.storyPoints}>
          {props.data.storyPoints}
        </Typography>
        <div className={classes.flexRow}>
          {props.data.ticketType === TICKET_TYPE.BUG && (
            <BugReportIcon className={cx(classes.icons, classes.bugIcon)} />
          )}
          {props.data.ticketType === TICKET_TYPE.FEAT && (
            <BookmarkIcon className={cx(classes.icons, classes.featureIcon)} />
          )}
          {props.data.ticketType === TICKET_TYPE.REFACTOR && (
            <SettingsSuggestIcon
              className={cx(classes.icons, classes.featureIcon)}
            />
          )}

          <Typography variant="body1" className={classes.ticketName}>
            {props.data.ticketType}-{props.data.id}
          </Typography>
        </div>
        <div className={classes.assigne}>
          <Typography>
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles<{ ticketType: number; numberColumns: number }>()(
  (theme, { ticketType, numberColumns }) => ({
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: Colors.white,
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      width: `${90 / numberColumns}vw`,
      height: "fit-content",
      border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
      boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
    },
    title: {
      textAlign: "center",
    },
    assigne: {
      height: "fit-content",
      width: "fit-content",
      background: Colors.darkYellow,
      borderRadius: theme.spacing(10),
      padding: "4px",
      textAlign: "center",
      paddingTop: "3px",
      float: "right",
      marginTop: theme.spacing(-4.6),
      fontSize: theme.typography.body2.fontSize,
    },
    storyPoints: {
      height: "30px",
      width: "30px",
      borderRadius: theme.spacing(5),
      textAlign: "center",
      marginTop: theme.spacing(1),
      background: Colors.gray,
      color: theme.palette.common.black,
      display: "flex",
      justifyContent: "center",
      paddingTop: "5px",
    },
    priority: {
      background: `linear-gradient(to right,${PRIORYYTY_COLORS[ticketType]})`,
      height: "fit-content",
      width: "fit-content",
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)} ${theme.spacing(
        0.5
      )} ${theme.spacing(1)}`,
      color: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    flexRow: {
      display: "flex",
      justifyContent: "row",
      marginBottom: theme.spacing(1),
    },
    boxBottom: {
      width: "100%",
    },
    icons: {
      height: "20px",
      width: "20px",
      justifyContent: "center",
      marginTop: theme.spacing(1.5),
    },
    bugIcon: {
      color: Colors.redCalendar,
    },
    featureIcon: {
      color: Colors.lightGreen,
    },
    ticketName: {
      marginTop: theme.spacing(1.6),
    },
  })
);
