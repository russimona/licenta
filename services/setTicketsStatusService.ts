import { db } from "@/core/firebaseApp";
import { ITaskStatus } from "@/utils/interface";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const setTicketsStatusService = async (props: {
  projectId: string;
  tasks: ITaskStatus[];
}) => {
  const projRef = doc(db, "Projects", props.projectId);
  const data = await getDoc(projRef);

  return await updateDoc(projRef, {
    taskStatus: props.tasks,
  });
};
