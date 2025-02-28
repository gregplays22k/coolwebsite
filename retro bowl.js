// retrobowl.js

// Canvas setup
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

// Game state
let playerX = canvas.width / 2;
let playerY = canvas.height - 20;
const playerWidth = 10;
const playerHeight = 10;
let playerSpeed = 5;

// Input handling
const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Update game logic
function update() {
  if (keys['ArrowLeft']) {
    playerX -= playerSpeed;
  }
  if (keys['ArrowRight']) {
    playerX += playerSpeed;
  }

  // Boundary checks
  if (playerX < 0) playerX = 0;
  if (playerX > canvas.width - playerWidth) playerX = canvas.width - playerWidth;
}

// Render game elements
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = 'blue';
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

  // Example field lines
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

// Start the game loop
gameLoop();

// Basic CSS to center and style the canvas.
const style = document.createElement('style');
style.textContent = `
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: black;
  }
  canvas {
    border: 2px solid white;
    image-rendering: pixelated;
  }
`;
document.head.appendChild(style);
