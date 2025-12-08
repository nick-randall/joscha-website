function setup() {
    createCanvas(windowWidth, windowHeight);
}

let rectY = 55
let rectX = 55
let goingup = true
let goingright = true

function keyPressed() {
    if (key === "ArrowUp") {
        goingup = true
    }
    if (key === "ArrowDown") {
        goingup = false
    }
}

function draw() {
    if (rectY > 750) {
        goingup = true
    }
    if (rectY < 0) {
        goingup = false
    }
    if (goingup) {
        rectY = rectY - 3
    } else {
        rectY = rectY + 3
    }
    if (rectX > 1400) {
        goingright = false
    }
    if (rectX < 0) {
        goingright = true
    }
    if (goingright) {
        rectX = rectX + 3
    } else {
        rectX = rectX - 3
    }
    background(220);
   rect(rectX, rectY, 55)
    

}

