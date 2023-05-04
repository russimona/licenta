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
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  eventName: string;
  uid: string;
}
