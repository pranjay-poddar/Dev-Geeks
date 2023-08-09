let heads=0 //head count
let tails=0 //tail count
let coin= document.querySelector(".coin") //cooin class is selected
let flipbtns= document.querySelectorAll(".btn") //all the buttons are selected

// adding eventlistener for spinning the coin on click
flipbtns.forEach(function(button){
    button.addEventListener("click", (event)=>{
        let i= Math.floor(Math.random()*2)
        coin.style.animation="none";
        btn=event.target.classList[0];
        console.log(btn);

        if(i){
            setTimeout(() => {
                coin.style.animation="spin-heads 3s  forwards";
            }, 150);
            heads++
            
            // changing values after spinning stops and head comes
            setTimeout(() => {
                
                // increment of head count
                $(".points1").text(heads);

                // diaplay result of game if head was clicked
                if (btn === "head-button") {
                    $(".game-text").text("you won")
                }else{
                    $(".game-text").text("you lost")
                }
            }, 3000);
            
        }
        else{
            
            setTimeout(() => {
                coin.style.animation="spin-tails 3s  forwards";
            }, 150);
            tails++
            // changing values after spinning stops and head comes
            setTimeout(() => {

                // increment in tail count
                $(".points2").text(tails);

                //display result of game if tail was clicked
                if (btn === "tail-button") {
                    $(".game-text").text("you won")
                }else{
                    $(".game-text").text("you lost")
                }
            }, 3000);
        };
    })
})