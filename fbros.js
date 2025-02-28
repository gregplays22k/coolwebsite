<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>American Football Game</title>
    <style>
        #game {
            position: relative;
            width: 400px;
            height: 800px;
            background: green;
            border: 2px solid black;
        }

        #player {
            position: absolute;
            width: 20px;
            height: 40px;
            background: blue;
            top: 760px;
            left: 190px;
        }
    </style>
</head>
<body>
    <div id="game">
        <div id="player"></div>
    </div>
    <script>
        document.addEventListener('keydown', movePlayer);

        function movePlayer(event) {
            const player = document.getElementById('player');
            const game = document.getElementById('game');
            const playerPos = player.getBoundingClientRect();
            const gamePos = game.getBoundingClientRect();

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
            const player = document.getElementById('player');
            player.style.top = '760px';
            player.style.left = '190px';
        }
    </script>
</body>
</html>
