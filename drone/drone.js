function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
}

let droneX = 0;
let droneY = 100;
let pickupX = 400;
let pickupY = 300;
let deliveryX = 600;
let deliveryY = 600;
let carryingPackage = false;
function keyPressed() {
    if (key === "ArrowRight") {
        droneX += 20;
        if (carryingPackage == true) {
            pickupX += 20;
        }
    } else if (key === "ArrowLeft") {
        droneX -= 20;
        if (carryingPackage == true) {
            pickupX -= 20;
        }
    } else if (key === "ArrowUp") {
        droneY -= 20;
        if (carryingPackage == true) {
            pickupY -= 20;
        }
    } else if (key === "ArrowDown") {
        droneY += 20;
        if (carryingPackage == true) {
            pickupY += 20;
        }
    } 
        // Check if drone is at pickup location
        if (droneX >= pickupX && droneX <= pickupX + 50 && droneY >= pickupY && droneY <= pickupY + 50) {
            carryingPackage = true;
            console.log("Package picked up!");
        } else if (carryingPackage == true) {
            pickupX = droneX;
            pickupY = droneY;
        }
        if (droneX >= deliveryX && droneX <= deliveryX + 100 && droneY >= deliveryY  && droneY <= deliveryY + 0 && carryingPackage == true) {
            carryingPackage = false;
            console.log("Package delivered!");
        }
    
}
function draw() {
    background(220);

    // Draw pickup location

    fill(255, 0, 0);
    rect(deliveryX, deliveryY + 30, 100, 50);
    fill(255, 255, 0);
    rect(pickupX, pickupY, 50, 50);
        fill(0, 255, 0);
    rect(droneX, droneY, 50, 20);

    // Draw drone
    fill(0, 0, 255);


}