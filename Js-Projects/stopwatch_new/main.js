const counter = document.querySelector('.counter');
const btn = document.querySelector('.buttons');
const secondsInput = document.getElementById('seconds');

var seconds;
var minuts;
var remseconds;
var toCount;

function subm(){
    display("submit", "start");
    seconds = Number(secondsInput.value);
    secondsInput.style.display = "none";
    counting();
}

function display(first, second){
	document.getElementById(first).style.display = "none";
	document.getElementById(second).style.display = "block";
}

function check(stat){
	toCount = stat.value;
	if(stat.id == "start"){
		display("start", "stop");
	}
	else if(stat.id == "stop"){
		display("stop", "continue");
	}
	else{
		display('continue', "stop");
	}
}

function count(){
	if(seconds > 0){
       if(toCount == true){
            seconds--;
            remseconds = seconds % 60;
            minuts = Math.floor(seconds / 60);

            if(remseconds < 10){
       	        remseconds = "0" + remseconds;
            }

            if(minuts < 10){
       	        minuts = "0" + minuts;
            }

            counter.innerHTML = minuts + " : " + remseconds;
       }
	}
	else{
		counter.innerHTML = "Done!";
		btn.style.opacity = '0';
	}
}

function counting(){
	remseconds = seconds % 60;
minuts = Math.floor(seconds / 60);

if(remseconds < 10){
    remseconds = "0" + remseconds;
}

if(minuts < 10){
    minuts = "0" + minuts;
}

counter.innerHTML = minuts + " : " + remseconds;
   setInterval(count, 1000);
}


