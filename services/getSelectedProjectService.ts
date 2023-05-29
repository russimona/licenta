import { db } from "@/core/firebaseApp";
import { IProject } from "@/utils/interface";
import { STRINGS } from "@/utils/strings";
import { doc, getDoc } from "firebase/firestore";
const getSelectedProjectService = async (props: { projectId: string }) => {
  console.log("hgfdp", props.projectId);

  const docRef = doc(db, "Projects", props.projectId);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data());

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data() as IProject;
  }
};

export default getSelectedProjectService;
