import { db } from "@/core/firebaseApp";
import { STRINGS } from "@/utils/strings";
import { doc, getDoc } from "firebase/firestore";
interface IInvitedUSerData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  companyId: string;
  role: string;
  numberOfFreeDays: number;
}
const getInvitedUserDataService = async (uid: string) => {
  const docRef = doc(db, "UsersRequestedToJoinTeam", uid ?? "");

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data());

    return {
      ...docSnap.data(),
      uid: docSnap.id,
    } as IInvitedUSerData;
  } else {
    throw STRINGS.DOCUMENT_NOT_FOUND;
  }
};

export default getInvitedUserDataService;
