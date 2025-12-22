function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
}

let X = 100;
let Y = 100;

function keyPressed() {
    if (key === 'ArrowRight') {
        X += 10;
    } else if (key === 'ArrowLeft') {
        X -= 10;
    } else if (key === 'ArrowUp') {
        Y -= 10;
    } else if (key === 'ArrowDown') {
        Y += 10;
    }
}

function draw() {
    background(220);
    circle(X, Y, 50, 50);
}


document.getElementById("myButton").addEventListener("click", function() {
    alert("Button was clicked!");
});