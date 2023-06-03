import { db } from "@/core/firebaseApp";
import { ISignUpData } from "@/utils/interface";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
export interface IJoinTeam {
  email: string;
  password: string;
  companyId: string;
  firstName: string;
  lastName: string;
  freeDaysTotal: number;
  role: string;
}
export const joinTeamSignUpService = async (props: IJoinTeam) => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, props.email, props.password)
    .then((userCredential) => {
      setDoc(doc(db, "Users", userCredential.user.uid), {
        ...props,
        createdOn: new Date(),
        firstTimeEntering: false,
      });
    })
    .catch((error) => {
      return error;
    });
};
