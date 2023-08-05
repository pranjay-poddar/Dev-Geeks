const inputContainer = document.querySelectorAll('.inputContainer')
const cancelPopUp = document.getElementById('cancelPopUp')
const successPopUp = document.getElementById('successPopUp')

//Inputs
const loginUserName = document.getElementById('username')
const loginPassword = document.getElementById('password')

const testUserName = "abcd"
const testloginPassword = "abcd"

const str = document.querySelector("#loginHeader > h2");
let txt = "Welcome to Remainder app !"
let txtlen = txt.length;
let pos = -1;
let t = setInterval(move, 200);
function move() {
    pos++;
    str.innerHTML += txt.charAt(pos);
    if (pos == txtlen) {
        clearInterval(t);
    }
}



const popUp = (op) => {
    if (op === "cancel") {
        cancelPopUp.style.display = "flex"
    }
    if (op === "login") {
        if (loginUserName.value == testUserName && loginPassword.value == testloginPassword)
            successPopUp.style.display = "flex";
        else if ((loginUserName.value == "") && (loginPassword.value == ""))
            alert("Please Enter username and password")
        else if (loginUserName.value == "")
            alert("Please enter username")
        else if (loginPassword.value == "")
            alert("Please enter password")
        else
            cancelPopUp.style.display = "flex";
    }
    if (op === "signup") {
            let emptyCheck = isEmpty()
            if (emptyCheck === false) {
                const loginrepassword = document.getElementById("repassword").value
                if (loginPassword.value !== loginrepassword && loginrepassword !== "") {
                   alert("Password Mismatch !");
                }
                else {
                    window.open("./pages/home.php");
                }
            }
    }
}

const closePopUp = (op) => {
    document.getElementById(op).style.display = "none"
}

const retry = (op) => {
    inputContainer.forEach((element) => {
        element.value = ""
    })
    document.getElementById(op).style.display = "none"
}
const isEmpty = () => {
    for (let i = 0; i < inputContainer.length; i++) {
        const element = inputContainer[i];
        if (element.value === "") {
            alert("Form imcomplete")
            return true
        }
    }
    return false
}