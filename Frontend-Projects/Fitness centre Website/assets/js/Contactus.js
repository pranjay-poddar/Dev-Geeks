const firebaseConfig = {
  apiKey: "AIzaSyDrzmRMSQcFvd3N7tqMx0FbT26VYpzQ8Ts",
  authDomain: "contact-us-glamfit.firebaseapp.com",
  databaseURL: "https://contact-us-glamfit-default-rtdb.firebaseio.com",
  projectId: "contact-us-glamfit",
  storageBucket: "contact-us-glamfit.appspot.com",
  messagingSenderId: "842686115111",
  appId: "1:842686115111:web:a08e137e7cabc154c90d02"
};


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Refernece contactInfo collections
  var contactFormDB = firebase.database().ref('contactForm');
  
  // Listen for a submit
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    //   Get input Values
    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
    
    console.log(name, emailid, msgContent);
    saveMessages(name, emailid, msgContent);

    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
}
 
  const saveMessages = (name, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
