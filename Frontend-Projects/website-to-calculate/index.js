let number=document.querySelectorAll(".number");
const screen=document.getElementById("div2")
const equal=document.getElementById("equal");
const clear=document.getElementById("clear");
number.forEach(function(button){
    button.addEventListener("click",function(e){
        let value=e.target.dataset.num;
      
        screen.value+= value;
        
    })
    equal.addEventListener("click",function(e){
if(screen.value==''){
    screen.value =""
}else{
    let answer=eval(screen.value);

screen.value=answer;
}
    })
    clear.addEventListener("click",function(){
        screen.value="";
    })
}
);
