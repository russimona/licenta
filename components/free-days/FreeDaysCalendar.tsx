import { Colors } from "@/utils/colors";
import React, { useEffect, useState } from "react";
import { ReactFullYearScheduler } from "react-full-year-scheduler";
import { TEvent } from "react-full-year-scheduler/dist/lib/utils/types";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { addNationalDaysOff } from "@/redux/addNationalDaysOff/slice";
import { getNationalDaysOff } from "@/redux/getNationalDaysOff/slice";
import { ICalendarProps } from "@/utils/interface";
import { DAYS_OFF } from "@/utils/daysOffType";

export const Calendar = (props: ICalendarProps) => {
  const [events, setEvents] = useState<TEvent[]>([]);

  const nationalDaysOff = useAppSelector(
    (state) => state.nationalDaysOff.event
  );
  useEffect(() => {
    setEvents((state) => [...state, ...nationalDaysOff]);
  }, [nationalDaysOff]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNationalDaysOff());
  }, [dispatch]);

  useEffect(() => {
    // setEvents((state) => [
    //   ...state,
    //   {
    //     startDate: props.startDate,
    //     endDate: props.endDate ? props.endDate : props.startDate,
    //     eventName: "Selected free days",
    //     eventBgColor: Colors.lavanderSelection,
    //     eventTextColor: "white",
    //   },
    // ]);
    console.log(props.startDate?.date(), props.endDate?.date());
  }, [props.startDate, props.endDate]);

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
      minRangeSelection={1}
      firstDayOfWeek="Monday"
      maxYear={2023}
      minYear={2022}
      readonlyCalendar={false}
      showWeekSeparator={true}
      showTodayButton={false}
      enableYearToYearSelection={false}
      enableWeekendSelection={false}
      minCellWidth={50}
      showSeparatorInHeader={false}
      enableEventOverwriting={true}
      onDatePick={(eventDate, clearSelectedCel) => {
        // console.log("start date", eventDate.date());
        props.setStartDate(eventDate);
      }}
      onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {}}
      onRangePick={(
        eventStartDate,
        eventEndDate,
        clearSecondSelectedCell,
        clearSelection
      ) => {
        // console.log("start date", eventStartDate.date());
        // console.log("end date", eventEndDate.date());
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
        // console.log("start date", eventFirstDate.date());
        // console.log("end date", eventLastDate.date());
        props.setStartDate(eventFirstDate);
        props.setEndDate(eventLastDate);
        clearSelection();
      }}
    />
  );
};

/// grayGreenFreeDay :  days off
/// redCalendar : national days off
/// darkYellow : unpaid
/// lightGreenWeekend : weekends
/// redMEdical : medical
