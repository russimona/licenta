import { Colors } from "@/utils/colors";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ReactFullYearScheduler } from "react-full-year-scheduler";
import { TEvent } from "react-full-year-scheduler/dist/lib/utils/types";

export const Calendar = () => {
  const [events, setEvents] = useState<TEvent[]>([
    {
      eventName: "event 1",
      startDate: dayjs("2023-01-02"),
      endDate: dayjs("2023-03-02"),
      eventBgColor: Colors.darkYellow,
      eventTextColor: "white",
    },
    {
      eventName: "event 2",
      startDate: dayjs("2023-04-01"),
      endDate: dayjs("2023-04-30"),
      eventBgColor: Colors.grayGreenFreeDay,
      eventTextColor: "white",
    },
    {
      eventName: "event 3",
      startDate: dayjs("2023-05-01"),
      endDate: dayjs("2023-05-29"),
      eventBgColor: Colors.redMedical,
      eventTextColor: "white",
    },
    {
      eventName: "event 4",
      startDate: dayjs("2023-06-02"),
      endDate: dayjs("2023-06-02"),
      eventBgColor: Colors.redCalendar,
      eventTextColor: "white",
    },
  ]);

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
      maxRangeSelection={25}
      minRangeSelection={1}
      firstDayOfWeek="Monday"
      maxYear={2023}
      minYear={2020}
      readonlyCalendar={false}
      showWeekSeparator={true}
      showTodayButton={false}
      enableYearToYearSelection={false}
      enableWeekendSelection={false}
      minCellWidth={50}
      showSeparatorInHeader={false}
      enableEventOverwriting={true}
      onDatePick={(eventDate, clearSelectedCell) => {
        console.log(eventDate.toDate());
      }}
      onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {
        console.table([eventName, date.toDate()]);
      }}
      onRangePick={(
        eventStartDate,
        eventEndDate,
        clearSecondSelectedCell,
        clearSelection
      ) => {
        setTimeout(() => {
          clearSelection();
        }, 3000);
      }}
      onEventRangePickInterception={(
        eventFirstDate,
        eventLastDate,
        eventsToBeDeleted,
        eventsToBeUpdated,
        clearSecondSelectedCell,
        clearSelection
      ) => {
        setTimeout(() => {
          clearSelection();
        }, 3000);
      }}
    />
  );
};

/// grayGreenFreeDay :  days off
/// redCalendar : national days off
/// darkYellow : unpaid
/// lightGreenWeekend : weekends
/// redMEdical : medical
