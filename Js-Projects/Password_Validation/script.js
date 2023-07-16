const passwordInput = document.querySelector(".pass-field input");
const eyeIcon  = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");

//an array of password requirements with corresponding
//regular expression and index of the requirement list item
const requirements = [
    { regex: /.{8,}/, index:0 },   //minimun of 8 characters
    { regex: /[0-9]/, index:1 },   //at least 1 number
    { regex: /[a-z]/, index:2 },   //at least 1 lowercase letter
    { regex: /[A-Z]/, index:3 },   //at lest 1 uppercase letter
    { regex: /[^A-Za-z0-9]/, index:4 },  //at least 1 special character
]

passwordInput.addEventListener("keyup", (e) => {
    requirements.forEach(item => {
        //check if the password matches the requirement regex
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];
        
        //updating class & icon if requirement item if requirement matched or not
        if(isValid) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else{ 
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    });
});

eyeIcon.addEventListener("click", () => {
    //toggle the password input type between "password" and "text"
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    
    //update the eye icon class based on password input type
    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});