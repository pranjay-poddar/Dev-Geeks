const inputs=document.querySelectorAll("input");
let heading=document.getElementById("title");
let endDate="";
console.log(endDate);
let button=document.getElementById("button");
let refresh=document.getElementById("refresh");
button.addEventListener("click",function(){
    button.style.display="none";
    heading.innerText="This much time is left for your given Date";

 endDate=inputs[0].value;
 console.log(inputs[0].value);
 console.log(endDate);
 function clock(){
    const end=new Date(endDate);
    const now=new Date();
    const diff=(end-now)/1000;
    console.log(diff);
    if(diff<0){
        return;
    }
    inputs[1].value=Math.floor(diff/3600/24);
    inputs[2].value=Math.floor((diff/3600)%24);
    inputs[3].value=Math.floor((diff/60)%24);
    inputs[4].value=Math.floor((diff)%24);
}

setInterval(
    ()=>
    {
        clock()
    },1000)
})
refresh.addEventListener("click",function(){
    button.style.display="block";
    heading.innerText="Enter the time from which stopwatch has to be started";
  inputs[0].value="";
    endDate="20 June 2022 10:00:00 PM";
    inputs[1].value="0";
    inputs[2].value="0";
    inputs[3].value="0";
    inputs[4].value="0";
})
