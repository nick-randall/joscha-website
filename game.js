function setup() {
  createCanvas(windowWidth, windowHeight);
}

let sphereX = 0;
let sphereY = 0;

let goingRight = true;
let goingUp = false;

let rectX = 0;
let rectY = 0;

let goingRight2 = true;
let goingUp2 = false;

const shape1 = createshape(0, 0);
const shape2 = createshape(300, 300);

function keyPressed() {
  if (key === "ArrowLeft") {
    goingRight = false;
  }
  if (key === "ArrowRight") {
    goingRight = true;
  }

  if (key === "ArrowUp") {
    goingUp = false;
  }
  if (key === "ArrowDown") {
    goingUp = true;
  }
  if (key === "a") {
    goingRight2 = false;
  }
  if (key === "d") {
    goingRight2 = true;
  }

  if (key === "s") {
    goingUp2 = false;
  }
  if (key === "w") {
    goingUp2 = true;
  }
}

function draw() {
  background(234);
  push();

  translate(100, 100);
  text(shape1.y, 0, 0);

  // fill(0);
  // textSize(100);
  // text(rectX, 0, 0);
  // text(goingRight2, 100, 100);
  // translate(100, 200);
  // text(rectY, 0, 0);
  // text(goingUp2, 100, 100);
  pop();

  push();
  shape1.checkAllSides();
  shape1.move();
  translate(shape1.x, shape1.y);
  circle(50, 0, 80);
  pop();

  push();
  shape2.checkAllSides();
  shape2.move();
  translate(shape2.x, shape2.y);
  rect(100, 100, 100);
  pop();
}
