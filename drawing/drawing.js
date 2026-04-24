function setup() {
  createCanvas(windowWidth, windowHeight);
}
mouseX;
mouseY;
circleX = mouseX;
circleY = mouseY;

function draw() {
  background(220);
  fill(150, 0, 150);
  circle(circleX, circleY, 35);
}