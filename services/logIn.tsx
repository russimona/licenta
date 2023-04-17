import { ILoginData } from "@/utils/interface";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export const logIn = async (props: ILoginData) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, props.email, props.password)
    .then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem("authToken", user.uid);
    })
    .catch((error) => {
      return error;
    });
};
