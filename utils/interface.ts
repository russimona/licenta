import { Dayjs } from "dayjs";

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignUpData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IResetPasswordData {
  email: string;
}

export interface ILoggedUserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  firstTimeEntering: boolean;
}

export interface ISelectFreeDaysDropdownProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setClearSelection: React.Dispatch<React.SetStateAction<boolean>>;
  setSendFreeDaysReq: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICalendarProps {
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  clearSelection: boolean;
  sendFreeDaysReq: boolean;
  setClearSelection: React.Dispatch<React.SetStateAction<boolean>>;
  setSendFreeDaysReq: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface IAddFreeDays {
  startDate: string;
  endDate: string;
  eventName: string;
  uid: string;
  eventBgColor: string;
  eventTextColor: string;
}

export interface ICardItem {
  name: string;
  items: {
    id: string;
    priority: number;
    title: string;
    chat: number;
    attachment: number;
    assignees: {
      avt: string;
    }[];
  }[];
}

export interface ITicketItem {
  id: string;
  priority: number;
  title: string;
  chat: number;
  attachment: number;
  assignees: {
    avt: string;
  }[];
}

export interface ITicketInfo {
  id: string;
  content: string;
  asignee: string;
  storyPoints: number;
  title: string;
}

export interface IColumnsDrag {
  droppableId: string;
  requested: {
    name: string;
    items: ITicketInfo[];
  };
  toDo: {
    name: string;
    items: ITicketInfo[];
  };
  inProgress: {
    name: string;
    items: ITicketInfo[];
  };
  done: {
    name: string;
    items: ITicketInfo[];
  };
}
