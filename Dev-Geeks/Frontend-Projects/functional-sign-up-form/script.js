//error-banner--
function toggleErrorBanner(message, isSuccess){
    var messageDom = document.getElementsByClassName("message")[0];
    var bannerDom = document.getElementsByClassName("error-banner")[0];
    if (message && message.length > 0){
        messageDom.innerHTML = message;
        bannerDom.style.display = "block";
        bannerDom.style.backgroundColor = isSuccess ? "green" : "red"; 
    } else {
        messageDom.innerHTML = "";
        bannerDom.style.display = "none";
    }
}
var nm, em, ps, cPs = 0;

//name----
function displayName(element) {
    if(element.target.value.length <= 10){
        element.target.style.border = "2px solid red";
        element.target.style.transition = "border 0.2s";
        toggleErrorBanner("Name cannot be less than 10 characters.");
    }
    else {
        toggleErrorBanner();
        nm = 1;
    }
}

//email---
function displayEmail(element){
    var regex = /\w{2,}@\w+./
    if(regex.test(element.target.value) == false){
        element.target.style.border = "2px solid red";
        element.target.style.transition = "border 0.2s";
        toggleErrorBanner("Email should be of the format 'john@domain.com'")
    }
    else{
        toggleErrorBanner();
        em = 1;
    }
}
//validate password---
function validate(element) {
    var regex = /\w{5,10}\W{1}\w*/g;
    if(regex.test(element.target.value) == false) {
       element.target.style.border = "2px solid red";
       toggleErrorBanner("Password should contain a minimum of 5 characters and a special character");
    }
    else{
        toggleErrorBanner();
        ps = 1;
    }
}
//password check-----
function check(element) {
    var p1 = document.getElementById("pass");
    if(p1.value !== element.target.value || element.target.value == '') {
        element.target.style.border = "2px solid red"
        toggleErrorBanner("Confirm Password should be same as Password");
    }
    else{
        toggleErrorBanner();
        cPs = 1;
    }
}
//normalize css---
function removeBorder(element) {
    element.target.style.border = "2px solid #6c64ed";
    element.target.style.transition = "border 0.2s";
}

function redirect() {
    if(nm == 1 && em == 1 && ps == 1 && cPs == 1){
        toggleErrorBanner("Submission successful. Redirecting...", true);
        setTimeout(function(){
        window.location.replace("home.html")
        } ,3000);    
    }
    else{
        toggleErrorBanner("Please provide requested details.");
    }       
}