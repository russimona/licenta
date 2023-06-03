import { db } from "@/core/firebaseApp";
import dayjs from "dayjs";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { TEvent } from "@/utils/interface";
import { FREE_DAYS_STATUS } from "@/utils/freeDaysStatus";
const getNationalDaysService = async () => {
  const querySnapshot = await getDocs(collection(db, "NationalDaysOff"));
  const result: TEvent[] = [];

  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), status: FREE_DAYS_STATUS.APPROVED } as TEvent);
  });
  return result;
};

export default getNationalDaysService;
