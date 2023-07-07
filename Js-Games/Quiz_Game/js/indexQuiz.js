
var qno = [1, 2, 3, 4];

var question = ["Which digital payment company has launched unified QR code for merchants for unlimited payments?", 
"Read along, that was in news recently, is an application of which multi-national company?", 
"The DOGE-1 Mission to the Moon will be launched by which company in 2022?", 
"Which famous technology company has launched a short music videos application called Collab?"];

var allAns = [["PhonePe", "Paytm", "Amazon Pay", "Google Pay"], 
["Amazon", "Facebook", "Microsoft", "Google"], 
["SpaceX", "ISRO", "NASA", "Roscosmos"], 
["Amazon", "Facebook", "Microsoft", "Google"]];

var rightAns = ["Paytm", "Google", "SpaceX", "Facebook"];

var score = 0;
var i = 0;
var j = 0;
var x = document.querySelectorAll(".ans-btn");
for (i = 0; i < x.length; i++) {

    // Event listener for a button when a user clicks
    x[i].addEventListener('click', function() {
        if (this.textContent === rightAns[j]) {
            score++;
            console.log(score);
        }
        j++;
        if (j >= x.length) {
            scorecard();
            
        } else {
            next();
        }

    })
}

// Function for stepping into the next question after user clicks an option
function next() {
    document.querySelector('.current-q').textContent=(question[j]);
    document.querySelector('#qno').textContent=(qno[j]);
    for(i=0;i<x.length;i++){
        document.querySelectorAll('.ans-btn')[i].textContent=(allAns[j][i]);
    } 
}

// Function call when the quiz ends
function scorecard() {

    // Making the content NULL after the quiz ends
    document.querySelector("h1").innerHTML = "";
    document.querySelector("h3").innerHTML = "";
    document.querySelector(".ans-btn-div").innerHTML = "";

    // Making the Hidden Button visible after end of quiz
    document.querySelector('.show-res').classList.add("score-visible");
    document.querySelector('.show-res').addEventListener('click',function(){
        document.querySelector('button').innerHTML = 'You scored ' + score + ' out of 4';
    })
}




