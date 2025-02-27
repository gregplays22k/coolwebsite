const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: 50,
    y: canvas.height - 50,
    width: 20,
    height: 40,
    velocityY: 0,
    jumping: false,
    speed: 5,
};

const platforms = [];
let platformSpawnX = canvas.width;
const platformHeight = 20;
const platformWidth = 100;
const platformGap = 200;

let cameraX = 0;
const gravity = 0.5;
const jumpPower = -12;

function generatePlatform() {
    platforms.push({
        x: platformSpawnX,
        y: canvas.height - Math.random() * 200 - platformHeight,
        width: platformWidth,
        height: platformHeight,
    });
    platformSpawnX += platformWidth + platformGap + Math.random() * 200;
}

function update() {
    // Generate platforms if needed
    while (platformSpawnX - cameraX < canvas.width * 2) {
        generatePlatform();
    }

    // Player movement
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    player.velocityY += gravity;
    player.y += player.velocityY;

    // Platform collision
    let onPlatform = false;
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height
        ) {
            if (player.velocityY > 0 && player.y + player.height <= platform.y + 10) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.jumping = false;
                onPlatform = true;
            } else if (player.velocityY < 0 && player.y >= platform.y + platform.height - 10) {
                player.velocityY = 0;
                player.y = platform.y + platform.height;
            }
        }
    });

    if (!onPlatform && player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.jumping = false;
    }

    // Camera follow
    cameraX = player.x - canvas.width / 4;

    // Remove off-screen platforms
    for (let i = platforms.length - 1; i >= 0; i--) {
        if (platforms[i].x + platforms[i].width < cameraX - 100) {
            platforms.splice(i, 1);
        }
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    platforms.forEach(platform => {
        ctx.fillStyle = 'gray';
        ctx.fillRect(platform.x - cameraX, platform.y, platform.width, platform.height);
    });

    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);
}

const keys = {};
document.addEventListener('keydown', event => {
    keys[event.key] = true;
    if (event.key === 'ArrowUp' && !player.jumping) {
        player.velocityY = jumpPower;
        player.jumping = true;
    }
});

document.addEventListener('keyup', event => {
    keys[event.key] = false;
});

update();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: 50,
    y: canvas.height - 50,
    width: 20,
    height: 40,
    velocityY: 0,
    jumping: false,
    speed: 5,
};

const platforms = [];
let platformSpawnX = canvas.width;
const platformHeight = 20;
const platformWidth = 100;
const platformGap = 200;

let cameraX = 0;
const gravity = 0.5;
const jumpPower = -12;

function generatePlatform() {
    platforms.push({
        x: platformSpawnX,
        y: canvas.height - Math.random() * 200 - platformHeight,
        width: platformWidth,
        height: platformHeight,
    });
    platformSpawnX += platformWidth + platformGap + Math.random() * 200;
}

function update() {
    // Generate platforms if needed
    while (platformSpawnX - cameraX < canvas.width * 2) {
        generatePlatform();
    }

    // Player movement
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    player.velocityY += gravity;
    player.y += player.velocityY;

    // Platform collision
    let onPlatform = false;
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height
        ) {
            if (player.velocityY > 0 && player.y + player.height <= platform.y + 10) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.jumping = false;
                onPlatform = true;
            } else if (player.velocityY < 0 && player.y >= platform.y + platform.height - 10) {
                player.velocityY = 0;
                player.y = platform.y + platform.height;
            }
        }
    });

    if (!onPlatform && player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.jumping = false;
    }

    // Camera follow
    cameraX = player.x - canvas.width / 4;

    // Remove off-screen platforms
    for (let i = platforms.length - 1; i >= 0; i--) {
        if (platforms[i].x + platforms[i].width < cameraX - 100) {
            platforms.splice(i, 1);
        }
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    platforms.forEach(platform => {
        ctx.fillStyle = 'gray';
        ctx.fillRect(platform.x - cameraX, platform.y, platform.width, platform.height);
    });

    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);
}

const keys = {};
document.addEventListener('keydown', event => {
    keys[event.key] = true;
    if (event.key === 'ArrowUp' && !player.jumping) {
        player.velocityY = jumpPower;
        player.jumping = true;
    }
});

document.addEventListener('keyup', event => {
    keys[event.key] = false;
});

update();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
