import { initializeApp } from 'firebase/app';
// import { getAuth,getFirestore, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn0Wq7P0Jy-xVa4qfv_K9Lma9-xIj8AE8",
  authDomain: "rlogixnoteapp.firebaseapp.com",
  databaseURL: "https://rlogixnoteapp-default-rtdb.firebaseio.com",
  projectId: "rlogixnoteapp",
  storageBucket: "rlogixnoteapp.appspot.com",
  messagingSenderId: "612693668312",
  appId: "1:612693668312:web:ad87eb416a76b3440442ad",
  measurementId: "G-YEYHBSXRNZ"
};

const authApp = initializeApp(firebaseConfig);
export default authApp;
