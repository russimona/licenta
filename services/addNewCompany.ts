import { db } from "@/core/firebaseApp";
import { INewCompany } from "@/utils/interface";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export const addNewCompany = async (props: INewCompany) => {
  const result = await addDoc(collection(db, "Companies"), {
    ...props,
  });

  const uid = sessionStorage.getItem("authToken") ?? "";
  const logggedUserRef = doc(db, "Users", uid);

  await updateDoc(logggedUserRef, {
    companyId: result.id,
  });
};
