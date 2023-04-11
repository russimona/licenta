import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const firebaseConfig = {
  apiKey: "AIzaSyBFMOdHv4KG6LHKuNmh6YobjhP7ZAiPyY4",
  authDomain: "workease-2cf93.firebaseapp.com",
  databaseURL: "https://workease-2cf93-default-rtdb.firebaseio.com",
  projectId: "workease-2cf93",
  storageBucket: "workease-2cf93.appspot.com",
  messagingSenderId: "904430486212",
  appId: "1:904430486212:web:ed32c02b6ef001eed77f91",
  measurementId: "G-8Q4QKK81CM"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const googleProvider = new GoogleAuthProvider();


// const firebaseConfig = {
//   apiKey: "AIzaSyBFMOdHv4KG6LHKuNmh6YobjhP7ZAiPyY4",
//   authDomain: "workease-2cf93.firebaseapp.com",
//   databaseURL: "https://workease-2cf93-default-rtdb.firebaseio.com",
//   projectId: "workease-2cf93",
//   storageBucket: "workease-2cf93.appspot.com",
//   messagingSenderId: "904430486212",
//   appId: "1:904430486212:web:ed32c02b6ef001eed77f91",
//   measurementId: "G-8Q4QKK81CM"
// };