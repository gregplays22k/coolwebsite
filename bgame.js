// Create game container
const gameContainer = document.createElement('div');
gameContainer.id = 'game';
gameContainer.style.position = 'relative';
gameContainer.style.width = '400px';
gameContainer.style.height = '800px';
gameContainer.style.background = 'lightgray';
gameContainer.style.border = '2px solid black';
document.body.appendChild(gameContainer);

// Create player
const player = document.createElement('div');
player.id = 'player';
player.style.position = 'absolute';
player.style.width = '20px';
player.style.height = '40px';
player.style.background = 'blue';
player.style.bottom = '0px';
player.style.left = '190px';
gameContainer.appendChild(player);

// Create basketball hoop
const hoop = document.createElement('div');
hoop.id = 'hoop';
hoop.style.position = 'absolute';
hoop.style.width = '60px';
hoop.style.height = '20px';
hoop.style.background = 'orange';
hoop.style.top = '50px';
hoop.style.left = '170px';
hoop.style.borderRadius = '50%';
gameContainer.appendChild(hoop);

// Create basketball
const basketball = document.createElement('div');
basketball.id = 'basketball';
basketball.style.position = 'absolute';
basketball.style.width = '20px';
basketball.style.height = '20px';
basketball.style.background = 'brown';
basketball.style.bottom = '40px';
basketball.style.left = '190px';
basketball.style.borderRadius = '50%';
gameContainer.appendChild(basketball);

let basketballThrown = false;

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const playerPos = player.getBoundingClientRect();
    const gamePos = gameContainer.getBoundingClientRect();

    if (event.key === 'ArrowLeft' && playerPos.left > gamePos.left) {
        player.style.left = `${player.offsetLeft - 20}px`;
        if (!basketballThrown) {
            basketball.style.left = `${player.offsetLeft - 20}px`;
        }
    } else if (event.key === 'ArrowRight' && playerPos.right < gamePos.right) {
        player.style.left = `${player.offsetLeft + 20}px`;
        if (!basketballThrown) {
            basketball.style.left = `${player.offsetLeft + 20}px`;
        }
    } else if (event.key === ' ') { // Spacebar to shoot
        if (!basketballThrown) {
            shootBasketball();
        }
    }
}

function shootBasketball() {
    basketballThrown = true;
    let shootInterval = setInterval(() => {
        basketball.style.bottom = `${parseInt(basketball.style.bottom) + 10}px`;
        if (parseInt(basketball.style.bottom) >= 750) {
            clearInterval(shootInterval);
            checkWinCondition();
        }
    }, 50);
}

function checkWinCondition() {
    const basketballPos = basketball.getBoundingClientRect();
    const hoopPos = hoop.getBoundingClientRect();
    
    if (
        basketballPos.left >= hoopPos.left &&
        basketballPos.right <= hoopPos.right &&
        basketballPos.top <= hoopPos.bottom &&
        basketballPos.bottom >= hoopPos.top
    ) {
        alert("Score! You made the shot!");
    } else {
        alert("Miss! Try again!");
    }
    resetGame();
}

function resetGame() {
    basketballThrown = false;
    basketball.style.bottom = '40px';
    basketball.style.left = player.style.left;
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
