const containerele= document.querySelector('.container');

// To create new color container
for (let index = 0; index < 30; index++) {
    const colorcontainer=document.createElement('div');
    colorcontainer.classList.add('colorcontainer');
    // gives colorcontainer class list to get css
    containerele.appendChild(colorcontainer)
    
}
const colorcontainerele=document.querySelectorAll('.colorcontainer')
// randomcolor()
generatecolor()
function generatecolor(){
    colorcontainerele.forEach((colorcontainerel)=>{
         const newcolorcode=randomcolor();
        //  console.log(newcolorcode);
        colorcontainerel.style.backgroundColor="#"+newcolorcode;
        //to get new color
        colorcontainerel.innerText="#"+newcolorcode;
    })
}

function randomcolor(){
    const charset="0123456789abcdef";
    const colorcodelength=6;
    let color="";
    for (let index = 0; index < colorcodelength; index++) {
       const randomnumber=Math.floor(Math.random()*charset.length);
    //    console.log(randomnumber);
    color+=charset.substring(randomnumber,randomnumber+1);
    // console.log(color);
    
        
    }
    return color;
}