// Create game container
const gameContainer = document.createElement('div');
gameContainer.id = 'game';
gameContainer.style.position = 'relative';
gameContainer.style.width = '800px';
gameContainer.style.height = '600px';
gameContainer.style.background = 'lightblue';
gameContainer.style.border = '2px solid black';
document.body.appendChild(gameContainer);

// Create player
const player = document.createElement('div');
player.id = 'player';
player.style.position = 'absolute';
player.style.width = '40px';
player.style.height = '40px';
player.style.background = 'red';
player.style.bottom = '0px';
player.style.left = '0px';
gameContainer.appendChild(player);

// Create platforms
const platforms = [
    { width: 200, height: 20, top: 500, left: 100 },
    { width: 200, height: 20, top: 400, left: 400 },
    { width: 200, height: 20, top: 300, left: 150 },
    { width: 200, height: 20, top: 200, left: 600 }
];

platforms.forEach(platform => {
    const platformElement = document.createElement('div');
    platformElement.style.position = 'absolute';
    platformElement.style.width = `${platform.width}px`;
    platformElement.style.height = `${platform.height}px`;
    platformElement.style.background = 'green';
    platformElement.style.top = `${platform.top}px`;
    platformElement.style.left = `${platform.left}px`;
    gameContainer.appendChild(platformElement);
});

// Create an obstacle
const obstacle = document.createElement('div');
obstacle.id = 'obstacle';
obstacle.style.position = 'absolute';
obstacle.style.width = '40px';
obstacle.style.height = '40px';
obstacle.style.background = 'black';
obstacle.style.top = '460px';
obstacle.style.left = '500px';
gameContainer.appendChild(obstacle);

let isJumping = false;
let jumpHeight = 0;
let gravity = 2;
let playerSpeed = 5;
let playerVerticalSpeed = 0; // Add vertical speed

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
        movePlayer(-playerSpeed, 0);
    } else if (event.key === 'ArrowRight') {
        movePlayer(playerSpeed, 0);
    } else if (event.key === 'ArrowUp' && !isJumping) {
        jump();
    }
}

function movePlayer(deltaX, deltaY) {
    const playerPos = player.getBoundingClientRect();
    const gamePos = gameContainer.getBoundingClientRect();

    if (playerPos.left + deltaX >= gamePos.left && playerPos.right + deltaX <= gamePos.right) {
        player.style.left = `${player.offsetLeft + deltaX}px`;
    }

    checkObstacleCollision();
}

function jump() {
    isJumping = true;
    playerVerticalSpeed = -20; // Initial upward velocity
    updatePlayerPosition();
}

function updatePlayerPosition() {
    const playerPos = player.getBoundingClientRect();
    const gamePos = gameContainer.getBoundingClientRect();
    const onPlatform = checkPlatformCollision(playerPos);

    playerVerticalSpeed += gravity; // Apply gravity

    let newBottom = parseInt(player.style.bottom) + playerVerticalSpeed;

    if (newBottom < 0 && !onPlatform) {
        newBottom = 0;
        playerVerticalSpeed = 0;
        isJumping = false;
    }

    if(onPlatform && playerVerticalSpeed > 0){
        playerVerticalSpeed = 0;
        isJumping = false;
        const platformY = getPlatformY(playerPos);
        newBottom = platformY;
    }
    player.style.bottom = `${newBottom}px`;

    requestAnimationFrame(updatePlayerPosition);
}

function getPlatformY(playerPos){
    for(let platform of platforms){
        const platformPos = {
            top: platform.top,
            bottom: platform.top + platform.height,
            left: platform.left,
            right: platform.left + platform.width
        };
        if (
            playerPos.bottom >= platformPos.top &&
            playerPos.bottom <= platformPos.bottom &&
            playerPos.right >= platformPos.left &&
            playerPos.left <= platformPos.right
        ){
            return platform.top;
        }
    }
    return 0;
}

function checkPlatformCollision(playerPos) {
    return platforms.some(platform => {
        const platformPos = {
            top: platform.top,
            bottom: platform.top + platform.height,
            left: platform.left,
            right: platform.left + platform.width
        };

        return (
            playerPos.bottom >= platformPos.top &&
            playerPos.bottom <= platformPos.bottom &&
            playerPos.right >= platformPos.left &&
            playerPos.left <= platformPos.right
        );
    });
}

function checkObstacleCollision() {
    const playerPos = player.getBoundingClientRect();
    const obstaclePos = obstacle.getBoundingClientRect();

    if (
        playerPos.right > obstaclePos.left &&
        playerPos.left < obstaclePos.right &&
        playerPos.bottom > obstaclePos.top &&
        playerPos.top < obstaclePos.bottom
    ) {
        alert("Game Over! You hit an obstacle.");
        resetGame();
    }
}

function resetGame() {
    player.style.bottom = '0px';
    player.style.left = '0px';
    isJumping = false;
    playerVerticalSpeed = 0;
}

// Styling (optional)
const style = document.createElement('style');
style.innerHTML = `
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background: #e0e0e0;
    }
`;
document.head.appendChild(style);

updatePlayerPosition(); // Start the game loop
