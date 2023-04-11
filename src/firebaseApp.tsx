// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/database"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


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


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);