const textEl=document.getElementById("text")
const totalEl=document.getElementById("total")
const remainingEl=document.getElementById("remaining")

const x=()=>{
    updateCounter()
}
textEl.addEventListener("keyup",x)
updateCounter()

function updateCounter(){
    totalEl.innerText=textEl.value.length
    remainingEl.innerText=textEl.getAttribute("maxlength")-textEl.value.length
}
