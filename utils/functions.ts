export const CalculateWeekendDays = (fromDate: Date, toDate: Date) => {
  var weekendDayCount = 0;

  while (fromDate < toDate) {
    fromDate.setDate(fromDate.getDate() + 1);
    if (fromDate.getDay() === 0 || fromDate.getDay() == 6) {
      ++weekendDayCount;
    }
  }
  return weekendDayCount;
};
