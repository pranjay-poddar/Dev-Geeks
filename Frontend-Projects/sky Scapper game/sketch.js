
const { Events, Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
let blockes;
let world, engine;
let mConstraint;
let slingshot;
let box_length = 40;

let dotImg;
let boxImg;
let bkgImg;

let render;

function preload() {
  dotImg = loadImage('images/block.png');
  boxImg = loadImage('images/base.png');
  bkgImg = loadImage('images/skyBackground.png');
}

function setup() {
  const canvas = createCanvas(1283, 795);
  engine = Engine.create();
  world = engine.world;
  // Creating 3 bodies that later I will add into the world before
  ground = new Ground(width / 2, height - 10, width, 20);
  box_x = Math.floor((Math.random() * 550) + 50);
  box = new Box(box_x, 726, 84, 100);
  score = new Score(10,10, 150,30);
  block = new Block(150, 200, 85, 85);
  
  slingshot = new SlingShot(300, 30, block.body);
  blockes = [block]

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == ' ') {
    setup()
  }
  if (key == 'Enter') {
    slingshot.fly();
    setTimeout(() => {
      new_block = new Block(140, 200, 85, 85);
      slingshot.attach(new_block.body);
      blockes.push(new_block)
    }, 1500);
  
    setTimeout(() => {
      setScore()
    }, 2000); 
  }
}

function setScore(){
  box_x = this.box.body.position.x;
  points = 0
  for (const bl of blockes) {
    bl_x = bl.body.position.x;
    for (let i = 10; i > 0; i--) {
      diff =  box_length/i
      if( bl_x > (box_x - diff) && bl_x < (box_x + diff) ) {
        points += 10 * i;
        break;
      }; 
    }
  };
  score.points = points
}

function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);

  ground.show();
  box.show();
  score.show();
  slingshot.show();
  for (const b of blockes) {
    b.show();
  };
}
