import { Colors } from "@/utils/colors";
import React, { useEffect, useState } from "react";
import { ReactFullYearScheduler } from "react-full-year-scheduler";
import { ICalendarAllProps, TEvent } from "@/utils/interface";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getNationalDaysOff } from "@/redux/getNationalDaysOff/slice";
import { getDaysOff } from "@/redux/getFreeDays/slice";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";

export const CalendarAll = (props: ICalendarAllProps) => {
  const stateSendReqDaysOff = useAppSelector(
    (state) => state.requestDaysOff.status
  );
  const uid = sessionStorage.getItem("authToken") ?? "";

  const dispatch = useAppDispatch();
  const nationalDaysOff = useAppSelector(
    (state) => state.nationalDaysOff.event
  );
  const daysOff = useAppSelector((state) => state.daysOff.event);
  const daysOffStatus = useAppSelector((state) => state.daysOff.status);
  const [events, setEvents] = useState<TEvent[]>([
    ...nationalDaysOff,
    ...daysOff,
  ]);

  useEffect(() => {
    dispatch(getNationalDaysOff());
    dispatch(getDaysOff(props.userId));
  }, [dispatch, props.userId]);

  useEffect(() => {
    if (stateSendReqDaysOff === ReduxThunkStatuses.FULFILLED) {
      dispatch(getDaysOff(props.userId));
    }
  }, [dispatch, stateSendReqDaysOff, props.userId]);

  useEffect(() => {
    if (daysOff.length) {
      const newEvent = [...nationalDaysOff, ...daysOff];
      setEvents(newEvent);
    }
  }, [daysOff, daysOffStatus, nationalDaysOff]);

  return (
    <ReactFullYearScheduler
      events={events}
      locale="ro"
      dateTooltipTheme="light-border"
      weekSeparatorWidth={1}
      weekSeparatorColor="black"
      headerWeekDayBgColor={Colors.background}
      headerWeekendBgColor={Colors.lightGreenWeekend}
      weekendCellBackgroundColor={Colors.lightGreenWeekend}
      weekendCellTextColor="white"
      weekDayCellBackgroundColor={Colors.black}
      weekDayCellTextColor="white"
      monthNameBackgroundColor={Colors.background}
      monthNameTextColor="white"
      selectionColor={Colors.lavanderSelection}
      selectionTextColor="white"
      maxRangeSelection={100}
      minRangeSelection={0}
      firstDayOfWeek="Monday"
      maxYear={2023}
      minYear={2022}
      readonlyCalendar={true}
      showWeekSeparator={true}
      showTodayButton={true}
      enableYearToYearSelection={false}
      enableWeekendSelection={false}
      minCellWidth={50}
      showSeparatorInHeader={true}
      enableEventOverwriting={true}
    />
  );
};
