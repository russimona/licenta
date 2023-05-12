import { Colors } from "@/utils/colors";
import React, { useEffect, useState } from "react";
import { ReactFullYearScheduler } from "react-full-year-scheduler";
import { TEvent } from "@/utils/interface";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getNationalDaysOff } from "@/redux/getNationalDaysOff/slice";
import { ICalendarProps } from "@/utils/interface";
import { getDaysOff } from "@/redux/getFreeDays/slice";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";

export const Calendar = (props: ICalendarProps) => {
  const stateSendReqDaysOff = useAppSelector(
    (state) => state.requestDaysOff.status
  );
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
    dispatch(getDaysOff());
  }, [dispatch]);

  useEffect(() => {
    if (stateSendReqDaysOff === ReduxThunkStatuses.FULFILLED) {
      dispatch(getDaysOff());
    }
  }, [dispatch, stateSendReqDaysOff]);

  useEffect(() => {
    if (daysOff.length) {
      const newEvent = [...nationalDaysOff, ...daysOff];
      setEvents(newEvent);
    }
  }, [daysOff, daysOffStatus, nationalDaysOff]);

  useEffect(() => {
    if (props.startDate?.date() && props.endDate?.date()) {
      const newEvents = [
        ...events,
        {
          startDate: props.startDate,
          endDate: props.endDate?.date() ? props.endDate : props.startDate,
          eventName: "Selected free days",
          eventBgColor: Colors.lavanderSelection,
          eventTextColor: "white",
        },
      ];
      setEvents(newEvents);
      sessionStorage.setItem("startDate", props.startDate.toString());
      sessionStorage.setItem("endDate", props.endDate.toString());
      props.setStartDate(null);
      props.setEndDate(null);
    }
  }, [props, events]);

  useEffect(() => {
    if (props.clearSelection) {
      const eventToRemove = events.pop();
      if (eventToRemove?.eventBgColor === Colors.lavanderSelection) {
        const newEvents = events.filter((item) => item !== eventToRemove);
        setEvents(newEvents);
        props.setClearSelection(false);
        sessionStorage.removeItem("startDate");
        sessionStorage.removeItem("endDate");
      }
    }
  }, [events, props, props.clearSelection]);

  return (
    <ReactFullYearScheduler
      events={events}
      locale="ro"
      dateTooltipTheme="material"
      weekSeparatorWidth={1}
      weekSeparatorColor="black"
      headerWeekDayBgColor={Colors.background}
      headerWeekendBgColor={Colors.turqoise}
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
      readonlyCalendar={false}
      showWeekSeparator={true}
      showTodayButton={true}
      enableYearToYearSelection={false}
      enableWeekendSelection={false}
      minCellWidth={50}
      showSeparatorInHeader={true}
      enableEventOverwriting={true}
      onDatePick={(eventDate, clearSelectedCel) => {
        props.setStartDate(eventDate);
      }}
      onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {}}
      onRangePick={(
        eventStartDate,
        eventEndDate,
        clearSecondSelectedCell,
        clearSelection
      ) => {
        props.setStartDate(eventStartDate);
        props.setEndDate(eventEndDate);
        clearSelection();
      }}
      onEventRangePickInterception={(
        eventFirstDate,
        eventLastDate,
        eventsToBeDeleted,
        eventsToBeUpdated,
        clearSecondSelectedCell,
        clearSelection
      ) => {
        props.setStartDate(eventFirstDate);
        props.setEndDate(eventLastDate);
        clearSelection();
      }}
    />
  );
};
