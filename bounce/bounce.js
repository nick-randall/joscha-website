function setup() {
  createCanvas(1900, 940);
}
let bouncerx = 900;
let bouncery = 600;
let objectx = 400;
let objecty = 800;
let floor = 600;
let isonfloor = true;
let pressedc = false;
let pressedb = false;
let bcounter = 1;


function jump() {
  bouncery = bouncery - 100;
  }


function keyPressed() {
  if (key === " ") {
    jump();
  }
  if (key === "d") {
    bouncerx = bouncerx + 100;
  }
  if (key === "a") {
    bouncerx = bouncerx - 100;
  }
  if (key === "w") {
    bouncery = bouncery - 100;
  }
  if (key === "s") {
    bouncery = bouncery + 100;
  }
  if (key ==="c") {
    if (pressedc === false) {
      pressedc = true;
    } else {
      pressedc = false;
    }
  }
  if (key ==="b") {
      console.log("b was pressed " + bcounter + " times");
      bcounter = bcounter + 1;
    if (pressedb === false) {
      pressedb = true;
    } else {
      pressedb = false;
    }
  }
}

function draw() {
  if (bouncery < floor || bouncerx < 301 || bouncerx > 1390) {
    isonfloor = false;
    console.log("test");
  } else {
    isonfloor = true;
  }
  if (isonfloor === false) {
    bouncery = bouncery + 5;
    }
    if (pressedc === true) {
      bouncery = bouncery - 10;
    }
    if (pressedb === true) {
      floor = bouncery;
      pressedc = false;
    } else {
      floor = 600;
    }
  background(200);
  fill(100, 200, 300);
  rect(objectx, objecty, 1000, 100);
  fill(255, 255, 0);
  rect(bouncerx, bouncery, 100, 200);
}














