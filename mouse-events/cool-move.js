function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CORNER);
    
    // Prevent right-click context menu
    document.addEventListener('contextmenu', event => event.preventDefault());
}

let rectX = 300;
let rectY = 300;


function draw() {
    background(220);
    rect(rectX, rectY, 40, 27);
    if (mouseIsPressed) {
        if (mouseButton === RIGHT) {
            rectX = rectX - 10;
        }
        if (mouseButton === LEFT) {
            rectX = rectX + 10;
        }
    }
}


function mouseClicked() {
    
}