class Score {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.body.isStatic = true;
    this.w = w;
    this.h = h;
    this.points = 0
    Matter.World.add(world, this.body);
  }

  show() {
    rect(0, 0, this.w, this.h);
    fill(204,255,255)
    text("Points: " + this.points, 20, 20)
  }
}
