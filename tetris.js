const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const gridSize = 20;
const cols = 10;
const rows = 20;
canvas.width = cols * gridSize;
canvas.height = rows * gridSize;

const colors = [
    null, 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'
];

const shapes = [
    null,
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]], // I
    [[0, 2, 0], [0, 2, 0], [2, 2, 0]], // J
    [[0, 3, 0], [0, 3, 0], [0, 3, 3]], // L
    [[4, 4], [4, 4]], // O
    [[0, 5, 5], [5, 5, 0]], // S
    [[0, 6, 0], [6, 6, 6]], // T
    [[7, 7, 0], [0, 7, 7]]  // Z
];

let grid = createGrid();
let piece = generatePiece();
let pieceX = Math.floor(cols / 2) - Math.floor(piece.shape[0].length / 2);
let pieceY = 0;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let score = 0;

function createGrid() {
    return Array(rows).fill(null).map(() => Array(cols).fill(0));
}

function generatePiece() {
    const type = Math.floor(Math.random() * (shapes.length - 1)) + 1;
    return { shape: shapes[type], color: type };
}

function drawGrid() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    grid.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillStyle = colors[value];
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            }
        });
    });

    drawPiece();
    drawScore();
}

function drawPiece() {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillStyle = colors[piece.color];
                ctx.fillRect((pieceX + x) * gridSize, (pieceY + y) * gridSize, gridSize, gridSize);
            }
        });
    });
}

function mergePiece() {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                grid[y + pieceY][x + pieceX] = value;
            }
        });
    });
}

function collide(grid, piece, offsetX, offsetY) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newX = pieceX + x + offsetX;
                const newY = pieceY + y + offsetY;
                if (newX < 0 || newX >= cols || newY >= rows || grid[newY]?.[newX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function rotate(piece) {
    const shape = piece.shape;
    const rotated = shape[0].map((val, index) => shape.map(row => row[index]).reverse());
    return { shape: rotated, color: piece.color };
}

function drop() {
    pieceY++;
    if (collide(grid, piece, 0, 1)) {
        pieceY--;
        mergePiece();
        removeRows();
        piece = generatePiece();
        pieceX = Math.floor(cols / 2) - Math.floor(piece.shape[0].length / 2);
        pieceY = 0;
        if (collide(grid, piece, 0, 0)) {
            grid = createGrid();
            score = 0;
        }
    }
    dropCounter = 0;
}

function removeRows() {
    let rowsCleared = 0;
    for (let y = rows - 1; y >= 0; y--) {
        if (grid[y].every(cell => cell)) {
            grid.splice(y, 1);
            grid.unshift(Array(cols).fill(0));
            rowsCleared++;
            y++;
        }
    }
    if (rowsCleared > 0) {
        score += rowsCleared * 100;
    }
}

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
        drop();
    }

    drawGrid();
    requestAnimationFrame(update);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowLeft':
            if (!collide(grid, piece, -1, 0)) pieceX--;
            break;
        case 'ArrowRight':
            if (!collide(grid, piece, 1, 0)) pieceX++;
            break;
        case 'ArrowDown':
            drop();
            break;
        case 'ArrowUp':
            const rotatedPiece = rotate(piece);
            if (!collide(grid, rotatedPiece, 0, 0)) piece = rotatedPiece;
            break;
    }
});

update();
