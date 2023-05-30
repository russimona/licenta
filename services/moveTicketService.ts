import { db } from "@/core/firebaseApp";
import { INewTicket, ITaskStatus } from "@/utils/interface";
import { doc, updateDoc } from "firebase/firestore";

export const moveTicketService = async (props: {
  projectId: string;
  task: ITaskStatus[];
}) => {
  const projRef = doc(db, "Projects", props.projectId);
  const taskStatus = Object.values(props.task);

  console.log(taskStatus);

  return await updateDoc(projRef, {
    taskStatus: taskStatus,
  });
};
