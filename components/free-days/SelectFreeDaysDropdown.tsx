import { useAppDispatch } from "@/core/store";
import { addFreeDays } from "@/redux/addFreeDays/slice";
import { DAYS_OFF } from "@/utils/daysOffType";
import { ISelectFreeDaysDropdownProps } from "@/utils/interface";
import { STRINGS } from "@/utils/strings";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";

export const SelectFreeDaysDropdown = (props: ISelectFreeDaysDropdownProps) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [freeDaysType, setFreeDaysType] = useState<string>(DAYS_OFF.VACANTION);

  const sendFreeDaysReq = () => {
    props.setSendFreeDaysReq(true);
    // dispatch(
    //   addFreeDays({
    //     startDate: props.startDate,
    //     endDate: props.endDate,
    //     eventName: freeDaysType,
    //     uid: sessionStorage.getItem("authToken") ?? "",
    //   })
    // );
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
