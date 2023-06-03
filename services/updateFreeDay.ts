import { db } from "@/core/firebaseApp";
import { TEventNotification } from "@/utils/interface";
import { doc, updateDoc } from "firebase/firestore";

export const updateFreeDayRequestService = async (props: {
  request: TEventNotification;
  response: string;
  email: string;
}) => {
  const freeDayReqRef = doc(db, "FreeDays", props.request.id);

  console.log(props.email, props.request, props.request);

  fetch(
    `https://us-central1-workease-2cf93.cloudfunctions.net/sendMail?subject=Response free days request&text=Your free days request have been ${props.response}.&to=${props.email}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "your-rapid-key",
        "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
      },
    }
  );

  await updateDoc(freeDayReqRef, {
    status: props.response,
  });
};
