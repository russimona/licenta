import { db } from "@/core/firebaseApp";
import dayjs from "dayjs";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { TEvent, TEventNotification } from "@/utils/interface";
import { FREE_DAYS_STATUS } from "@/utils/freeDaysStatus";

const getDaysOffNotificationService = async () => {
  const q = query(
    collection(db, "FreeDays")
    // where("status", "==", FREE_DAYS_STATUS.PENDING)
  );
  const result: TEventNotification[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id } as TEventNotification);
  });

  return result;
};

export default getDaysOffNotificationService;
