import { db } from "@/core/firebaseApp";
import { doc, setDoc } from "firebase/firestore";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const sendUserData = (uid: string, data: UserData) => {
  setDoc(doc(db, "Users", uid), {
    ...data,
    createdOn: new Date(),
    firstTimeEntering: true,
  });
};
