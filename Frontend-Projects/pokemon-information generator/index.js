document.getElementById("generate").addEventListener("click",function(){
    var id=Math.floor(Math.random()*150)+1;
    url=" https://pokeapi.co/api/v2/pokemon/";
    finalUrl= url + id;
    fetch(finalUrl)
    .then((response)=>response.json())
    .then((item)=>{
        console.log(item);
        document.getElementById("card").innerHTML=
        `
        
        <img src=${item.sprites.other.dream_world.front_default} id="image1"> 
        <h2>${item.name}</h2>
        <div id="div3">
    TYPE-${item.types.map((data)=>data.type.name)}
                    </div>
        <div id="div2">
       <div> Attack ${item.stats[1].base_stat}</div>
       <div> Defence ${item.stats[2].base_stat} </div>
       <div> Speed ${item.stats[5].base_stat}</div>
        </div>
        `
    })
})
