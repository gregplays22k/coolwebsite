const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d'); canvas.width = 300; canvas.height = 300; document.getElementById('game-container').appendChild(canvas);
const board = ['', '', '', '', '', '', '', '', '']; let currentPlayer = 'X'; let gameOver = false;
function drawBoard() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(i * 100, 0); ctx.lineTo(i * 100, 300); ctx.stroke(); ctx.moveTo(0, i * 100); ctx.lineTo
