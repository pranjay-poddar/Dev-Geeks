let timer = false; // indicator of start button
let stopper = false; // indicator of stop button
let toreset = false; // indicator of reset button
let uplimit = 60;

function countdown() {
    timer = true;
    stopper = false;
    toreset = false;
    setInterval("downcount()", 1000)
}

function stopping() {
    stopper = true;
    timer = false;
    setInterval("downcount()", 1000)
}

function resetting() {
    toreset = true;
    timer = false;
    setInterval("downcount()", 1000)
}

function downcount() {
    let count = document.querySelector(".countdown")
    if(timer == true) {
        uplimit -= 1;
        stopper = false;
        toreset = false;
        count.innerHTML = uplimit;
    }
    if(stopper == true) {
        count.innerHTML = uplimit;
    }
    if(toreset == true) {
        uplimit = 60;
        count.innerHTML = uplimit;
    }
    if(uplimit == 0) {
        timer = false; 
        count.innerHTML = uplimit;
        uplimit = 60;
    }
}

