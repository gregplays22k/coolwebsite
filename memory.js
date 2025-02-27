const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400; canvas.height = 400; document.getElementById('game-container').appendChild(canvas);
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
let shuffledCards = cards.sort(() => 0.5 - Math.random());
let flippedCards = []; let matchedCards = [];
function drawCard(index, x, y) {
    ctx.fillStyle = matchedCards.includes(index) ? 'lightgray' : 'white';
    ctx.fillRect(x, y, 80, 80);
    ctx.strokeRect(x, y, 80, 80);
    if (flippedCards.includes(index) || matchedCards.includes(index)) {
        ctx.fillStyle = 'black';
        ctx.fillText(shuffledCards[index], x + 35, y + 50);
    }
}
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < shuffledCards.length; i++) {
        const x = (i % 4) * 100 + 20;
        const y = Math.floor(i / 4) * 100 + 20;
        drawCard(i, x, y);
    }
}
canvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const clickedIndex = Math.floor(x / 100) + Math.floor(y / 100) * 4;
    if (!flippedCards.includes(clickedIndex) && !matchedCards.includes(clickedIndex) && flippedCards.length < 2) {
        flippedCards.push(clickedIndex);
        drawBoard();
        if (flippedCards.length === 2) {
            setTimeout(() => {
                if (shuffledCards[flippedCards[0]] === shuffledCards[flippedCards[1]]) {
                    matchedCards.push(flippedCards[0], flippedCards[1]);
                }
                flippedCards = [];
                drawBoard();
            }, 1000);
        }
    }
});
drawBoard();
ctx.font = '30px Arial';
