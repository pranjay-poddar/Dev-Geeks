let firebaseConfig = {
    //Enter perosnal firebase api details
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();