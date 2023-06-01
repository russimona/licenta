import { db } from "@/core/firebaseApp";
import { INewTicket, ITaskStatus } from "@/utils/interface";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const editTicketService = async (props: {
  projectId: string;
  task: ITaskStatus[];
}) => {
  const projRef = doc(db, "Projects", props.projectId);
  const taskStatus = Object.values(props.task);

  return await updateDoc(projRef, {
    taskStatus: taskStatus,
  });
};
