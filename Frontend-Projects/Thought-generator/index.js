const quote=document.getElementById("quote")
const author=document.getElementById("author")
url="https://api.quotable.io/random";
document.getElementById("submit").addEventListener("click",function(){

fetch(url)
.then((response)=>(response.json())) 
.then((item)=>{
console.log(item)
quote.innerHTML=`<h1>${item.content}</h1>`
author.innerHTML=`<h1>- ${item.author}</h1>`
})
})