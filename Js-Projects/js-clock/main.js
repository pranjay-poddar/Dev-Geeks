function displayTime(){
    //creating date object and getting values for hours, minutes and seconds
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = "AM";
    
    //AM and PM distinguisher
    if(h == 0){
        hr = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    //concatenating all the values and writing it into index file
    var time = h + ":" + m + ":" + s + " " + session;
    document.querySelector(".clock").innerText = time;
    document.querySelector(".clock").textContent = time;
    
    //setting timer to run every second
    setTimeout(displayTime, 1000);
    
}

displayTime();