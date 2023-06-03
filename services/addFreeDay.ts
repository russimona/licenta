import { db } from "@/core/firebaseApp";
import { Colors } from "@/utils/colors";
import { IAddFreeDays } from "@/utils/interface";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { TEvent } from "@/utils/interface";
import { FREE_DAYS_STATUS } from "@/utils/freeDaysStatus";
export const addFreeDays = async (props: {
  newReq: IAddFreeDays;
  hrEmail: string[];
}) => {
  props.hrEmail.forEach((email) => {
    fetch(
      `https://us-central1-workease-2cf93.cloudfunctions.net/sendMail?subject=New free day request&text=You have a new free days request. Check it here ${window?.location.href.replace(
        window.location.pathname,
        ""
      )}/team/notifications&to=${email}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "your-rapid-key",
          "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
        },
      }
    );
  });
  addDoc(collection(db, "FreeDays"), {
    ...props.newReq,
    status: FREE_DAYS_STATUS.PENDING,
  });
};
