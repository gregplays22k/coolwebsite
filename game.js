const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 600;

const player = {
    x: 100,
    y: 400,
    width: 50,
    height: 100,
    velocityY: 0,
    velocityX: 0,
    jumping: false,
    color: 'red',
};

const ball = {
    x: 400,
    y: 200,
    radius: 20,
    velocityX: 0,
    velocityY: 0,
    color: 'orange',
};

const gravity = 0.5;
const jumpPower = -15;
const playerSpeed = 5;

const keys = {};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall() {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();
}

function updatePhysics() {
    player.velocityY += gravity;
    player.y += player.velocityY;
    player.x += player.velocityX;

    ball.velocityY += gravity;
    ball.y += ball.velocityY;
    ball.x += ball.velocityX;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.jumping = false;
    }

    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.velocityY = ball.velocityY * -0.8;
    }
}

function gameLoop() {
    updatePhysics();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', event => {
    keys[event.key] = true;
    if (event.key === 'ArrowUp' && !player.jumping) {
        player.velocityY = jumpPower;
        player.jumping = true;
    }
    if (event.key === 'ArrowLeft') {
        player.velocityX = -playerSpeed;
    }
    if (event.key === 'ArrowRight') {
        player.velocityX = playerSpeed;
    }
});

document.addEventListener('keyup', event => {
    keys[event.key] = false;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        player.velocityX = 0;
    }
});

gameLoop();
