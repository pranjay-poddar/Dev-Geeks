var p=localStorage.getItem("counter")
document.getElementById("button1").addEventListener("click",function(){
  p++;
  localStorage.setItem("counter",p)
    const a="#"+Math.floor(Math.random()*16777215).toString(16);
    const b="#"+Math.floor(Math.random()*16777215).toString(16);
    const c=Math.floor(Math.random()*50);
    d=c+"px";
    var e=Math.floor(Math.random()*100);
    if(e<=5){
     e=e+10;
    }
    console.log(c)
    document.getElementById("button2").style.backgroundColor=a; 
    document.getElementById("button2").style.borderRadius=d;
    document.getElementById("button2").style.color=b;
    document.getElementById("button2").style.width=e+"%";
  
    const details=document.getElementById("details")
    details.innerText=`
  Specifications of the button ${p})
    background-color:${a};
    border-radius:${d}px;
    width:${e}%;
    color:${b};
    font-size: 1.2rem;
`;

})
