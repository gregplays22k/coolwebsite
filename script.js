const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const skinInput = document.getElementById('skin-input');

let playerX = 50;
let playerY = 0;
let velocityY = 0;
let isJumping = false;
const gravity = 0.5;
const jumpStrength = -15;
const moveSpeed = 5;

function updatePlayer() {
    velocityY += gravity;
    playerY += velocityY;
    if (playerY < 0) {
        playerY = 0;
        velocityY = 0;
        isJumping = false;
    }
    player.style.left = playerX + 'px';
    player.style.bottom = playerY + 'px';
    checkCollisions();
}

function checkCollisions() {
    const playerRect = player.getBoundingClientRect();
    const platforms = document.querySelectorAll('.platform');
    platforms.forEach(platform => {
        const platformRect = platform.getBoundingClientRect();
        if (playerRect.left < platformRect.right &&
            playerRect.right > platformRect.left &&
            playerRect.bottom > platformRect.top &&
            playerRect.top < platformRect.bottom) {
            if (velocityY > 0) {
                playerY = platformRect.top - playerRect.height + gameContainer.getBoundingClientRect().bottom - gameContainer.getBoundingClientRect().top;
                velocityY = 0;
                isJumping = false;
            }
        }
    });

    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        const enemyRect = enemy.getBoundingClientRect();
        if (playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.bottom > enemyRect.top &&
            playerRect.top < enemyRect.bottom) {
            alert("You Died!");
            playerX = 50;
            playerY = 0;
            player.style.left = playerX + 'px';
            player.style.bottom = playerY + 'px';
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        playerX -= moveSpeed;
    } else if (event.key === 'ArrowRight') {
        playerX += moveSpeed;
    } else if (event.key === ' ') {
        if (!isJumping) {
            velocityY = jumpStrength;
            isJumping = true;
        }
    }
});

skinInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            player.style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
});

setInterval(updatePlayer, 16); // Roughly 60 FPS
