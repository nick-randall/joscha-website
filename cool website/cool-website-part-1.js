function setup() {
    createCanvas(600, 400);
    background(220);
}
    let coolclicks = 0
    let badclicks = 0
    let circleX = 55
    let circleY = 55
    let goingRight = true
    let goingUp = false

   function keyPressed() {
        if (key ==="ArrowRight") {
            goingRight = true
        }
        if (key ==="ArrowLeft") {
            goingRight = false
        }
        if (key ==="ArrowUp") {
            goingUp = true
        }
        if (key ==="ArrowDown") {
            goingUp = false
        }
   }



function draw() {
        background(220);
        if (goingRight) {
            circleX += 2
        } else {
            circleX -= 2
        }

        if (goingUp) {
            circleY -= 2
        } else {
            circleY += 2
        }

        if (circleX >= width - 15) {
            goingRight = false
        }
        if (circleX <= 15) {
            goingRight = true
        }
        if (circleY >= height - 15) {
            goingUp = true
        }
        if (circleY <= 15) {
            goingUp = false
        }



    circle(circleX, circleY, 50);
    text("Use Arrow Keys to Move the Circle and have fun!", 100, 120);
}



function goodclicked() {
    const coolButton = document.getElementById("cool-button");
    coolButton.addEventListener("click", function() {
        alert("You clicked the cool button!");
        coolclicks = coolclicks + 1;
        document.getElementById("cool-clicks").textContent = coolclicks;
    });
}
function badclicked() {
    const badButton = document.getElementById("bad-button");
    badButton.addEventListener("click", function() {
        alert("You clicked the bad button! Oh no!");
        badclicks = badclicks + 1;
        document.getElementById("bad-clicks").textContent = badclicks;
    });
}


goodclicked();
badclicked();

