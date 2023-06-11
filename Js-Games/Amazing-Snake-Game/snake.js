function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 400;
	pen = canvas.getContext('2d');
	cs = 26;
	game_over = false;
	score = 0;


	//Create a Image Object for food
	food_img = new Image(); 
	// food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:3,
		color:"blue",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				// pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},

		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;

			}
			else
			{
				this.cells.pop();
			}

			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

			/*Write a Logic that prevents snake from going out*/
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}

		}

	};

	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed) ;
	
}


function draw(){
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);

	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food

}

function gameloop() {
	if (game_over == true) {
	  clearInterval(f);
	  showResult();
	  return;
	}
	draw();
	update();
  }

function startGame() {
	init();
	clearInterval(f);
	f = setInterval(gameloop, 100);
    document.getElementById('start-button').disabled = true;
}
  
function showResult() {
	// Clear the canvas
	pen.clearRect(0, 0, W, H);
  
	// Set the result text style
	pen.fillStyle = "black";
	pen.font = "40px Roboto";
	pen.textAlign = "center";
	pen.textBaseline = "middle";
  
	// Display the result message
	pen.fillText("Game Over", W / 2, H / 2);
	pen.font = "30px Roboto";
	pen.fillText("Score: " + score, W / 2, H / 2 + 50);

	// Enable the start button
    document.getElementById('start-button').disabled = false;
  }
  

document.getElementById('start-button').addEventListener('click', startGame);

init();

var f = setInterval(gameloop,100);



