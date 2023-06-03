import { db } from "@/core/firebaseApp";
import { INewProject } from "@/utils/interface";
import { addDoc, collection } from "firebase/firestore";
export const addNewProject = async (props: INewProject) => {
  await addDoc(collection(db, "Projects"), {
    ...props,
    createdAt: new Date(),
    companyId: sessionStorage.getItem("companyId") ?? "",
  });
};
