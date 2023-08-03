const miceContainer = document.getElementById('mice-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let score = 0;
let time = 30;
let gameInProgress = false;

function getRandomPosition() {
    const containerWidth = miceContainer.clientWidth;
    const containerHeight = miceContainer.clientHeight;
    const randomX = Math.floor(Math.random() * (containerWidth - 50)) + 25;
    const randomY = Math.floor(Math.random() * (containerHeight - 50)) + 25;
    return { x: randomX, y: randomY };
}

function createMouse() {
    const mouseElement = document.createElement('div');
    mouseElement.classList.add('mouse');
    mouseElement.textContent = '🐭'; // Mouse emoji or any other character you prefer
    const { x, y } = getRandomPosition();
    mouseElement.style.left = `${x}px`;
    mouseElement.style.top = `${y}px`;

    mouseElement.addEventListener('click', () => {
        if (gameInProgress) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            miceContainer.removeChild(mouseElement);
        }
    });

    miceContainer.appendChild(mouseElement);
}

function updateTimer() {
    time--;
    timerElement.textContent = `Time: ${time}`;

    if (time <= 0) {
        gameInProgress = false;
        miceContainer.innerHTML = `<div id="game-over">Game Over</div>`;
        startButton.textContent = 'Restart Game';
    } else {
        if (gameInProgress) {
            createMouse();
            setTimeout(updateTimer, 1000);
        }
    }
}

function startGame() {
    if (!gameInProgress) {
        score = 0;
        time = 30;
        gameInProgress = true;
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Time: ${time}`;
        miceContainer.innerHTML = '';
        startButton.textContent = 'Playing...';
        updateTimer();
    }
}

startButton.addEventListener('click', startGame);
