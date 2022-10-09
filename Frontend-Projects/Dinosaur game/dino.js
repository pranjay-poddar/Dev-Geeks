const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const score=document.getElementById("score");
const gameOver=document.getElementById("gameOver");


let interval=null;
let playerScore=0;

let scoreCounter=()=>{
playerScore++;
score.innerHTML=`Your Score:<b> ${playerScore}</b>`;


}
    

window.addEventListener("keydown",(start)=>{
    if(start.code =="Space"){
        gameOver.style.display="none";
        obstacle.classList.add("obstacleActive");
        

        playerScore=0;
        interval=setInterval(scoreCounter,400);
    }
    
});
window.addEventListener("keydown",(e)=>{
    if(e.key=="ArrowUp")
      if(player.classList!="animate"){
        player.classList.add("animate");

        setTimeout(()=>{
            player.classList.remove("animate");
        },500);
      }
});

let  playerIsNotDead=setInterval(()=>{
    let playerBottom=parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
   console.log("playerBottom"+playerBottom);

   let obstacleLeft=parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    console.log("obstacleLeft"+obstacleLeft);

    if(playerBottom<=100 &&obstacleLeft>=0&& obstacleLeft<=50){
        
        gameOver.style.display="block";
        //alert("Game Over, REfresh to play again");
        obstacle.classList.remove("obstacleActive");
       
        clearInterval(interval);
        playerScore=0;

        
        
        
        
     }
},10);
