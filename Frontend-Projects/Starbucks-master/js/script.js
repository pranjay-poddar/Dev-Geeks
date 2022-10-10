


var circle = document.querySelector(".circle");
var circle3 = document.querySelector(".circle3");
var uls = document.querySelectorAll("ul");
var headers = document.querySelectorAll("header");
var logo = document.querySelector(".logo1");
var wipe = document.querySelector(".wipe");
var textBox = document.querySelector(".textBox");
var imgBox = document.querySelector(".starbucks");
console.log(circle)
window.addEventListener('load',() => {
    // circle.style.clipPath ="circle(100px at left 800px)";
    logo.style.left ="50%";
    logo.style.top ="50%";
    document.querySelector('html').style.overflowY = "hidden";
  
   
    setTimeout(() =>{
        circle.style.clipPath ="circle(100px at center 33.5%)";
        circle3.style.clipPath ="circle(100px at center 33.5%)";
    },500);
    setTimeout(() =>{
        logo.style.opacity =1;
        logo.style.filter="blur(0px)";
     
    },1500);
    setTimeout(() =>{
        logo.style.opacity =0;
        logo.style.filter="blur(20px)";
     
    },2700);
    setTimeout(() =>{
        circle.style.clipPath ="circle(600px at right 55%)";
        circle3.style.clipPath ="circle(100px at left 55%)";
    },2800);
    setTimeout(() =>{
        headers.forEach((header)=>{
            header.style.opacity=1;
            header.style.filter = "blur(0px)";
        });
        uls.forEach((ul)=>{
            ul.style.opacity=1;
            ul.style.filter="blur(0px)";

        });
        imgBox.style.opacity = 1;
        document.querySelector('html').style.overflowY = "scroll";
    },3500);
    setTimeout(() =>{

        textBox.style.opacity = 1;
        textBox.style.transform = "translateX(0px)";
    },3000);
 
});