import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA8e6Lyw66J0yBYk8mnz5o5vRAP4x_Ya7g",
    authDomain: "linkedinv2-web.firebaseapp.com",
    projectId: "linkedinv2-web",
    storageBucket: "linkedinv2-web.appspot.com",
    messagingSenderId: "424235396060",
    appId: "1:424235396060:web:d9b608e64430184edd3d19",
    measurementId: "G-MWRY3X719K"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage };

  export default db;