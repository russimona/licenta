import { db } from "@/core/firebaseApp";
import { IProject } from "@/utils/interface";
import { STRINGS } from "@/utils/strings";
import { doc, getDoc } from "firebase/firestore";
const getSelectedProjectService = async (props: { projectId: string }) => {
  const docRef = doc(db, "Projects", props.projectId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IProject;
  }
};

export default getSelectedProjectService;
