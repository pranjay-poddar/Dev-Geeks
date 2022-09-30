"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var dinosaurY =  200;
  var score = 0;
  var interval = setInterval(eventLoop, 100);
  var state = true;
  var highScore = game.getHighScore();
  function eventLoop() {
    dinosaurY = dinosaurY - dinosaurVelocity;
    game.clear();
    obstacleX = obstacleX - 10;
    if (obstacleX === 0) {
      obstacleX = game.width;
    }
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    if (score > highScore) {
      highScore = score;
      game.saveHighScore(highScore);
    }
    game.drawHighScore(highScore);
    game.drawObstacle(obstacleX, 200);
    game.drawDinosaur(100, dinosaurY);
    game.drawScore(++score);
    if (dinosaurY === 200 && obstacleX === 100) {
      game.drawMessage('You lose :(')
      clearInterval(interval);
      state = false;
      score = 0;
      return;
    }
  }
  var dinosaurVelocity = 0;
  game.onUpArrow(function() {
    dinosaurVelocity = 10;
    if (state === false) {
      interval = setInterval(eventLoop, 100);
      state = true;
    }
  });
});
