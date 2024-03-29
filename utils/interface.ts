import { Dayjs } from "dayjs";
import { TICKET_PRIORITY, TICKET_TYPE } from "./ticketsInfo";

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
  companyId: string;
  createdOn: Date;
  freeDaysTotal: number;
  role: string;
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

export interface ICalendarAllProps {
  userId: string;
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

// export interface ITicketInfo {
//   id: string;
//   content: string;
//   asignee: string;
//   storyPoints: number;
//   title: string;
//   priority: number;
//   type: string;
// }

export interface IColumnsDrag {
  name: string;
  items: INewTicket[];
}

export type TEvent = {
  startDate: Dayjs;
  endDate: Dayjs;
  eventName: string;
  eventBgColor: string;
  eventTextColor: string;
  status: string;
};

export type TEventNotification = {
  startDate: Dayjs;
  endDate: Dayjs;
  eventName: string;
  eventBgColor: string;
  eventTextColor: string;
  status: string;
  uid: string;
  id: string;
};

export interface INewCompany {
  name: string;
  address: string;
  email: string;
}

export interface ITaskStatus {
  name: string;
  items: INewTicket[];
}

export interface IAsigneeDropdown {
  setPersonName: React.Dispatch<React.SetStateAction<string[]>>;
  personName: string[];
}

export interface INewProject {
  asigne: string[];
  projectDescription: string;
  projectLeader: string[];
  projectName: string;
  taskStatus: ITaskStatus[];
}

export interface IProject {
  id: string;
  asigne: string[];
  projectDescription: string;
  projectLeader: string[];
  projectName: string;
  taskStatus: ITaskStatus[];
  createdAt: Date;
  companyId: string;
}

export interface INewTicket {
  id: string;
  title: string;
  ticketType: string;
  priority: string;
  description: string;
  asigne: string;
  storyPoints: string;
}
