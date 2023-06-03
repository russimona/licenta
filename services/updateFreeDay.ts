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

  await updateDoc(freeDayReqRef, {
    status: props.response,
  });
};
