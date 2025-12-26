const canvas = document.getElementById("gameCanvas");
function setup() {
createCanvas(windowWidth, windowHeight);
       background(220)
      //    const button = createButton("frog");
      //   button.mouseClicked(() => console.log());
      //  button.position(windowHeight / 2, windowWidth / 2);
}

let rectX = 50;
let rectY = 50;
let rectgoingRight = true;
let rectgoingUp = false;
let circleX = 550;
let circleY = 550;
let circlegoingRight = true;
let circlegoingUp = false;
let rectlives = 3;


function keyPressed() {
  if (key === 'ArrowRight') {
    rectgoingRight = true;
  } else if (key === 'ArrowLeft') {
    rectgoingRight = false;
  } else if (key === 'ArrowUp') {
    rectgoingUp = true;
  } else if (key === 'ArrowDown') {
    rectgoingUp = false;
  }
  if (key === 'd') {
    circlegoingRight = true;
  } else if (key === 'a') {
    circlegoingRight = false;
  } else if (key === 'w') {
    circlegoingUp = true;
  } else if (key === 's') {
    circlegoingUp = false;
  }
}


function draw() {

  if (rectgoingRight) {
    rectX += 10;
  } else {
    rectX -= 10;
  }

  if (rectX > width - 60) {
    rectgoingRight = false;
  }
  if (rectX < 0) {
    rectgoingRight = true;
  }

   if (rectgoingUp) {
    rectY -= 10;
  } else {
    rectY += 10;
  }

  if (rectY > height - 60) {
    rectgoingUp = true;
  }
  if (rectY < 0) {
    rectgoingUp = false;
  }
  if (circlegoingRight) {
    circleX += 5;
  } else {
    circleX -= 5;
  }

  if (circleX > width - 60) {
    circlegoingRight = false;
  }
  if (circleX < 0) {
    circlegoingRight = true;
  }

   if (circlegoingUp) {
    circleY -= 5;
  } else {
    circleY += 5;
  }

  if (circleY > height - 60) {
    circlegoingUp = true;
  }
  if (circleY < 0) {
    circlegoingUp = false;
  }
  if (Math.abs(circleX - rectX) < 60 && Math.abs(circleY - rectY) < 60){
    rectlives -= 1;
    rectX = 50;
    rectY = 50;
    circleX = 550;
    circleY = 550;
    console.log("Rectangle Lives: " + rectlives);
  }
     background(220);
  if (rectlives <= 0){
    alert("Game Over for Rectangle!");
    rectlives = 3;
  }
 text("Rectangle Lives: " + rectlives, 110, 120);
 rect(rectX,rectY,60)
 circle(circleX, circleY, 60);
}