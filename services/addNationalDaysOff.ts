import { db } from "@/core/firebaseApp";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { TEvent } from "react-full-year-scheduler/dist/lib/utils/types";

export const addNationalDays = async (props: TEvent) => {
  await addDoc(collection(db, "NationalDaysOff"), {
    endDate: props.endDate.toDate().toUTCString(),
    startDate: props.startDate.toDate().toUTCString(),
    eventName: props.eventName,
    eventBgColor: props.eventBgColor,
    textColor: props.eventTextColor,
  });
};
