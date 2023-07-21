function calculate(){
    var a= parseInt(document.getElementById('m1').value) ;
    var b= parseInt( document.getElementById('m2').value) ;
    var c= parseInt ( document.getElementById('m3').value) ;
    var d= parseInt(document.getElementById('m4').value );
    var e= parseInt(document.getElementById('m5').value) ;

    if(a>100 || b>100 || c>100 || d>100 || e>100){
    alert("Please Enter the correct marks");}
    else{
        var obtain= a+b+c+d+e;
        document.getElementById("obtain").innerHTML=obtain;
        
        var per= obtain/500*100;
        document.getElementById("per").innerHTML=per;

        if(obtain>=450)
        document.getElementById("gr").innerText="A";
        else if (obtain>=350)
        document.getElementById("gr").innerText="B" ;
        else if(obtain>=300)
        document.getElementById("gr").innerText="C";
        else if(obtain>=250)
        document.getElementById("gr").innerText="D";
        else if(obtain>=200)
        document.getElementById("gr").innerText="E";

        if(a>40 && b>40 && c>40 && d>40 && e>40){
            document.getElementById("rem").innerHTML="PASS";

        }
        else{
        document.getElementById("rem").innerHTML="FAIL";
       

    }
   
}}