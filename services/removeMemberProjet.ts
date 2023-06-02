import { db } from "@/core/firebaseApp";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

export const removeMemberProjectService = async (props: {
  projectId: string;
  members: string[];
}) => {
  const projectRef = doc(db, "Projects", props.projectId);
  props.members.forEach(async (member) => {
    await updateDoc(projectRef, {
      asigne: arrayRemove(member),
    });
  });
};
