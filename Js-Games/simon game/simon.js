const buttonColours =["red","blue","green","yellow"];
var gamePattern =new Array();
var userClickedPattern =new Array();
var randomChosenColour;
var currentPosition=0;
function nextSequence(){
    level=level+1;
    $('#lvl-title').html('<h3>Level </h3>');
    $('h3').append(level);
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    switch(randomChosenColour){
        case "red": var audio;
                    audio=new Audio("./sounds/red.mp3");
                    audio.play();
                    break;
        case "blue": var audio;
                    audio=new Audio("./sounds/blue.mp3");
                    audio.play();
                    break;
        case "green": var audio;
                    audio=new Audio("./sounds/green.mp3");
                    audio.play();
                    break;
        case "yellow": var audio;
                    audio=new Audio("./sounds/yellow.mp3");
                    audio.play();
                    break;
        default:    var audio;
                    audio=new Audio("./sounds/wrong.mp3");
                    audio.play();
                    break; 
}
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenColor);
});
function playSound(name){
    switch(name){
        case "red": var audio;
                    audio=new Audio("./sounds/red.mp3");
                    audio.play();
                    break;
        case "blue": var audio;
                    audio=new Audio("./sounds/blue.mp3");
                    audio.play();
                    break;
        case "green": var audio;
                    audio=new Audio("./sounds/green.mp3");
                    audio.play();
                    break;
        case "yellow": var audio;
                    audio=new Audio("./sounds/yellow.mp3");
                    audio.play();
                    break;
        default:    var audio;
                    audio=new Audio("./sounds/wrong.mp3");
                    audio.play();
                    break; 
}
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");},100);
}
var started = false;
var level;
$(document).on('keypress',function(){
    if(started == false)
    {   $('#lvl-title').html('<h3>Level 0 </h3>');
        level =0;
        nextSequence();
        started = true;
    }
});
function checkAnswer(currentLevel){
    if(currentLevel===gamePattern[currentPosition])
    {   
        console.log("success");
        currentPosition=currentPosition+1;
        if(currentPosition==gamePattern.length)
        {   
            currentPosition=0;
            setTimeout(function(){
            nextSequence()},1000);
        }
    }
    else
    {
        var audio;
        audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");},200);
        $('#lvl-title').html('<h3>Game Over, Press any key</h3>');
        $(document).on('keypress',function(){
            setTimeout(function(){
            startover();},300);
    }); 
    
}
}
function startover(){
    gamePattern=[];
    started=false;
    level=0;
    currentPosition=0;
    setTimeout(function(){
        nextSequence();},100);
    
}
