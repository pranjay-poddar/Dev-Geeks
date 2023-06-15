document.getElementById("fingersentred").onclick =function(){
    var randomnumber = Math.random();
    randomnumber = randomnumber * 6;
    randomnumber = Math.floor(randomnumber);
    
    if(document.getElementById("numberentre").value == randomnumber){
        alert("well done you got it");
    }
    else{
        alert("Nopes! the number was:" + randomnumber);
    }
}