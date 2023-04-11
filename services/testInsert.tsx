import { addDoc, collection } from "firebase/firestore";
import { db } from "@/core/firebaseApp";

export interface TestData {
  email: string;
  testText: string;
}

export const insertTest = async (data: TestData) => {
  try {
    return await addDoc(collection(db, "Test"), {
      ...data,
      date: new Date(),
    });
  } catch (e) {
    return e;
  }
};
