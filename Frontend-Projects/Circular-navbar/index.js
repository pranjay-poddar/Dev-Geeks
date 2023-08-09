
var bars=document.getElementById("nav-action");
var nav=document.getElementById("nav");

bars.addEventListener("click",function(){
bars.classList.toggle('active')
nav.classList.toggle('visible')
},false)