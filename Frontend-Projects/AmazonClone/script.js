let slideBtnleft=document.getElementById("slider-btn-left")
let slideBtnright=document.getElementById("slider-btn-right")
let imgitem=document.querySelectorAll(".image-item")

console.log(imgitem.length-1)
let startslider=0
let endslider=(imgitem.length-1) *100

slideBtnleft.addEventListener("click",handleleftbtn)

function handleleftbtn(){
    if(startslider<0){
        startslider=startslider+100;
        }
        // else
        // startslider=-700
        imgitem.forEach(element=>{
            element.style.transform=`translateX(${startslider}%)`;
        })
}

slideBtnright.addEventListener("click",handlerightbtn)

function handlerightbtn(){
    if(startslider>=-endslider+100){
    startslider=startslider-100;
    }
    // else
    // startslider=0
    imgitem.forEach(element=>{
        element.style.transform=`translateX(${startslider}%)`;
    })
}


function renderslideauto(){
    
    if(startslider>=-endslider+100){
        handlerightbtn()
    }
    else{
        startslider=0;
    }
}
setInterval(renderslideauto,3000);


const sidebarnav=document.getElementById("sidebar-show")
const sidebaropen=document.getElementById("open-nav")
const sidebarclose=document.getElementById("sidebar-close")

sidebaropen.addEventListener("click",()=>{
    sidebarnav.classList.toggle("sidebar-show")
})
sidebarclose.addEventListener("click",()=>{
    sidebarnav.classList.toggle("sidebar-show")
})


let mybutton = document.getElementById("backtotop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}