const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = 50;
        this.y = canvas.height / 2 - this.height / 2;
        this.yVelocity = 0;
        this.jumpStrength = 15;
        this.gravity = 0.5;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.yVelocity;
        this.yVelocity += this.gravity;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.yVelocity = 0;
        }
    }

    jump() {
        if (this.y + this.height === canvas.height) {
            this.yVelocity = -this.jumpStrength;
        }
    }
}

class Obstacle {
    constructor(x, width, height, speed) {
        this.x = x;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.y = canvas.height - this.height;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
    }
}

const player = new Player();
const obstacles = [];
let obstacleTimer = 0;
let gameOver = false;

function spawnObstacle() {
    const width = Math.random() * 50 + 50;
    const height = Math.random() * 50 + 50;
    const speed = 5;
    const obstacle = new Obstacle(canvas.width, width, height, speed);
    obstacles.push(obstacle);
}

function animate() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.draw();
    player.update();

    if (obstacleTimer === 0) {
        spawnObstacle();
        obstacleTimer = 100; // spawn new obstacle every 100 frames
    } else {
        obstacleTimer--;
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.draw();
        obstacle.update();

        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1); // remove off-screen obstacles
        }

        // collision detection
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            gameOver = true;
            alert('Game Over!');
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        player.jump();
    }
});

animate();
