// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS0DYTEsgE468jB6DoCVw7R5S9ShwpSfY",
  authDomain: "to-do-list-gdsc.firebaseapp.com",
  databaseURL: "https://to-do-list-gdsc-default-rtdb.firebaseio.com",
  projectId: "to-do-list-gdsc",
  storageBucket: "to-do-list-gdsc.appspot.com",
  messagingSenderId: "1089290769981",
  appId: "1:1089290769981:web:87c00c8afe07c57ce17c54",
  measurementId: "G-PVPY60H5W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();