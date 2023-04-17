import { IResetPasswordData } from "@/utils/interface";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const resetPassword = async (props: IResetPasswordData) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, props.email)
};
