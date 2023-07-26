const jokeContainer=document.getElementById("joke");
const btn=document.getElementById("btn")
const url="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
let getJoke=()=>{
    jokeContainer.classList.remove("fade");
    fetch(url)
    .then(data=>data.json())
    .then(item=>{
        console.log(item)
        jokeContainer.innerHTML=
        `
        <h1>${item.joke}</h1>
        <h6>category of joke - ${item.category}</h6>
        <h6>is it explicit joke - ${item.flags.explicit}</h6>
        <h6> is it political joke - ${item.flags.political}</h6>
       <h6>  is it racist joke - ${item.flags.racist}</h6>
     
        
        `;
        jokeContainer.classList.add("fade")
    })
};
btn.addEventListener("click",getJoke);
getJoke();

