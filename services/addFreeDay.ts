import { db } from "@/core/firebaseApp";
import { Colors } from "@/utils/colors";
import { IAddFreeDays } from "@/utils/interface";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { TEvent } from "@/utils/interface";
export const addFreeDays = async (props: IAddFreeDays) => {
  await addDoc(collection(db, "FreeDays"), {
    ...props,
  });
};
