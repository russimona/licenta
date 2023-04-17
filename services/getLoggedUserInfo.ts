import { db } from "@/core/firebaseApp";
import { doc, getDoc } from "firebase/firestore";

export const getLoggedUserInfo = async () => {
    const uid = window.sessionStorage.getItem("authToken")??"";
    const userRef = doc(db, "Users", uid);
    const userInfo = await getDoc(userRef);
    return userInfo.data();
};
