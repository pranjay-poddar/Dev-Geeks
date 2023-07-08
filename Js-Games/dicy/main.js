var dice1 = document.getElementById('dice1');
    var dice2 = document.getElementById('dice2');
    var animationRunning = false;

    function rollDice() {
        var random1 = Math.floor(Math.random() * 6) + 1;
        var random2 = Math.floor(Math.random() * 6) + 1;

        switch(random1){
          case 1:
            dice_img1 = "https://i.ibb.co/9ykYNJC/dice-1.png";
            break;
          case 2:
            dice_img1 = "https://i.ibb.co/kc4KLVV/dice-2.png";
            break;
          case 3:
            dice_img1 = "https://i.ibb.co/zNcxkKb/dice-3.png";
            break;
          case 4:
            dice_img1 = "https://i.ibb.co/fp5tRBn/dice-4.png";
            break;
          case 5:
            dice_img1 = "https://i.ibb.co/0KLwMWb/dice-5.png";
            break;
          case 6:
            dice_img1 = "https://i.ibb.co/t3sRPDG/dice-6.png";
        }

        switch(random2){
          case 1:
            dice_img2 = "https://i.ibb.co/9ykYNJC/dice-1.png";
            break;
          case 2:
            dice_img2 = "https://i.ibb.co/kc4KLVV/dice-2.png";
            break;
          case 3:
            dice_img2 = "https://i.ibb.co/zNcxkKb/dice-3.png";
            break;
          case 4:
            dice_img2 = "https://i.ibb.co/fp5tRBn/dice-4.png";
            break;
          case 5:
            dice_img2 = "https://i.ibb.co/0KLwMWb/dice-5.png";
            break;
          case 6:
            dice_img2 = "https://i.ibb.co/t3sRPDG/dice-6.png";
        }
          
        dice1.src = dice_img1;
        dice2.src = dice_img2;

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