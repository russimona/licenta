import { useAppDispatch, useAppSelector } from "@/core/store";
import { getAllUserData } from "@/redux/getAllUsers/slice";
import { getDaysOff } from "@/redux/getFreeDays/slice";
import { getDaysOffNotification } from "@/redux/getFreeDaysNotification/slice";
import { Colors } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { TEventNotification } from "@/utils/interface";
import { updateFreeDaysRequest } from "@/redux/updateFreeDaysRequest/slice";
import { FREE_DAYS_STATUS } from "@/utils/freeDaysStatus";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
export const NotificationsMainPage = () => {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  const daysOff = useAppSelector(
    (state) => state.daysOffNotification.event
  ).filter((item) => item.status === FREE_DAYS_STATUS.PENDING);
  const user = useAppSelector((state) => state.allUsers.user);
  const uidDaysOffUsers = daysOff.map((item) => item.uid);
  const usersEmail = user.map((item) => {
    if (uidDaysOffUsers.includes(item.uid)) {
      return {
        email: item.email,
        uid: item.uid,
      };
    }
  });

  useEffect(() => {
    dispatch(getDaysOffNotification());
    dispatch(getAllUserData());
  }, [dispatch]);

  const approveHandler = (item: TEventNotification, email: string) => {
    dispatch(
      updateFreeDaysRequest({
        request: item,
        response: FREE_DAYS_STATUS.APPROVED,
        email: email,
      })
    );
    dispatch(getDaysOffNotification());
    // dispatch(getAllUserData());
    // dispatch(getDaysOff());
  };

  const declineHandler = (item: TEventNotification, email: string) => {
    dispatch(
      updateFreeDaysRequest({
        request: item,
        response: FREE_DAYS_STATUS.DENIED,
        email: email,
      })
    );
    dispatch(getDaysOffNotification());
    // dispatch(getAllUserData());
    // dispatch(getDaysOff());
    // dispatch(getLoggedUserData());
  };

  return (
    <div className={classes.background}>
      {" "}
      {daysOff.length !== 0 && (
        <div className={classes.box}>
          {daysOff &&
            daysOff.map((item, index) => (
              <Box key={index}>
                <Box className={classes.boxItem}>
                  <Box className={classes.boxInfo}>
                    <Typography variant="h4">
                      <span className={classes.bold}>
                        {
                          usersEmail.filter(
                            (itemU) => itemU?.uid === item.uid
                          )[0]?.email
                        }{" "}
                      </span>
                      requested{" "}
                      <span className={classes.bold}>
                        {item.eventName.toLowerCase()}
                      </span>{" "}
                      days off
                    </Typography>
                    <Typography variant="h4">
                      <span className={classes.bold}>Start date : </span>{" "}
                      {item.startDate.toDate().toUTCString()}
                    </Typography>
                    <Typography variant="h4">
                      <span className={classes.bold}>End date :</span>{" "}
                      {item.endDate.toDate().toUTCString()}
                    </Typography>
                  </Box>

                  <Box className={classes.boxButons}>
                    <Button
                      className={cx(
                        classes.buttonDecline,
                        classes.buttonDecline
                      )}
                      onClick={() => {
                        const email =
                          usersEmail.filter(
                            (itemU) => itemU?.uid === item.uid
                          )[0]?.email ?? "";
                        approveHandler(item, email);
                      }}
                    >
                      {" "}
                      <DoneIcon />
                      {STRINGS.APPROVE}
                    </Button>
                    <Button
                      className={cx(
                        classes.buttonApprove,
                        classes.buttonApprove
                      )}
                      onClick={() => {
                        const email =
                          usersEmail.filter(
                            (itemU) => itemU?.uid === item.uid
                          )[0]?.email ?? "";
                        declineHandler(item, email);
                      }}
                    >
                      <CloseIcon />
                      {STRINGS.DECLINE}
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
        </div>
      )}
      {daysOff.length === 0 && (
        <div className={classes.emptyBox}>
          <AssignmentTurnedInIcon className={classes.icon} />
          <Typography variant="h1" className={classes.typoCenter}>
            There are no free days request
          </Typography>
          <Typography variant="h3" className={classes.typoCenter}>
            Come back later
          </Typography>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles()((theme) => ({
  background: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    justifyItems: "center",
    rowGap: theme.spacing(3),
    alignItems: "center",
    overflow: "hidden",
  },
  box: {
    maxHeight: "calc(100vh - 100px)",
    minHeight: "fit-content",
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    width: "70vw",
    overflow: "auto",
    flexDirection: "column",
    justifyItems: "center",
    rowGap: theme.spacing(3),
    alignItems: "center",
    boxShadow: `10px 10px 10px 10px ${Colors.gray}`,
  },
  boxItem: {
    width: "60vw",
    height: "fit-content",
    background: Colors.lightGray,
    boxShadow: `2px 2px 10px 0px ${Colors.gray}`,
    padding: `${theme.spacing(1)} ${theme.spacing(10)} ${theme.spacing(
      1
    )} ${theme.spacing(10)}`,
    display: "flex",
    flexDirection: "row",
    columnGap: theme.spacing(10),
    overflow: "hidden",
  },
  boxInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "55vw",
    rowGap: theme.spacing(1),
  },
  boxButons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonApprove: {
    background: Colors.lightGreen,
    height: "fit-content",
  },
  buttonDecline: {
    background: Colors.redMedical,
  },
  bold: {
    fontWeight: "bold",
  },
  typoCenter: {
    textAlign: "center",
  },
  emptyBox: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    marginTop: "15vh",
    alignItems: "center",
  },
  icon: {
    color: Colors.background,
    height: "200px",
    width: "100px",
  },
}));
