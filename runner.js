(function() {
  const gameContainer = document.getElementById('game-container');
  const canvas = document.createElement('canvas');
  canvas.id = 'runnerCanvas';
  canvas.width = 800;
  canvas.height = 400;
  gameContainer.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let player = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 50,
    velocityY: 0,
    gravity: 1,
    isJumping: false,
  };

  let obstacles =;
  let score = 0;
  let gameSpeed = 5;
  let obstacleSpawnRate = 150; // Adjust for difficulty
  let obstacleSpawnTimer = 0;
  let gameOver = false;

  function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  function drawObstacle(obstacle) {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }

  function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function updatePlayer() {
    player.y += player.velocityY;
    player.velocityY += player.gravity;

    if (player.y > canvas.height - player.height) {
      player.y = canvas.height - player.height;
      player.velocityY = 0;
      player.isJumping = false;
    }
  }

  function updateObstacles() {
    obstacles.forEach((obstacle, index) => {
      obstacle.x -= gameSpeed;
      if (obstacle.x + obstacle.width < 0) {
        obstacles.splice(index, 1);
        score++;
      }

      // Collision detection
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        gameOver = true;
      }
    });
  }

  function spawnObstacle() {
    let obstacleWidth = Math.random() * 40 + 20;
    let obstacleHeight = Math.random() * 60 + 30;
    let obstacleY = canvas.height - obstacleHeight;

    obstacles.push({
      x: canvas.width,
      y: obstacleY,
      width: obstacleWidth,
      height: obstacleHeight,
    });
  }

  function main() {
    if (gameOver) {
      alert('Game Over! Score: ' + score);
      return;
    }

    clearCanvas();
    drawPlayer();
    drawScore();

    updatePlayer();
    updateObstacles();

    obstacleSpawnTimer++;
    if (obstacleSpawnTimer > obstacleSpawnRate) {
      spawnObstacle();
      obstacleSpawnTimer = 0;
    }

    obstacles.forEach(drawObstacle);

    requestAnimationFrame(main);
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !player.isJumping) {
      player.velocityY = -20; // Adjust jump height
      player.isJumping =
