import { db } from "@/core/firebaseApp";
import { collection, getDocs, query } from "firebase/firestore";
import { ILoggedUserData, IProject, ITaskStatus } from "@/utils/interface";
const getAllProjects = async () => {
  const q = query(collection(db, "Projects"));
  const result: IProject[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const projectLeader: string[] = [];
    const taskStatus: ITaskStatus[] = [];

    doc.data().projectLeader.forEach((item: string) => {
      projectLeader.push(item);
    });
    if (doc.data().taskStatus) {
      doc.data().taskStatus.forEach((item: ITaskStatus) => {
        taskStatus.push(item);
      });
    }

    result.push({
      id: doc.id,
      asigne: doc.data().asigne,
      projectDescription: doc.data().projectDescription,
      projectLeader: projectLeader,
      projectName: doc.data().projectName,
      taskStatus: taskStatus,
      createdAt: new Date(doc.data().createdAt),
    } as IProject);
  });

  return result;
};

export default getAllProjects;
