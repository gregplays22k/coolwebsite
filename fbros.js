// Create game container
const gameContainer = document.createElement('div');
gameContainer.id = 'game';
gameContainer.style.position = 'relative';
gameContainer.style.width = '400px';
gameContainer.style.height = '800px';
gameContainer.style.background = 'green';
gameContainer.style.border = '2px solid black';
document.body.appendChild(gameContainer);

// Create player
const player = document.createElement('div');
player.id = 'player';
player.style.position = 'absolute';
player.style.width = '20px';
player.style.height = '40px';
player.style.background = 'blue';
player.style.top = '760px';
player.style.left = '190px';
gameContainer.appendChild(player);

document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
    const playerPos = player.getBoundingClientRect();
    const gamePos = gameContainer.getBoundingClientRect();

    if (event.key === 'ArrowUp' && playerPos.top > gamePos.top) {
        player.style.top = `${player.offsetTop - 20}px`;
    } else if (event.key === 'ArrowDown' && playerPos.bottom < gamePos.bottom) {
        player.style.top = `${player.offsetTop + 20}px`;
    } else if (event.key === 'ArrowLeft' && playerPos.left > gamePos.left) {
        player.style.left = `${player.offsetLeft - 20}px`;
    } else if (event.key === 'ArrowRight' && playerPos.right < gamePos.right) {
        player.style.left = `${player.offsetLeft + 20}px`;
    }

    checkWinCondition(playerPos, gamePos);
}

function checkWinCondition(playerPos, gamePos) {
    if (playerPos.top <= gamePos.top) {
        alert("Touchdown! You win!");
        resetGame();
    }
}

function resetGame() {
    player.style.top = '760px';
    player.style.left = '190px';
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
    }
`;
document.head.appendChild(style);
