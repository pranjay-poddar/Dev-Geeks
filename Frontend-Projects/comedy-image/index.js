const url="https://meme-api.com/gimme/wholesomememes";
document.getElementById("generate").addEventListener("click",function(){
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        document.getElementById("image").setAttribute("src",`${data.url}`)
        document.getElementById("h1").innerText=`${data.title}`;
        
    })
  
})