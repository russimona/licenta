import { useAppDispatch, useAppSelector } from "@/core/store";
import { addFreeDays } from "@/redux/addFreeDays/slice";
import { Colors } from "@/utils/colors";
import { DAYS_OFF } from "@/utils/daysOffType";
import { calculateWorkingDays } from "@/utils/functions";
import { ISelectFreeDaysDropdownProps } from "@/utils/interface";
import { STRINGS } from "@/utils/strings";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";

export const SelectFreeDaysDropdown = (props: ISelectFreeDaysDropdownProps) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [freeDaysType, setFreeDaysType] = useState<string>(DAYS_OFF.VACANTION);
  const totalDaysOff = useAppSelector(
    (state) => state.loggedUser.user.freeDaysTotal
  );
  const nationalDaysOff = useAppSelector(
    (state) => state.nationalDaysOff.event
  );

  const sendFreeDaysReq = () => {
    props.setSendFreeDaysReq(true);
    const startDate = sessionStorage.getItem("startDate") ?? "";
    const endDate = sessionStorage.getItem("endDate") ?? "";
    let eventBgColor;
    console.log(freeDaysType);

    switch (freeDaysType) {
      case DAYS_OFF.VACANTION:
        eventBgColor = Colors.grayGreenFreeDay;
        break;
      case DAYS_OFF.SICK:
        eventBgColor = Colors.redCalendar;
        break;
      default:
        eventBgColor = Colors.darkYellow;
        break;
    }
    if (startDate.length && endDate.length)
      dispatch(
        addFreeDays({
          startDate: startDate,
          endDate: endDate,
          eventName: freeDaysType,
          uid: sessionStorage.getItem("authToken") ?? "",
          eventBgColor: eventBgColor,
          eventTextColor: "white",
        })
      );
    sessionStorage.removeItem("startDate");
    sessionStorage.removeItem("endDate");
  };

  const sendClearReq = () => {
    props.setClearSelection(true);
  };

  return (
    <div className={classes.box}>
      <FormControl className={classes.selectFreeDay}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {STRINGS.SELECT_TYPE_OF_FREE_DAYS}
        </InputLabel>
        <NativeSelect
          defaultValue={DAYS_OFF.VACANTION}
          inputProps={{
            name: "FREE DAYS",
            id: "uncontrolled-native",
          }}
          onChange={(event) => {
            setFreeDaysType(event.target.value);
          }}
        >
          <option value={DAYS_OFF.VACANTION}>{STRINGS.VACANTION}</option>
          <option value={DAYS_OFF.UNPAID}>{STRINGS.UNPAID}</option>
          <option value={DAYS_OFF.SICK}>{STRINGS.SICK}</option>
        </NativeSelect>
      </FormControl>
      <button className={classes.button} onClick={sendFreeDaysReq}>
        {STRINGS.SEND_FREE_DAYS_REQUEST}
      </button>
      <button className={classes.button} onClick={sendClearReq}>
        {STRINGS.CLEAR}
      </button>
    </div>
  );
};

const useStyles = makeStyles()((theme) => ({
  selectFreeDay: {
    width: "30vw",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    columnGap: theme.spacing(5),
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    padding: `${theme.spacing(0.5)} ${theme.spacing(5)} ${theme.spacing(
      0.5
    )} ${theme.spacing(5)} `,
    fontSize: "16px",
    borderRadius: "5px",

    ":hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.light,
    },
  },
}));
