import { useAppSelector } from "@/core/store";
import {
  IColumnsDrag,
  ILoggedUserData,
  ITaskStatus,
  TEvent,
} from "@/utils/interface";
import { DropResult } from "react-beautiful-dnd";

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

export const numberTasks = (taskStatus: ITaskStatus[]) => {
  let higherId = 0 as number;

  taskStatus.forEach((status) => {
    status.items.forEach((ticket) => {
      if (Number(ticket.id) > higherId) higherId = Number(ticket.id);
    });
  });

  return higherId;
};

export const onDragEnd = (
  result: DropResult,
  columns: IColumnsDrag[],
  setColumns: React.Dispatch<React.SetStateAction<IColumnsDrag[]>>,
  allUsers: ILoggedUserData[]
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[parseInt(source.droppableId)];
    const destColumn = columns[parseInt(destination.droppableId)];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    const from = sourceColumn.name;
    const to = destColumn.name;
    const userAssigned = allUsers.filter(
      (user) => user.uid === removed.asigne
    )[0];
    const uid = sessionStorage.getItem("authToken") ?? "";
    const email = sessionStorage.getItem("email") ?? "";
    if (uid !== removed.asigne) {
      fetch(
        `https://us-central1-workease-2cf93.cloudfunctions.net/sendMail?subject=Updated ticket&text=Ticket number ${removed.id} have been moved from ${from} to ${to} by ${email}.&to=${userAssigned.email}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "your-rapid-key",
            "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
          },
        }
      );
    }

    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[parseInt(source.droppableId)];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
