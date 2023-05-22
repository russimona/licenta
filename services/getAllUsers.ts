import { db } from "@/core/firebaseApp";
import { collection, getDocs, query } from "firebase/firestore";
import { ILoggedUserData } from "@/utils/interface";
const getAllUsers = async () => {
  const q = query(collection(db, "Users"));
  const result: ILoggedUserData[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push({
      uid: doc.id,
      email: doc.data().email,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      firstTimeEntering: doc.data().firstTimeEntering,
      companyId: doc.data().companyId,
      createdOn: new Date(doc.data().createdOn),
      freeDaysTotal: doc.data().freeDaysTotal,
      role: doc.data().role,
    } as ILoggedUserData);
  });

  return result;
};

export default getAllUsers;
