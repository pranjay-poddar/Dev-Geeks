var dice1 = document.getElementById('dice1');
    var dice2 = document.getElementById('dice2');
    var animationRunning = false;

    function rollDice() {
        var random1 = Math.floor(Math.random() * 6) + 1;
        var random2 = Math.floor(Math.random() * 6) + 1;

        dice1.src = "dice_images/dice_" + random1 + ".png";
        dice2.src = "dice_images/dice_" + random2 + ".png";

      var dice1Clone = dice1.cloneNode();
      var dice2Clone = dice2.cloneNode();
      dice1.parentNode.replaceChild(dice1Clone, dice1);
      dice2.parentNode.replaceChild(dice2Clone, dice2);

      dice1 = dice1Clone;
      dice2 = dice2Clone;

      // Start animation
      dice1.style.animationPlayState = 'running';
      dice2.style.animationPlayState = 'running';
    }