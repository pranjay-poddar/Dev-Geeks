const formBtn = document.querySelectorAll('.formBtn')
formBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
        e.preventDefault();

    })
})


const dropDownIcon = document.querySelector(".dropDownIcon")
const navLoginSignUp = document.querySelector(".navLoginSignUp")

dropDownIcon.addEventListener("click",function () {
    if(navLoginSignUp.style.display==="flex")
    navLoginSignUp.style.display="none"
    else
    navLoginSignUp.style.display="flex"
})