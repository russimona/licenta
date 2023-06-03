import { db } from "@/core/firebaseApp";
import dayjs from "dayjs";

import { collection, getDocs, query, where } from "firebase/firestore";
import { TEvent } from "@/utils/interface";
import { FREE_DAYS_STATUS } from "@/utils/freeDaysStatus";

const getDaysOff = async () => {
  const uid = sessionStorage.getItem("authToken") ?? "";
  const q = query(collection(db, "FreeDays"), where("uid", "==", uid));
  const result: TEvent[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.data().status !== FREE_DAYS_STATUS.DENIED)
      result.push({ ...doc.data() } as TEvent);
  });

  return result;
};

export default getDaysOff;
