const dogdiv=document.getElementById("dogimg");
const newdog=()=>{
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(json=> {dogdiv.innerHTML=`<img src='${json.message}'/>`})
}
dogbtn.onclick=()=>newdog();