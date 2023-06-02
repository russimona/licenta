import { db } from "@/core/firebaseApp";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const addNewMemberProjectService = async (props: {
  projectId: string;
  newMembers: string[];
}) => {
  const projectRef = doc(db, "Projects", props.projectId);
  props.newMembers.forEach(async (member) => {
    await updateDoc(projectRef, {
      asigne: arrayUnion(member),
    });
  });
};
