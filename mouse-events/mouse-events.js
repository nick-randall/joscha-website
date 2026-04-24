let currentMouseX = 0;
let currentMouseY = 0;
let rectX = 300;
let rectY = 300;
let rectWidth = 50;
let rectHeight = 37;
let isRectMoved = false;


function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CORNER); 
}

function mouseMoved() {
    currentMouseX = mouseX;
    currentMouseY = mouseY;
}



 function mouseClicked(){
    let clickedInside = isPointInRect(
        mouseX,
        mouseY,
        rectX,
        rectY,
        rectWidth,
        rectHeight
    );
    if (clickedInside) {
        isRectMoved = !isRectMoved;
    }
 }

function draw() {
    background(220);
    let isInside = isPointInRect(
        currentMouseX,
        currentMouseY,
        rectX,
        rectY,
        rectWidth,
        rectHeight
    );
    if (isRectMoved) {
        rectX = mouseX - 20;
        rectY = mouseY - 15;
    }
    
    rect(rectX, rectY, rectWidth, rectHeight);
}

function isPointInRect(mouseX, mouseY, rectX, rectY, rectWidth, rectHeight) {
    let leftSide = rectX;
    let rightSide = rectX + rectWidth;
    let topSide = rectY;
    let bottomside = rectY + rectHeight;
circle(mouseX, mouseY, 35);
    return mouseX < rightSide && mouseX > leftSide && mouseY > topSide && mouseY < bottomside;
}
