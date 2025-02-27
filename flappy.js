const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d'); canvas.width = 400; canvas.height = 600; document.getElementById('game-container').appendChild(canvas);
let bird = { x: 50, y: 300, velocity: 0, gravity: 0.5 }; let pipes = []; let score = 0;
function drawBird() { ctx.fillStyle = 'yellow'; ctx.fillRect(bird.x, bird.y, 30, 20); }
function drawPipes() { pipes.forEach(pipe => { ctx.fillStyle = 'green'; ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight); ctx.fillRect(pipe.x, pipe.topHeight + pipe.gap, pipe.width, canvas.height - (pipe.topHeight + pipe.gap)); }); }
function update() { ctx.clearRect(0, 0, canvas.width, canvas.height); bird.velocity += bird.gravity; bird.y += bird.velocity; if (bird.y > canvas.height - 20 || bird.y < 0) { alert(`Game Over! Score: ${score}`); bird = { x: 50, y: 300, velocity: 0, gravity: 0.5 }; pipes = []; score = 0; } if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) { pipes.push({ x: canvas.width, topHeight: Math.floor(Math.random() * 200) + 100, gap: 150, width: 50, }); } pipes.forEach(pipe => { pipe.x -= 3; if (pipe.x + pipe.width < 0) { pipes.shift(); } if (bird.x < pipe.x + pipe.width && bird.x + 30 > pipe.x && (bird.y < pipe.topHeight || bird.y + 20 > pipe.topHeight + pipe.gap)) { alert(`Game Over! Score: ${score}`); bird = { x: 50, y: 300, velocity: 0, gravity: 0.5 }; pipes = []; score = 0; } if (pipe.x + pipe.width < bird.x && !pipe.scored) { score++; pipe.scored = true; } }); }
document.addEventListener('click', () => bird.velocity = -10);
setInterval(update, 20);
setInterval(drawPipes, 20);
setInterval(drawBird, 20);
