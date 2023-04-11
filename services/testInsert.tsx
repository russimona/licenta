import { addDoc, collection } from "firebase/firestore";
import { db } from "@/core/firebaseApp";
import { ITestData } from "@/utils/interface";


export const insertTest = async (data: ITestData) => {
  
  console.log(data);
  try {
    return await addDoc(collection(db, "Test"), {
      ...data,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};


