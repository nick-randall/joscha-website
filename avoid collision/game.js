function setup() {
    createCanvas(windowWidth, windowHeight);
}


let rectY = 55;
let rectX = 55;
let goingup = true;
let goingright = true;


let circleY = 200;
let circleX = 400;



let triX = 300;
let triY = 300;
let triGoingUp = false;
let triGoingRight = false;

let score = 10;
let canLosePoint = true;

let triScore = 10;
let triCanLosePoint = true;


let circles = [
    { x: 1000, y: 350, r: 11 / 2 },
    { x: 850,  y: 450, r: 11 / 2 },
    { x: 500,  y: 250, r: 11 / 2 },
    { x: 250,  y: 850, r: 11 / 2 },


    { x: 300,  y: 300, r: 11 / 2 },
    { x: 1200, y: 700, r: 11 / 2 },
    { x: 600,  y: 900, r: 11 / 2 }
];



function rectCircleCollision(rx, ry, rw, rh, cx, cy, cr) {
    let testX = cx;
    let testY = cy;
    
    if (cx < rx) testX = rx;
    else if (cx > rx + rw) testX = rx + rw;
    if (cy < ry) testY = ry;
    else if (cy > ry + rh) testY = ry + rh;
    
    let distX = cx - testX;
    let distY = cy - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
    
    return distance <= cr;
}

function triCircleCollision(tx, ty, cx, cy, cr) {
    // Check collision for all three points of the triangle
    let p1x = tx + 50, p1y = ty - 40;
    let p2x = tx + 20, p2y = ty;
    let p3x = tx + 80, p3y = ty;
    
    // Check distance from circle center to each triangle point
    let d1 = Math.sqrt((p1x - cx) ** 2 + (p1y - cy) ** 2);
    let d2 = Math.sqrt((p2x - cx) ** 2 + (p2y - cy) ** 2);
    let d3 = Math.sqrt((p3x - cx) ** 2 + (p3y - cy) ** 2);
    
    // Also check if circle center is inside triangle bounds (rough check)
    let triLeft = Math.min(p1x, p2x, p3x);
    let triRight = Math.max(p1x, p2x, p3x);
    let triTop = Math.min(p1y, p2y, p3y);
    let triBottom = Math.max(p1y, p2y, p3y);
    
    let circleInBounds = (cx >= triLeft - cr && cx <= triRight + cr && 
                          cy >= triTop - cr && cy <= triBottom + cr);
    
    return d1 <= cr || d2 <= cr || d3 <= cr || circleInBounds;
}

function keyPressed() {
    if (key === "ArrowUp") goingup = true;
    if (key === "ArrowDown") goingup = false;


    if (key === "w" || key === "W") triGoingUp = true;
    if (key === "s" || key === "S") triGoingUp = false;

    if (key === "I" || key === "i") circleY = circleY - 30;
    if (key === "K" || key === "k") circleY = circleY + 30;
    if (key === "J" || key === "j") circleX = circleX - 30;
    if (key === "L" || key === "l") circleX = circleX + 30;
}

function draw() {
    background(220);

 
    textSize(24);
    fill(0);
    text("Rect Score: " + score, 20, 40);
    text("Triangle Score: " + triScore, 20, 70);

    text("rectX: " + rectX, 500, 50);
    text("rectY: " + rectY, 700, 50);
    text("triX: " + triX, 900, 50);
    text("triY: " + triY, 1100, 50);



    if (rectY > height - 100) goingup = true;
    if (rectY < 0) goingup = false;
    rectY += goingup ? -3 : 3;

    if (rectX > width - 100) goingright = false;
    if (rectX < 0) goingright = true;
    rectX += goingright ? 3 : -3;

    circle(circleX, circleY, 30);
    rect(rectX, rectY, 100, 100, 20);

 
    if (triY > height - 100) triGoingUp = true;
    if (triY < 0) triGoingUp = false;
    triY += triGoingUp ? -3 : 3;

    if (triX > width - 100) triGoingRight = false;
    if (triX < 0) triGoingRight = true;
    triX += triGoingRight ? 3 : -3;
  
    push();
    fill(100, 150, 255);
    noStroke();
    triangle(triX + 50, triY - 40,   triX + 20, triY, triX + 80, triY         
    );
    pop();


    for (let c of circles) {
        circle(c.x, c.y, c.r * 2);
    }


    for (let c of circles) {
        if (rectCircleCollision(rectX, rectY, 100, 100, c.x, c.y, c.r)) {
            if (canLosePoint) {
                score--;
                canLosePoint = false;
                setTimeout(() => canLosePoint = true, 500);
            }
        }
    }

    for (let c of circles) {
        if (triCircleCollision(triX, triY, c.x, c.y, c.r)) {
            if (triCanLosePoint) {
                triScore--;
                triCanLosePoint = false;
                setTimeout(() => triCanLosePoint = true, 500);
            }
        }
    }

}    