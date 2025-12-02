function setup() {
  createCanvas(windowWidth, windowHeight);
}

let sphereX = 0;
let sphereY = 0;
let sphereRotation = 0;

let goingRight = true;
let goingUp = true;

 function keyPressed() {
  if (key === 'ArrowLeft') {
    goingRight = false;
  }
    if (key === 'ArrowRight') {
    goingRight = true;
  }
  
    if (key === 'ArrowUp') {
    goingUp = false;
  }
    if (key === 'ArrowDown') {
    goingUp = true;
  }
  
}




function draw() {
  background(234);
  push();
  translate(100, 100);
  fill(0); 
  textSize(100);
  text(sphereX, 0, 0); 
  text( goingRight, 100, 100);
  translate(100, 200);
  text(sphereY, 0, 0); 
  text( goingUp, 100, 100);
  pop();
if (sphereX > 1400) {
 goingRight = false;}
 console.log(goingRight);
if (sphereX < - 30) {
  goingRight = true;
}
if (sphereY > 800) {
 goingUp = false;}
 console.log(goingUp);
if (sphereY < 0) {
  goingUp = true;
}


if (goingRight == true) {
 sphereX = sphereX + 3;
} else {
  sphereX = sphereX - 3;
}
if (goingUp == true) {
 sphereY = sphereY + 3;
} else {
  sphereY = sphereY - 3;
}
 sphereRotation = sphereRotation + 0.1;
 translate(sphereX, sphereY);
   circle(50, 0, 80);
}
