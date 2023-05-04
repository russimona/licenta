import { useAppSelector } from "@/core/store";
import { TEvent } from "react-full-year-scheduler/dist/lib/utils/types";

export const calculateWorkingDays = (
  startDate: Date,
  endDate: Date,
  nationalDaysOff: TEvent[]
) => {
  let weekendDayCount = 0;
  while (startDate < endDate) {
    startDate.setDate(startDate.getDate() + 1);
    if (startDate.getDay() === 0 || startDate.getDay() == 6) {
      ++weekendDayCount;
    }
  }
  console.log("weekendDayCount", weekendDayCount);
  // const totalDays = new Date(endDate).getTime() - new Date(startDate).getTime();

  var Difference_In_Time = endDate.getTime() - startDate.getTime();

  // To calculate the no. of days between two dates
  const totalDays = Difference_In_Time / (1000 * 3600 * 24);
  console.log("totalDays", endDate, "asdfgh", startDate);

  let daysMatchesNationalDaysOff = 0;
  nationalDaysOff.forEach((event) => {
    if (
      event.endDate.toDate() >= endDate &&
      event.startDate.toDate() <= startDate
    ) {
      daysMatchesNationalDaysOff =
        event.endDate.toDate().getTime() - event.startDate.toDate().getTime();
    }
  });
  return totalDays - daysMatchesNationalDaysOff - weekendDayCount;
};
