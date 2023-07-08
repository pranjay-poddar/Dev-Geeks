// To get canvas and its rendering elements
var canvas = document.getElementById("gameArea");
var c = canvas.getContext("2d");

// Defining the ship object
var ship = {
  img: new Image(),
  x: 10,
  y: 200,
  height: 31,
  width: 46,
};

// Defining the heart object for health display
var heart = {
  imgFull: new Image(),
  imgEmpty: new Image(),
  height: 40,
  width: 40,
};

// Defining the enemy object
var enemy = {
  img1: new Image(),
  img2: new Image(),
  height: 23,
  width: 46,
  spawnClock: 15,
};

// Defining the boss object
var boss = {
  img1: new Image(),
  img2: new Image(),
  height: 100,
  width: 100,
};

// Defining scores for different levels
var scores = {
  easy: 50,
  medium: 100,
  hard: 300,
  boss: 5000,
};

//Defining the bullet object
var bullet = { height: 5, width: 15 };

//Loading images of different elements
ship.img.src = "https://i.postimg.cc/zfp544h6/ship-blue.png";
heart.imgFull.src = "https://i.postimg.cc/Kj32kzWh/heart-1.png";
heart.imgEmpty.src = "https://i.postimg.cc/Dz7nj7S1/heart-2.png";
enemy.img1.src = "https://i.postimg.cc/VdgQQbJn/enemy-white1.png";
enemy.img2.src = "https://i.postimg.cc/bJJ8PLHJ/enemy-white2.png";
boss.img1.src = "https://i.postimg.cc/nVWVF8Wt/swoop01.png";
boss.img2.src = "https://i.postimg.cc/JzNR5sz1/swoop02.png";

//Defining UI Height
var UIHeight = 50;

// Initialize game-related arrays and variables
var enemies = [];
var shipBullets = [];
var enemyBullets = [];
var menuParticles = [];
var isShipFiring = false;
const fireRate = 10;
var shipFireClock = fireRate;
const maxHealth = 4;
var health = maxHealth;
var playing = true;
var menu = true;
var gif = 0;
var score = 0;
var bossAlive = true;
var bossFiring = false;
var won = false;
var lose = false;
var underFire = false;

var killCounter = 0;

var hover = false;

// Defining the color array for bullets
var colors = [
  "#E832CC",
  "#FE6961",
  "#E6C415",
  "#C4E51B",
  "#64FE6E",
  "#29F7A1",
  "#05C3E6",
  "#6765FD",
  "#FDFF00",
  "#5dff53",
];

// Add event listeners for mouse events
canvas.addEventListener("mousemove", shipSetPos, false);
canvas.addEventListener("mousemove", menuButtonHover, false);
canvas.addEventListener("mousedown", shipStartFire, false);
canvas.addEventListener("mousedown", onButtonClick, false);
canvas.addEventListener("mouseup", shipStopFire, false);

// Obtain the requestAnimationFrame function from the browser's API
var requestAnimationFrame =
  window.requestAnimationFrame || // Standard API
  window.mozRequestAnimationFrame || // Morzilla Firefoc
  window.webkitRequestAnimationFrame || // Chrome,Safari,Opera
  window.msRequestAnimationFrame; // Edge

// When the webpage finishes loading call playGame function
window.onload = function () {
  playGame();
};

function onButtonClick(ev) {
  // Check if the menu is currently being displayed
  if (menu) {
    // To get position of canvas related to viewport
    var rect = canvas.getBoundingClientRect();
    var mouseX = ev.clientX - rect.left;
    var mouseY = ev.clientY - rect.top;
    // Check if the mouse is within the start button area,if it is update game state
    if (mouseY >= 300 && mouseY <= 370 && mouseX >= 300 && mouseX <= 500) {
      menu = false;
      playing = true;
    }
  }
  // Similar behaviour as above to check for PlayAgain if win or loose
  if (won || lose) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = ev.clientX - rect.left;
    var mouseY = ev.clientY - rect.top;

    if (mouseY >= 400 && mouseY <= 470 && mouseX >= 300 && mouseX <= 500) {
      playAgain();
    }
  }
}

function menuButtonHover(ev) {
  // Check if the menu is currently being displayed
  if (menu) {
    // Get the position of the canvas relative to the viewport

    var rect = canvas.getBoundingClientRect();
    var mouseX = ev.clientX - rect.left;
    var mouseY = ev.clientY - rect.top;
    // Calculate the mouse coordinates relative to the canvas
    if (mouseY >= 300 && mouseY <= 370 && mouseX >= 300 && mouseX <= 500) {
      hover = true;
    } else {
      hover = false;
    }
  }
  // Check if the game is won or lost
  if (won || lose) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = ev.clientX - rect.left;
    var mouseY = ev.clientY - rect.top;

    // Check if the mouse is within the PlayAgain area
    if (mouseY >= 400 && mouseY <= 470 && mouseX >= 300 && mouseX <= 500) {
      hover = true;
    } else {
      hover = false;
    }
  }
}

function playGame() {
  // Check if the player's health is 0
  if (health === 0) {
    // If the game is currently playing, set playing to false and indicate that the player has lost
    if (playing === true) {
      playing = false;
      lose = true;
      // Remove all enemies from the enemies array
      for (var i = 0; i < enemies.length; i++) {
        enemies.shift();
      }
    }
  }
  // Check if the game is in the menu state
  if (menu) {
    drawMenu();
    moveMenuParticle();
    removeMenuParticles();
  } else {
    // If the game is not in the menu state and is currently playing (not won), continue the game logic
    if (playing && !won) {
      // Player actions
      shipFire();
      spawnEnemy();
      checkEnemy();
      checkEnemyBullets();
      checkShip();
      checkBoss();
    }
    //Drawing game elements
    drawBackground();
    drawUI();
    drawShip();
    drawShipBullets();
    drawEnemy();
    removeEnemy();
    drawEnemyBullets();
    removeEnemyBullets();
    removeShipBullets();
    moveMenuParticle();
    removeMenuParticles();

    // Checking if the player has won the game
    if (won) {
      playing = false;

      // Draw "You Won!" message
      c.fillStyle = "#2dbbff";
      c.font = "100px Roboto";
      c.fillText("You Won!", 190, 300);
      c.strokeStyle = "#FF0000";
      c.strokeText("You Won!", 190, 300);

      //Hovering Effect on Play Again
      if (!hover) {
        c.fillStyle = "#2dbbff";
        c.fillRect(300, 400, 200, 70);
        c.fillStyle = "#FF0000";
        c.font = "38px Roboto";
        c.fillText("Play Again", 307, 447);
      } else {
        c.fillStyle = "#FF0000";
        c.fillRect(300, 400, 200, 70);
        c.fillStyle = "#2dbbff";
        c.font = "38px Roboto";
        c.fillText("Play Again", 307, 447);
      }
    }
    // Checking if the player has lost
    if (lose) {
      playing = false;
      // Draw "You Won!" message
      c.fillStyle = "#2dbbff";
      c.font = "100px Roboto";
      c.fillText("Game Over!", 140, 300);
      c.lineWidth = 3;
      c.strokeStyle = "#ff000";
      c.strokeText("Game Over!", 140, 300);
      //Hovering Effect on Play Again
      if (!hover) {
        c.fillStyle = "#2dbbff";
        c.fillRect(300, 400, 200, 70);
        c.fillStyle = "#FF0000";
        c.font = "38px Roboto";
        c.fillText("Play Again", 307, 447);
      } else {
        c.fillStyle = "#FF0000";
        c.fillRect(300, 400, 200, 70);
        c.fillStyle = "#2dbbff";
        c.font = "38px Roboto";
        c.fillText("Play Again", 307, 447);
      }
    }
  }
  // Scheduling the next frame update
  requestAnimationFrame(playGame);
}

function playAgain() {
  // Reset game state
  menu = true;
  health = maxHealth;
  score = 0;
  bossAlive = true;
  bossFiring = false;
  won = false;
  lose = false;
  underFire = false;
  killCounter = 0;

  for (var i = 0; i < enemies.length; i++) {
    enemies.shift();
  }
}

function drawMenu() {
  // Reset game state
  c.fillStyle = "#101010";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Generate and rendering menu particles
  if (randomInt(0, 3) === 0) {
    menuParticles.push({
      x: canvas.width,
      y: randomInt(0, canvas.height),
      color: colors[randomInt(0, colors.length)],
      w: randomInt(4, 20),
    });
  }

  for (var i in menuParticles) {
    var particle = menuParticles[i];

    c.fillStyle = particle.color;
    c.fillRect(particle.x, particle.y, particle.w, 4);
  }

  // Rendering game title
  c.fillStyle = "#2dbbff";
  c.font = "90px Roboto";
  c.fillText("Space Impact", 150, 200);
  c.lineWidth = 2;
  c.strokeStyle = "#FF0000";
  c.strokeText("Space Impact", 150, 200);

  // Rendering "Play Game" button
  if (!hover) {
    c.fillStyle = "#2dbbff";
    c.fillRect(300, 300, 200, 70);
    c.fillStyle = "#FF0000";
    c.font = "38px Roboto";
    c.fillText("Play Game", 307, 347);
  } else {
    c.fillStyle = "#FF0000";
    c.fillRect(300, 300, 200, 70);
    c.fillStyle = "#2dbbff";
    c.font = "38px Roboto";
    c.fillText("Play Game", 307, 347);
  }
  //  Creator's information
  c.fillStyle = "#ffffff";
  c.font = "16px Roboto Mono";
  c.fillText("Created by Lakshya770", canvas.width - 240, canvas.height - 10);
}

//To remove menu particles
function removeMenuParticles() {
  if (menuParticles.length > 0 && menuParticles[0].x < 0) {
    menuParticles.shift();
  }
}
//To move menu particles
function moveMenuParticle() {
  for (var i in menuParticles) {
    var particle = menuParticles[i];
    particle.x -= 12;
  }
}
// Fill the canvas with a black background
function drawBackground() {
  c.fillStyle = "#000000";
  c.fillRect(0, 0, canvas.width, canvas.height);
}
// Drawing the red bar at the top of the screen
function drawUI() {
  c.fillStyle = "#ff001a";
  c.fillRect(0, 0, canvas.width, UIHeight + 3);
  // Drawing the gray bar below the red bar
  c.fillStyle = "#e4e4e4";
  c.fillRect(0, 0, canvas.width, UIHeight);

  // Draw the hearts to represent health
  for (var i = 0; i < maxHealth; i++) {
    if (i < health) {
      c.drawImage(
        heart.imgFull,
        40 + i * heart.width + i * 10,
        5,
        heart.width,
        heart.height
      );
    } else {
      // Draw an empty heart for lost health
      c.drawImage(
        heart.imgEmpty,
        40 + i * heart.width + i * 10,
        5,
        heart.width,
        heart.height
      );
    }
  }
  // Draw the score
  c.fillStyle = "#000000";
  c.font = "40px Roboto";
  c.fillText(score.toString(), 750, 37);

  // If the kill counter is 51 or greater, it means the boss is present
  if (killCounter >= 51) {
    var bossHP = 0;
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].type === "boss") {
        bossHP = enemies[i].lives;
      }
    }
    // Draw the boss's remaining health
    c.fillStyle = "#be646c";
    c.font = "40px Roboto";
    c.fillText("Boss HP: " + bossHP, 500, 37);
  }
}

//****************************************************** Different function definitions*************************************

// Draw ship function
function drawShip() {
  if (!menu) {
    c.drawImage(ship.img, ship.x, ship.y, ship.width, ship.height);
  }
}

// To set position of the ship
function shipSetPos(ev) {
  if (playing) {
    var rect = canvas.getBoundingClientRect();
    var mouseY = ev.clientY - rect.top - ship.height / 2;
    var mouseX = ev.clientX - rect.left - ship.width / 2;

    if (mouseX > 0 && mouseX < canvas.width / 3) {
      ship.x = mouseX;
      drawShip();
    }

    if (mouseY >= UIHeight && mouseY < canvas.height - 32) {
      ship.y = mouseY;
      drawShip();
    }
  }
}

// Setting the ship firing flag to true
function shipStartFire() {
  isShipFiring = true;
}

// Setting the flag to false
function shipStopFire() {
  isShipFiring = false;
  shipFireClock = 0;
}

// Fire bullets from the ship at the specified fire rate
function shipFire() {
  if (isShipFiring) {
    if (shipFireClock % fireRate === 0) {
      shipBullets.push({
        x: ship.x + ship.width,
        y: ship.y + ship.height / 2 - 2,
        color: colors[randomInt(0, colors.length)],
      });
    }
    shipFireClock++;
  }
}
//Draw Bullets of ship
function drawShipBullets() {
  for (var i in shipBullets) {
    var _bullet = shipBullets[i];

    c.fillStyle = _bullet.color;
    c.fillRect(_bullet.x, _bullet.y, bullet.width, bullet.height);

    _bullet.x += 10;
  }
}

// Remove ship bullets that move beyond the canvas width
function removeShipBullets() {
  if (shipBullets.length > 0 && shipBullets[0].x > canvas.width) {
    shipBullets.shift();
  }
}

// Calculate the distance between a bullet and an enemy
function distanceToEnemy(b, e) {
  var dx = b.x + bullet.width / 2 - (e.x + enemy.width / 2);
  var dy = b.y + bullet.height / 2 - (e.y + enemy.height / 2);
  return Math.sqrt(dx * dx + dy * dy);
}

// Calculate the distance between ship and an enemy
function distanceToShip(s, e) {
  var dx = s.x + ship.width / 2 - (e.x + enemy.width / 2);
  var dy = s.y + ship.height / 2 - (e.y + enemy.height / 2);
  return Math.sqrt(dx * dx + dy * dy);
}

function distanceToShipE(s, b) {
  var dx = s.x + ship.width / 2 - b.x;
  var dy = s.y + ship.height / 2 - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Calculate the distance between a bullet and the boss
function distanceToBoss(b, e) {
  var dx = b.x + bullet.width / 2 - (e.x + boss.width / 2);
  var dy = b.y + bullet.height / 2 - (e.y + boss.height / 2);
  return Math.sqrt(dx * dx + dy * dy);
}

// Calculate the distance between a bullet and the boss's laser
function distanceToBossLaser(bo) {
  var sh = ship.y + ship.height / 2;
  var b = bo.y + boss.height / 2;
  return Math.sqrt((sh - b) * (sh - b));
}

function spawnEnemy() {
  // Check if there are no enemies and the kill counter is equal to or greater than 51
  if (enemies.length === 0 && killCounter >= 51) {
    bossAlive = false;
  }
  // Spawn easy enemies if the kill counter is less than or equal to 10
  if (killCounter <= 10) {
    if (enemy.spawnClock % 35 === 0) {
      enemies.push({
        x: canvas.width,
        y: randomInt(UIHeight + 10, canvas.height - 30),
        type: "easy",
      });
    }
    enemy.spawnClock++;
  } // Spawning medium enemies if the kill counter is less than or equal to 25
  else if (killCounter <= 25) {
    // Spawning an enemy every 55th frame
    if (enemy.spawnClock % 55 == 0) {
      enemies.push({
        x: canvas.width,
        y: randomInt(UIHeight + 10, canvas.height - 30),
        type: "medium",
        shootClock: 0,
      });
    }
    enemy.spawnClock++;
  }
  // Spawn hard enemies if the kill counter is less than or equal to 50
  else if (killCounter <= 50) {
    // Spawn an enemy every 60th frame
    if (enemy.spawnClock % 60 == 0) {
      enemies.push({
        x: canvas.width,
        y: randomInt(UIHeight + 10, canvas.height - 30),
        type: "hard",
        shootClock: 0,
        horizontal: randomInt(0, 1) == 0 ? 3 : -3,
      });
    }
    enemy.spawnClock++;
  }
  // Spawn the boss enemy if the kill counter is greater than 50 and the boss is not already alive
  else {
    if (!bossAlive && !won) {
      enemies.push({
        x: canvas.width - 100,
        y: canvas.height / 2,
        type: "boss",
        shootClock: 0,
        horizontal: randomInt(0, 1) == 0 ? 2 : -2,
        lives: 100,
        firing: false,
      });
      bossAlive = true;
    }
  }
}

function drawEnemy() {
  for (var i in enemies) {
    var _enemy = enemies[i];

    if (_enemy.type != "boss") {
      // Alternate between two enemy images
      if (gif++ % 50 < 25) {
        c.drawImage(enemy.img1, _enemy.x, _enemy.y, enemy.width, enemy.height);
      } else {
        c.drawImage(enemy.img2, _enemy.x, _enemy.y, enemy.width, enemy.height);
      }
    } else {
      if (bossFiring === false) {
        c.drawImage(boss.img1, _enemy.x, _enemy.y, boss.width, boss.height);
      } else {
        c.drawImage(boss.img2, _enemy.x, _enemy.y, boss.width, boss.height);
        // Draw firing animation for boss
        c.fillStyle = "#4ad2ff";
        c.fillRect(0, _enemy.y + 38, _enemy.x + 50, 50);
        c.fillStyle = "#fffcf9";
        c.fillRect(0, _enemy.y + 48, _enemy.x + 50, 30);
      }
    }

    if (gif >= 1000000) {
      gif = 15;
    }
    // Move easy enemy to the left
    if (_enemy.type === "easy") {
      _enemy.x -= 5;
    }
    // Move medium enemy to the left
    else if (_enemy.type === "medium") {
      _enemy.x -= 4;

      if (_enemy.shootClock % 120 == 0) {
        // Shoot bullets periodically
        enemyBullets.push({
          x: _enemy.x,
          y: _enemy.y,
          type: "medium",
        });
      }
      _enemy.shootClock++;
    } else if (_enemy.type === "hard") {
      // Move hard enemy to the left and implementing  vertical movement
      _enemy.x -= 6;

      if (_enemy.y >= canvas.height - 30 || _enemy.y <= UIHeight + 10) {
        _enemy.horizontal *= -1;
      }
      _enemy.y += _enemy.horizontal;

      if (_enemy.shootClock % 120 == 0) {
        // Shoot bullets periodically
        enemyBullets.push({
          x: _enemy.x,
          y: _enemy.y,
          type: "hard",
        });
      }
      _enemy.shootClock++;
    } else if (_enemy.type === "boss") {
      // Implementing vertical movement for boss
      if (_enemy.y >= canvas.height - 100 || _enemy.y <= UIHeight) {
        _enemy.horizontal *= -1;
      }
      _enemy.y += _enemy.horizontal;

      if (_enemy.shootClock % 300 === 0) {
      }
      // Set boss firing animation based on shootClock value

      if (_enemy.shootClock % 300 >= 0 && _enemy.shootClock % 300 <= 80) {
        bossFiring = true;
      } else {
        bossFiring = false;
      }
      _enemy.shootClock++;
    }
  }
}

function drawEnemyBullets() {
  for (var i in enemyBullets) {
    var _bullet = enemyBullets[i];

    if (_bullet.type === "medium") {
      // Drawing medium enemy's bullet
      c.fillStyle = "#ff0700";
      c.fillRect(_bullet.x, _bullet.y, bullet.width, bullet.height);

      _bullet.x -= 7;
      // Move bullet to the left
    } else if (_bullet.type === "hard") {
      // Drawing  hard enemy's bullet
      c.fillStyle = "#ffdf00";
      c.fillRect(_bullet.x, _bullet.y, bullet.width, bullet.height);
      // Move bullet to the lef
      _bullet.x -= 10;
    }
  }
}

function checkEnemyBullets() {
  for (var i in enemyBullets) {
    var _bullet = enemyBullets[i];
    // Checking distance if close to ship decrease health
    if (distanceToShipE(ship, _bullet) <= 20) {
      _bullet.x = 0;
      _bullet.y = -10000;

      health--;
    }
  }
}

function removeEnemyBullets() {
  if (enemyBullets.length > 0 && enemyBullets[0].x < 0) {
    enemyBullets.shift();
    // Remove bullet if it goes offscreen
  }
}

function checkEnemy() {
  for (var i = 0; i < enemies.length; i++) {
    for (var j = 0; j < shipBullets.length; j++) {
      if (
        !won &&
        enemies[i].type != "boss" &&
        distanceToEnemy(shipBullets[j], enemies[i]) < 25
      ) {
        enemies[i].y = -10000;
        shipBullets[j].y = -10000;

        enemies[i].x = 0;
        shipBullets[j].x = canvas.width - bullet.width;

        // Increasing kill counter if bullet hit enemy

        killCounter++;

        if (enemies[i].type === "easy") {
          score += scores.easy;
        } else if (enemies[i].type === "medium") {
          score += scores.medium;
        } else if (enemies[i].type === "hard") {
          score += scores.hard;
        }
      }
      // if game is won or not
      if (
        !won &&
        enemies[i].type === "boss" &&
        // Checking for distance between boss and bullet
        distanceToBoss(shipBullets[j], enemies[i]) < 50
      ) {
        if (enemies[i].lives > 0) {
          // Decrease live of enemy if bullet hit
          enemies[i].lives--;
        } else {
          // If boss dead updating score
          bossAlive = false;
          killCounter++;
          score += scores.boss;
          won = true;

          for (var x = 0; x < enemies.length; x++) {
            enemies.pop();
          }
        }

        shipBullets[j].y = -10000;
      }
    }
  }
}

function removeEnemy() {
  if (enemies.length > 0 && enemies[0].x <= 0) {
    //Remove enemy if it goes offscreen
    enemies.shift();
  }
}

function checkShip() {
  for (var i = 0; i < enemies.length; i++) {
    if (distanceToShip(ship, enemies[i]) < 25) {
      enemies[i].y = -10000;
      enemies[i].x = 0;

      health--;
    }
  }
}

function checkBoss() {
  for (var i = 0; i < enemies.length; i++) {
    if (!won && enemies[i].type === "boss") {
      if (!bossFiring) {
        underFire = false;
      }
      // If laser of boss hit health should be reduced
      if (bossFiring && distanceToBossLaser(enemies[i]) < 25 && !underFire) {
        health--;

        underFire = true;
      }
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
