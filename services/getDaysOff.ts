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
import { TEvent } from "@/utils/interface";
const getDaysOff = async () => {
  const uid = sessionStorage.getItem("authToken") ?? "";
  const q = query(collection(db, "FreeDays"), where("uid", "==", uid));
  const result: TEvent[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data() } as TEvent);
  });

  return result;
};

export default getDaysOff;
