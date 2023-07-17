const topbtn = document.querySelector('.gotop');
window.addEventListener ('scroll', checkHeight)

function checkHeight(){
    if (window.scrollY > 200){
        topbtn.style.display = "flex";
    }
    else {
        topbtn.style.display = "none";
    }
}

topbtn.addEventListener('click', ()=>{
    window.scrollTo({
        top:0,
        behavior: "smooth"
    })
})