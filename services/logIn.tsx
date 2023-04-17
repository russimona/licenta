import { db } from "@/core/firebaseApp";
import { ILoginData } from "@/utils/interface";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const logIn = async (props: ILoginData) => {
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, props.email, props.password)
    .then(async (userCredential) => {
      const loggedUserRef = doc(db, "Users", userCredential.user.uid);
      await updateDoc(loggedUserRef, {
        firstTimeEntering: false,
      });
      const user = userCredential.user;
      sessionStorage.setItem("authToken", user.uid);
    })
    .catch((error) => {
      return error;
    });
};
