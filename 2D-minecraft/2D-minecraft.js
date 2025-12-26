// ================= CONFIG =================
const TILE = 32;
const WORLD_W = 200;
const WORLD_H = 50;

// ================= BLOCK TYPES =================
const AIR = 0;
const DIRT = 1;
const GRASS = 2;
const STONE = 3;
const WOOD = 4;
const CRAFTING = 5;

const BLOCKS = {
  [DIRT]:     { color: [120,72,40] },
  [GRASS]:    { color: [80,200,80] },
  [STONE]:    { color: [130] },
  [WOOD]:     { color: [160,120,80] },
  [CRAFTING]: { color: [170,120,60] }
};

// ================= WORLD =================
let world = [];

// ================= PLAYER =================
let player = {
  x: 5, y: 5,
  w: 0.8, h: 1.8,
  vx: 0, vy: 0,
  onGround: false
};

// ================= INVENTORY =================
let inventory = {
  open: false,
  items: {
    [DIRT]: 10,
    [STONE]: 5,
    [WOOD]: 5,
    [CRAFTING]: 2
  },
  hotbar: [DIRT, WOOD, STONE, CRAFTING]
};
let selectedSlot = 0;

// ================= SLIMES =================
let slimes = [];

// ================= INPUT STATE =================
let eWasDown = false;

// ================= SETUP =================
function setup() {
  createCanvas(windowWidth, windowHeight);
  loadWorld();
  if (!world.length) generateWorld();

  for (let i = 0; i < 5; i++) {
    spawnSlime(int(random(10, WORLD_W - 10)), 0);
  }

  setInterval(saveWorld, 10000);
      document.addEventListener('contextmenu', event => event.preventDefault());
}

// ================= DRAW =================
function draw() {
  handleMenuKeys(); // <- inventory toggle

  background(135, 206, 235);

  if (inventory.open) {
    drawInventory();
    return;
  }

  updatePlayer();
  updateSlimes();
  cameraFollow();

  drawWorld();
  drawPlayer();
  drawSlimes();

  drawHotbar();
}

// ================= WORLD GEN =================
function generateWorld() {
  for (let x = 0; x < WORLD_W; x++) {
    world[x] = [];
    let ground = floor(WORLD_H / 2 + noise(x * 0.1) * 10);
    for (let y = 0; y < WORLD_H; y++) {
      if (y > ground) world[x][y] = y > ground + 3 ? STONE : DIRT;
      else if (y === ground) world[x][y] = GRASS;
      else world[x][y] = AIR;
    }
  }
}

// ================= DRAW WORLD =================
function drawWorld() {
  for (let x = 0; x < WORLD_W; x++) {
    for (let y = 0; y < WORLD_H; y++) {
      let b = world[x][y];
      if (b === AIR) continue;

      fill(...BLOCKS[b].color);
      rect(x*TILE, y*TILE, TILE, TILE);

      if (b === CRAFTING) {
        stroke(80);
        line(x*TILE+16, y*TILE, x*TILE+16, y*TILE+32);
        line(x*TILE, y*TILE+16, x*TILE+32, y*TILE+16);
        noStroke();
      }
    }
  }
}

// ================= PLAYER =================
function updatePlayer() {
  const speed = 0.08, gravity = 0.02, jump = -0.5;

  if (keyIsDown(65)) player.vx = -speed;
  else if (keyIsDown(68)) player.vx = speed;
  else player.vx *= 0.7;

  if (keyIsDown(32) && player.onGround) {
    player.vy = jump;
    player.onGround = false;
  }

  player.vy += gravity;

  move(player, player.vx, 0);
  move(player, 0, player.vy);
}

function move(e, dx, dy) {
  e.x += dx;
  if (collides(e)) { e.x -= dx; e.vx = 0; }

  e.y += dy;
  if (collides(e)) {
    e.y -= dy;
    e.vy = 0;
    if (dy > 0) e.onGround = true;
  } else e.onGround = false;
}

function collides(e) {
  let l = floor(e.x), r = floor(e.x + e.w);
  let t = floor(e.y), b = floor(e.y + e.h);
  for (let x = l; x <= r; x++)
    for (let y = t; y <= b; y++)
      if (world[x]?.[y] && world[x][y] !== AIR) return true;
  return false;
}

function drawPlayer() {
  fill(255, 50, 50);
  rect(player.x*TILE, player.y*TILE, player.w*TILE, player.h*TILE);
}

// ================= SLIMES =================
function spawnSlime(x, y) {
  slimes.push({
    x, y, w: 1, h: 1,
    vx: random([-0.03, 0.03]),
    vy: 0,
    onGround: false,
    jumpTimer: int(random(60,120)),
    alive: true
  });
}

function updateSlimes() {
  for (let s of slimes) {
    if (!s.alive) continue;

    s.vy += 0.02;
    s.jumpTimer--;

    if (s.jumpTimer <= 0 && s.onGround) {
      s.vy = -0.4;
      s.jumpTimer = int(random(60,120));
    }

    move(s, s.vx, 0);
    move(s, 0, s.vy);

    if (aabb(player, s)) {
      if (player.vy > 0) {
        s.alive = false;
        player.vy = -0.3;
      } else {
        player.vx += player.x < s.x ? -0.2 : 0.2;
      }
    }
  }
}

function drawSlimes() {
  for (let s of slimes) {
    if (!s.alive) continue;
    fill(50, 220, 100);
    rect(s.x*TILE, s.y*TILE, s.w*TILE, s.h*TILE, 6);
  }
}

// ================= CAMERA =================
function cameraFollow() {
  translate(width/2 - player.x*TILE, height/2 - player.y*TILE);
}

// ================= HOTBAR =================
function drawHotbar() {
  resetMatrix();
  let size = 40;
  for (let i = 0; i < inventory.hotbar.length; i++) {
    let x = width/2 - (inventory.hotbar.length*size)/2 + i*size;
    let y = height - 60;

    stroke(i === selectedSlot ? 255 : 0);
    strokeWeight(i === selectedSlot ? 3 : 0);

    fill(...BLOCKS[inventory.hotbar[i]].color);
    rect(x, y, size, size);

    fill(255);
    textAlign(CENTER);
    text(inventory.items[inventory.hotbar[i]] ?? 0, x+size/2, y+size+12);
  }
}

// ================= INVENTORY TOGGLE =================
function handleMenuKeys() {
  let eDown = keyIsDown(69); // E
  if(eDown && !eWasDown) inventory.open = !inventory.open;
  eWasDown = eDown;
}

// ================= INVENTORY UI =================
function drawInventory() {
  background(0,180);
  fill(255);
  textAlign(CENTER);
  text("INVENTORY (E)", width/2, 50);
}

// ================= INPUT =================
function keyPressed() {
  if (key >= '1' && key <= '9') selectedSlot = int(key) - 1;
}

function mousePressed() {
  let wx = floor((mouseX-width/2)/TILE + player.x);
  let wy = floor((mouseY-height/2)/TILE + player.y);
  if (!world[wx]) return false;

  if (mouseButton === LEFT && world[wx][wy] !== AIR) {
    inventory.items[world[wx][wy]] =
      (inventory.items[world[wx][wy]] || 0) + 1;
    world[wx][wy] = AIR;
  }

  if (mouseButton === RIGHT) {
    if (world[wx][wy] === CRAFTING) {
      if ((inventory.items[WOOD] || 0) >= 2) {
        inventory.items[WOOD] -= 2;
        inventory.items[STONE] = (inventory.items[STONE] || 0) + 1;
      }
      return false;
    }

    let b = inventory.hotbar[selectedSlot];
    if (inventory.items[b] > 0 && world[wx][wy] === AIR) {
      world[wx][wy] = b;
      inventory.items[b]--;
    }
  }
  return false;
}

// ================= SAVE / LOAD =================
function saveWorld() {
  localStorage.setItem("mc2d_world", JSON.stringify(world));
  localStorage.setItem("mc2d_inv", JSON.stringify(inventory.items));
}

function loadWorld() {
  let w = localStorage.getItem("mc2d_world");
  let i = localStorage.getItem("mc2d_inv");
  if (w) world = JSON.parse(w);
  if (i) inventory.items = JSON.parse(i);
}

// ================= UTILS =================
function aabb(a, b) {
  return a.x < b.x+b.w && a.x+a.w > b.x &&
         a.y < b.y+b.h && a.y+a.h > b.y;
}
