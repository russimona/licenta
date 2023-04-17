import { db } from "@/core/firebaseApp";
import { ISignUpData } from "@/utils/interface";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
export const signUp = async (props: ISignUpData) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, props.email, props.password)
    .then((userCredential) => {
      console.log(userCredential);
      setDoc(doc(db, "Users", userCredential.user.uid), {
        ...props,
        createdOn: new Date(),
        firstTimeEntering: true,
      });
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
