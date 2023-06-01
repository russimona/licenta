import { db } from "@/core/firebaseApp";
import { INewTicket } from "@/utils/interface";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const updateTicketStatusService = async (props: {
  projectId: string;
  task: INewTicket;
}) => {
  const projRef = doc(db, "Projects", props.projectId);
  const data = await getDoc(projRef);
  const taskStatus = [...data?.data()?.taskStatus];
  taskStatus[0].items = [...taskStatus[0].items, props.task];
  return await updateDoc(projRef, {
    taskStatus: taskStatus,
  });
};
