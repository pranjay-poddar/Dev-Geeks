const hourele= document.getElementById('hour');
const minele= document.getElementById('minutes');
const secele= document.getElementById('seconds');
const ampmele= document.getElementById('ampm');


function updateclock(){
    let h= new Date().getHours();
    let m= new Date().getMinutes();
    let s= new Date().getSeconds();
    let ampm="AM";
    if(h>12){
        h=h-12;
        ampm="PM";
    }
    h=h<10?"0"+h:h;
    m=m<10?"0"+m:m;
    s=s<10?"0"+s:s;
    hourele.innerText=h;
    minele.innerText=m;
    secele.innerText=s;
    ampmele.innerText=ampm;

    setTimeout(() => {
      updateclock()  
    }, 1000);


}
updateclock()