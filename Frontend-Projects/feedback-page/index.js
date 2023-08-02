const emoji=document.querySelector("#div2")
emoji.addEventListener("click",function(){
    document.getElementById("div1").innerHTML=
    `
    <h1>Thank you for giving us a review</h1>
    <h3>Your review is beneficial to us.By this we can understand the faults and the places where we are doing right.<h3>
    `
    document.getElementById("review").style.display="none";
})