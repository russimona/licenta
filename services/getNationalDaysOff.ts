import { db } from "@/core/firebaseApp";
import dayjs from "dayjs";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { TEvent } from "@/utils/interface";
const getNationalDaysService = async () => {
  const querySnapshot = await getDocs(collection(db, "NationalDaysOff"));
  const result: TEvent[] = [];

  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data() } as TEvent);
  });
  return result;
};

export default getNationalDaysService;
