const mainContainer = document.querySelector(".main")
const thanksContainer = document.getElementById("thankYou")
const submit = document.querySelector(".submit")
const rating = document.querySelector("span.rating")
const rateButton = document.querySelectorAll(".choice")

rateButton.forEach((rate)=>{
    rate.addEventListener("click",()=>{
        rating.innerHTML = rate.innerHTML
    })
})

submit.addEventListener("click",()=>{
    mainContainer.classList.add("hidden")
    thanksContainer.classList.remove("hidden")
})

