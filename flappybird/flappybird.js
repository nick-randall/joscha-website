function setup() {
    createCanvas(windowWidth, windowHeight);
    applyDifficulty('medium');
    resetGame();
    gameState = 'menu';
}

let lives = 5;
let score = 0;
let gameState = 'menu';
let selectedDifficulty = 'medium';

let difficultySettings = {
    easy: {
        lives: 7,
        gap: 250,
        spacing: 460,
        speed: 3
    },
    medium: {
        lives: 5,
        gap: 210,
        spacing: 380,
        speed: 4
    },
    hard: {
        lives: 3,
        gap: 170,
        spacing: 320,
        speed: 5.2
    }
};

let flappybirdheight = 0;
let birdVelocity = 0;
let birdSize = 50;
let birdX = 100;
let gravity = 0.8;
let jumpStrength = -12;

let obstacles = [];
let obstacleWidth = 50;
let obstacleGap = 210;
let obstacleSpeed = 4;
let obstacleSpacing = 380;

function applyDifficulty(level) {
    selectedDifficulty = level;
    obstacleGap = difficultySettings[level].gap;
    obstacleSpacing = difficultySettings[level].spacing;
    obstacleSpeed = difficultySettings[level].speed;
}

function resetGame() {
    lives = difficultySettings[selectedDifficulty].lives;
    score = 0;
    flappybirdheight = (height - birdSize) / 2;
    birdVelocity = 0;
    obstacles = [];
    addObstacle(width * 0.75);
    addObstacle(width * 1.2);
    addObstacle(width * 1.65);
}

function addObstacle(x = width) {
    let minPipeHeight = 40;

    obstacles.push({
        x,
        gapTop: random(minPipeHeight, height - obstacleGap - minPipeHeight),
        hasHitBird: false,
        hasScored: false
    });
}

function isBirdTouchingObstacle(obstacle) {
    let birdLeft = birdX;
    let birdRight = birdLeft + birdSize;
    let birdTop = flappybirdheight;
    let birdBottom = birdTop + birdSize;

    let obstacleLeft = obstacle.x;
    let obstacleRight = obstacle.x + obstacleWidth;
    let overlapsHorizontally = birdRight > obstacleLeft && birdLeft < obstacleRight;
    let hitsTopPipe = birdTop < obstacle.gapTop;
    let hitsBottomPipe = birdBottom > obstacle.gapTop + obstacleGap;

    return overlapsHorizontally && (hitsTopPipe || hitsBottomPipe);
}

function keyPressed() {
    if (key === ' ') {
        if (gameState === 'playing') {
            birdVelocity = jumpStrength;
        }
    }
}

function getMenuButtons() {
    return [
        {
            label: 'Easy',
            level: 'easy',
            x: width / 2 - 120,
            y: height / 2 - 30,
            width: 240,
            height: 56
        },
        {
            label: 'Medium',
            level: 'medium',
            x: width / 2 - 120,
            y: height / 2 + 40,
            width: 240,
            height: 56
        },
        {
            label: 'Hard',
            level: 'hard',
            x: width / 2 - 120,
            y: height / 2 + 110,
            width: 240,
            height: 56
        }
    ];
}

function isPointInRect(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {
    return (
        pointX >= rectX &&
        pointX <= rectX + rectWidth &&
        pointY >= rectY &&
        pointY <= rectY + rectHeight
    );
}

function drawMenu() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(56);
    text('Flappy Bird', width / 2, height / 2 - 130);
    textSize(24);
    text('Select Difficulty', width / 2, height / 2 - 70);

    for (let button of getMenuButtons()) {
        fill(245);
        rect(button.x, button.y, button.width, button.height, 10);
        fill(0);
        textSize(28);
        text(button.label, button.x + button.width / 2, button.y + button.height / 2);
    }
}

function getGameOverButtons() {
    return {
        respawn: {
            x: width / 2 - 120,
            y: height / 2 + 40,
            width: 240,
            height: 56
        },
        home: {
            x: width / 2 - 120,
            y: height / 2 + 110,
            width: 240,
            height: 56
        }
    };
}

function drawGameOver() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text('Game Over', width / 2, height / 2 - 20);
    textSize(24);
    text('Score: ' + score, width / 2, height / 2 + 10);

    let buttons = getGameOverButtons();

    fill(255);
    rect(buttons.respawn.x, buttons.respawn.y, buttons.respawn.width, buttons.respawn.height, 12);
    rect(buttons.home.x, buttons.home.y, buttons.home.width, buttons.home.height, 12);

    fill(0);
    textSize(24);
    text('Respawn', width / 2, buttons.respawn.y + buttons.respawn.height / 2);
    text('Home Menu', width / 2, buttons.home.y + buttons.home.height / 2);
}

function drawBird() {
    let bodyWidth = birdSize;
    let bodyHeight = birdSize * 1.25;
    let bodyYOffset = birdSize * 0.2;
    let bodyTop = flappybirdheight - bodyYOffset;
    let centerX = birdX + bodyWidth / 2;
    let centerY = bodyTop + bodyHeight / 2;
    let isOnFloor = flappybirdheight >= height - birdSize;
    let flap = isOnFloor ? 0 : sin(frameCount * 0.7);
    let wingLift = flap * bodyHeight * 0.14;

    noStroke();

    fill(255, 210, 0);
    rect(birdX, bodyTop, bodyWidth, bodyHeight);

    fill(245, 170, 0);
    rect(
        birdX + bodyWidth * 0.16,
        bodyTop + bodyHeight * 0.44 + wingLift,
        bodyWidth * 0.42,
        bodyHeight * 0.2
    );

    fill(255, 140, 0);
    triangle(
        birdX + bodyWidth,
        bodyTop + bodyHeight * 0.5,
        birdX + bodyWidth * 1.22,
        bodyTop + bodyHeight * 0.4,
        birdX + bodyWidth * 1.22,
        bodyTop + bodyHeight * 0.6
    );

    fill(255);
    ellipse(centerX + bodyWidth * 0.2, centerY - bodyHeight * 0.2, bodyWidth * 0.2, bodyWidth * 0.2);
    fill(0);
    ellipse(centerX + bodyWidth * 0.22, centerY - bodyHeight * 0.2, bodyWidth * 0.08, bodyWidth * 0.08);
}

function mousePressed() {
    if (gameState === 'menu') {
        for (let button of getMenuButtons()) {
            if (isPointInRect(mouseX, mouseY, button.x, button.y, button.width, button.height)) {
                applyDifficulty(button.level);
                resetGame();
                gameState = 'playing';
                return;
            }
        }

        return;
    }

    if (gameState !== 'gameover') {
        return;
    }

    let buttons = getGameOverButtons();

    if (isPointInRect(mouseX, mouseY, buttons.respawn.x, buttons.respawn.y, buttons.respawn.width, buttons.respawn.height)) {
        resetGame();
        gameState = 'playing';
    }

    if (isPointInRect(mouseX, mouseY, buttons.home.x, buttons.home.y, buttons.home.width, buttons.home.height)) {
        gameState = 'menu';
    }
}

function draw() {
    background(220);

    if (gameState === 'menu') {
        drawMenu();
        return;
    }

    if (gameState === 'gameover') {
        drawGameOver();
        return;
    }

    fill(33, 255, 0);

    let rightMostObstacle = obstacles[obstacles.length - 1];

    if (!rightMostObstacle || rightMostObstacle.x <= width - obstacleSpacing) {
        addObstacle();
    }

    for (let obstacle of obstacles) {
        obstacle.x -= obstacleSpeed;

        if (!obstacle.hasScored && obstacle.x + obstacleWidth < birdX) {
            score += 1;
            obstacle.hasScored = true;
        }

        if (!obstacle.hasHitBird && isBirdTouchingObstacle(obstacle)) {
            lives -= 1;
            obstacle.hasHitBird = true;

            if (lives <= 0) {
                gameState = 'gameover';
            }
        }

        rect(obstacle.x, 0, obstacleWidth, obstacle.gapTop);
        rect(
            obstacle.x,
            obstacle.gapTop + obstacleGap,
            obstacleWidth,
            height - obstacle.gapTop - obstacleGap
        );
    }

    obstacles = obstacles.filter((obstacle) => obstacle.x + obstacleWidth > 0);

    birdVelocity += gravity;
    flappybirdheight += birdVelocity;

    if (flappybirdheight < 0) {
        flappybirdheight = 0;
        birdVelocity = 0;
    }

    if (flappybirdheight > height - birdSize) {
        flappybirdheight = height - birdSize;
        birdVelocity = 0;
    }

    drawBird();

    fill(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text('Lives: ' + lives, 20, 20);
    textAlign(RIGHT, TOP);
    text('Score: ' + score, width - 20, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    if (flappybirdheight > height - birdSize) {
        flappybirdheight = height - birdSize;
        birdVelocity = 0;
    }
}