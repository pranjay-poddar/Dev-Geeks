const ratingEL =document.querySelectorAll(".rating");

const btnEl =document.getElementById("btn");

const containerEl =document.getElementById("container");

let selectedRating ="";
ratingEL.forEach((ratingEL)=>{
    ratingEL.addEventListener("click",(event)=>{
        removeactive();
       selectedRating=
       event.target.innerText || event.target.parentNode.innerText;
        event.target.classList.add("active");
        event.target.parentNode.classList.add("active");
    })
})

btnEl.addEventListener("click",(event)=>{
    containerEl.innerHTML=`
    <strong>Thank You</strong>
    <br>
    <br>
    <strong>Feedback: ${selectedRating}</strong>
    <P>We'll use your feedback to improve our customer support</p>`
})


function removeactive(){
    ratingEL.forEach((event)=>{
        event.classList.remove("active");
    })

}