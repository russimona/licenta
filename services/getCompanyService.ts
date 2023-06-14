import { db } from "@/core/firebaseApp";
import { STRINGS } from "@/utils/strings";
import { doc, getDoc } from "firebase/firestore";

const getCompanyService = async (id: string) => {
  const docRef = doc(db, "Companies", id ?? "");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw STRINGS.DOCUMENT_NOT_FOUND;
  }
};

export default getCompanyService;
