import { db } from "@/core/firebaseApp";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export interface IUserBeforeSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  numberOfFreeDays: number;
  companyId: string;
}
export const sendUserDataBeforeSignUpHandler = (
  data: IUserBeforeSignUpData
) => {
  const email = sessionStorage.getItem("email") ?? "";

  return addDoc(collection(db, "UsersRequestedToJoinTeam"), {
    ...data,
  }).then((result) => {
    fetch(
      `https://us-central1-workease-2cf93.cloudfunctions.net/sendMail?subject=Invite&text=${email}  is inviting you to be part of his company as ${
        data.role
      }. Please follow the link bellow to sign up ${window?.location.href.replace(
        window.location.pathname,
        ""
      )}/invite/${result.id} .&to=${data.email}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "your-rapid-key",
          "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
        },
      }
    );
  });
};
