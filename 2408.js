// 2048.js
const canvas2048 = document.createElement('canvas');
const ctx2048 = canvas2048.getContext('2d');
canvas2048.width = 400;
canvas2048.height = 400;
document.getElementById('game-container').appendChild(canvas2048);

const gridSize2048 = 100;
let board2048 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

function addRandomTile2048() {
    let emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board2048[i][j] === 0) {
                emptyTiles.push({ x: j, y: i });
            }
        }
    }
    if (emptyTiles.length > 0) {
        let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board2048[randomTile.y][randomTile.x] = Math.random() < 0.9 ? 2 : 4;
    }
}

function drawBoard2048() {
    ctx2048.clearRect(0, 0, canvas2048.width, canvas2048.height);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            ctx2048.fillStyle = board2048[i][j] === 0 ? '#ccc' : '#eee';
            ctx2048.fillRect(j * gridSize2048, i * gridSize2048, gridSize2048, gridSize2048);
            ctx2048.strokeRect(j * gridSize2048, i * gridSize2048, gridSize2048, gridSize2048);
            if (board2048[i][j] !== 0) {
                ctx2048.fillStyle = 'black';
                ctx2048.font = '30px Arial';
                ctx2048.textAlign = 'center';
                ctx2048.textBaseline = 'middle';
                ctx2048.fillText(board2048[i][j], j * gridSize2048 + gridSize2048 / 2, i * gridSize2048 + gridSize2048 / 2);
            }
        }
    }
}

function move2048(direction) {
    let moved = false;
    if (direction === 'left') {
        for (let i = 0; i < 4; i++) {
            let row = board2048[i].filter(val => val !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    row.splice(j + 1, 1);
                    moved = true;
                }
            }
            while (row.length < 4) {
                row.push(0);
            }
            if (JSON.stringify(board2048[i]) !== JSON.stringify(row)) {
                board2048[i] = row;
                moved = true;
            }
        }
    } else if (direction === 'right') {
        for (let i = 0; i < 4; i++) {
            let row = board2048[i].filter(val => val !== 0);
            row.reverse();
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    row.splice(j + 1, 1);
                    moved = true;
                }
            }
            while (row.length < 4) {
                row.push(0);
            }
            row.reverse();
            if (JSON.stringify(board2048[i]) !== JSON.stringify(row)) {
                board2048[i] = row;
                moved = true;
            }
        }
    } else if (direction === 'up') {
        for (let j = 0; j < 4; j++) {
            let col = [];
            for (let i = 0; i < 4; i++) {
                if (board2048[i][j] !== 0) {
                    col.push(board2048[i][j]);
                }
            }
            for (let i = 0; i < col.length - 1; i++) {
                if (col[i] === col[i + 1]) {
                    col[i] *= 2;
                    col.splice(i + 1, 1);
                    moved = true;
                }
            }
            while (col.length < 4) {
                col.push(0);
            }
            for (let i = 0; i < 4; i++) {
                board2048[i][j] = col[i];
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < 4; j++) {
            let col = [];
            for (let i = 0; i < 4; i++) {
                if (board2048[i][j] !== 0) {
                    col.push(board2048[i][j]);
                }
            }
            col.reverse();
            for (let i = 0; i < col.length - 1; i++) {
                if (col[i] === col[i + 1]) {
                    col[i] *= 2;
                    col.splice(i + 1, 1);
                    moved = true;
                }
            }
            while (col.length < 4) {
                col.push(0);
            }
            col.reverse();
            for (let i = 0; i < 4; i++) {
                board2048[i][j] = col[i];
            }
        }
    }
    if (moved) {
        addRandomTile2048();
        drawBoard2048();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        move2048('left');
    }
    if (event.key === 'ArrowRight') {
        move2048('right');
    }
    if (event.key === 'ArrowUp') {
        move2048('up');
    }
    if (event.key === 'ArrowDown') {
        move2048('down');
    }
});

addRandomTile2048();
addRandomTile2048();
drawBoard2048();

// pong.js
const canvasPong = document.createElement('canvas');
const ctxPong = canvasPong.getContext('2d');
canvasPong.width = 400;
canvasPong.height = 400;
document.getElementById('game-container').appendChild(canvasPong);

const ballPong = { x: canvasPong.width / 2, y: canvasPong.height / 2, radius: 10, speedX: 5, speedY: 5 };
const playerPong = { x: 20, y: canvasPong.height / 2 - 50, width: 10, height: 100 };
const computerPong = { x: canvasPong.width - 30, y: canvasPong.height / 2 - 50, width: 10, height: 100 };

function drawPong() {
    ctxPong.clearRect(0, 0, canvasPong.width, canvasPong.height);
    ctxPong.beginPath();
    ctxPong.arc(ballPong.x, ballPong.y, ballPong.radius, 0, Math.PI * 2);
    ctxPong.fillStyle = 'black';
    ctxPong.fill();
    ctxPong.closePath();
    ctxPong.fillRect(playerPong.x, player// 2048.js
const canvas2048 = document.createElement('canvas');
const ctx2048 = canvas2048.getContext('2d');
canvas2048.width = 400;
canvas2048.height = 400;
document.getElementById('game-container').appendChild(canvas2048);

const gridSize2048 = 100;
let board2048 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

function addRandomTile2048() {
    let emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board2048[i][j] === 0) {
                emptyTiles.push({ x: j, y: i });
            }
        }
    }
    if (emptyTiles.length > 0) {
        let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board2048[randomTile.y][randomTile.x] = Math.random() < 0.9 ? 2 : 4;
    }
}

function drawBoard2048() {
    ctx2048.clearRect(0, 0, canvas2048.width, canvas2048.height);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            ctx2048.fillStyle = board2048[i][j] === 0 ? '#ccc' : '#eee';
            ctx2048.fillRect(j * gridSize2048, i * gridSize2048, gridSize2048, gridSize2048);
            ctx2048.strokeRect(j * gridSize2048, i * gridSize2048, gridSize2048, gridSize2048);
            if (board2048[i][j] !== 0) {
                ctx2048.fillStyle = 'black';
                ctx2048.font = '30px Arial';
                ctx2048.textAlign = 'center';
                ctx2048.textBaseline = 'middle';
                ctx2048.fillText(board2048[i][j], j * gridSize2048 + gridSize2048 / 2, i * gridSize2048 + gridSize2048 / 2);
            }
        }
    }
}

function move2048(direction) {
    let moved = false;
    if (direction === 'left') {
        for (let i = 0; i < 4; i++) {
            let row = board2048[i].filter(val => val !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    row.splice(j + 1, 1);
                    moved = true;
                }
            }
            while (row.length < 4) {
                row.push(0);
            }
            if (JSON.stringify(board2048[i]) !== JSON.stringify(row)) {
                board2048[i] = row;
                moved = true;
            }
        }
    } else if (direction === 'right') {
        for (let i = 0; i < 4; i++) {
            let row = board2048[i].filter(val => val !== 0);
            row.reverse();
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    row.splice(j + 1, 1);
                    moved = true;
                }
            }
            while (row.length < 4) {
                row.push(0);
            }
            row.reverse();
            if (JSON.stringify(board2048[i]) !== JSON.stringify(row)) {
                board2048[i] = row;
                moved = true;
            }
        }
    } else if (direction === 'up') {
        for (let j = 0; j < 4; j++) {
            let col = [];
            for (let i = 0; i < 4; i++) {
                if (board2048[i][j] !== 0) {
                    col.push(board2048[i][j]);
                }
            }
            for (let i = 0; i < col.length - 1; i++) {
                if (col[i] === col[i + 1]) {
                    col[i] *= 2;
                    col.splice(i + 1, 1);
                    moved = true;
                }
            }
            while (col.length < 4) {
                col.push(0);
            }
            for (let i = 0; i < 4; i++) {
                board2048[i][j] = col[i];
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < 4; j++) {
            let col = [];
            for (let i = 0; i < 4; i++) {
                if (board2048[i][j] !== 0) {
                    col.push(board2048[i][j]);
                }
            }
            col.reverse();
            for (let i = 0; i < col.length - 1; i++) {
                if (col[i] === col[i + 1]) {
                    col[i] *= 2;
                    col.splice(i + 1, 1);
                    moved = true;
                }
            }
            while (col.length < 4) {
                col.push(0);
            }
            col.reverse();
            for (let i = 0; i < 4; i++) {
                board2048[i][j] = col[i];
            }
        }
    }
    if (moved) {
        addRandomTile2048();
        drawBoard2048();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        move2048('left');
    }
    if (event.key === 'ArrowRight') {
        move2048('right');
    }
    if (event.key === 'ArrowUp') {
        move2048('up');
    }
    if (event.key === 'ArrowDown') {
        move2048('down');
    }
});

addRandomTile2048();
addRandomTile2048();
drawBoard2048();

// pong.js
const canvasPong = document.createElement('canvas');
const ctxPong = canvasPong.getContext('2d');
canvasPong.width = 400;
canvasPong.height = 400;
document.getElementById('game-container').appendChild(canvasPong);

const ballPong = { x: canvasPong.width / 2, y: canvasPong.height / 2, radius: 10, speedX: 5, speedY: 5 };
const playerPong = { x: 20, y: canvasPong.height / 2 - 50, width: 10, height: 100 };
const computerPong = { x: canvasPong.width - 30, y: canvasPong.height / 2 - 50, width: 10, height: 100 };

function drawPong() {
    ctxPong.clearRect(0, 0, canvasPong.width, canvasPong.height);
    ctxPong.beginPath();
    ctxPong.arc(ballPong.x, ballPong.y, ballPong.radius, 0, Math.PI * 2);
    ctxPong.fillStyle = 'black';
    ctxPong.fill();
    ctxPong.closePath();
    ctxPong.fillRect(playerPong.x, player
