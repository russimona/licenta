import { useAppSelector } from "@/core/store";
import { TEvent } from "@/utils/interface";

export const calculateWorkingDays = (
  startDate: Date,
  endDate: Date,
  nationalDaysOff: TEvent[]
) => {
  const Difference_In_Time = endDate.getTime() - startDate.getTime();
  const totalDays = Difference_In_Time / (1000 * 3600 * 24) + 1;
  const daysMatchesNationalDaysOff = calculateNationalDaysOff(
    startDate,
    endDate,
    nationalDaysOff
  );
  const weekendDayCount = calculateWekendDays(startDate, endDate);
  return totalDays - daysMatchesNationalDaysOff - weekendDayCount;
};

const calculateWekendDays = (startDate: Date, endDate: Date) => {
  let weekendDayCount = 0;
  while (startDate < endDate) {
    startDate.setDate(startDate.getDate() + 1);
    if (startDate.getDay() === 0 || startDate.getDay() == 6) {
      ++weekendDayCount;
    }
  }
  return weekendDayCount;
};

const calculateNationalDaysOff = (
  startDate: Date,
  endDate: Date,
  nationalDaysOff: TEvent[]
) => {
  let daysMatchesNationalDaysOff = 0;
  nationalDaysOff.forEach((event) => {
    if (
      event.endDate.toDate() <= endDate &&
      event.startDate.toDate() >= startDate
    ) {
      for (
        let index = event.startDate.toDate();
        index <= event.endDate.toDate();
        index.setDate(index.getDate() + 1)
      ) {
        if (index.getDay() !== 0 && index.getDay() !== 6)
          daysMatchesNationalDaysOff = daysMatchesNationalDaysOff + 1;
      }
    }
  });

  return daysMatchesNationalDaysOff;
};

export const remainingDaysOff = (
  daysOff: TEvent[],
  nationalDaysOff: TEvent[]
) => {
  let takenDaysOff = 0;
  daysOff.forEach((item) => {
    takenDaysOff =
      takenDaysOff +
      calculateWorkingDays(
        item.startDate.toDate(),
        item.endDate.toDate(),
        nationalDaysOff
      );
  });

  return takenDaysOff;
};
