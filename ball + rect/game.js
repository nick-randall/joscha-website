function setup() {
  createCanvas(windowWidth, windowHeight);
}

const shape1 = createshape(0, 0, "ArrowRight", "ArrowLeft","ArrowUp" , "ArrowDown");
const shape2 = createshape(300, 300, "d", "a","w","s" );


function keyPressed() {
 shape1.control(key);
 shape2.control(key);
}

function draw() {
  push();
  shape1.checkAllSides();
  shape1.move();
  shape1.control();
  translate(shape1.x, shape1.y);
  circle(50, 0, 80);
  pop();

  push();
  shape2.checkAllSides();
  shape2.move();
  shape2.control();
  translate(shape2.x, shape2.y);
  rect(50, 0, 80,);
  pop();
}