const images = [
    { src: "image1.jpg", word: "mountain" },
    { src: "image2.jpg", word: "bag" },
    { src: "image3.jpg", word: "window" },
];

let currentIndex = 0;
let score = 0;
let basePoints = 500;
let bonusPoints = 0;
let levelTimeLeft = 0;

const playButton = document.getElementById("playButton");
const gameImage = document.getElementById("game-image");
const userInput = document.getElementById("userInput");
const submitGuess = document.getElementById("playerGuess");
const backgroundAudio = document.getElementById("background-ambiant");
const volumeControl = document.getElementById("volumeControl");
const playButtonTimer = document.getElementById("playButton");
const timerDisplay = document.getElementById("timerDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");
const gameOverAudio = document.getElementById("gameOverAudio");

backgroundAudio.volume = 0.1;

// Must add timer(done), score(done),

function startGame() {
    if (currentIndex < images.length) {
        const selectedImage = images[currentIndex];
        gameImage.src = selectedImage.src;
        gameImage.alt = `"Game image for level " + ${currentIndex + 1}`;
        gameImage.style.visibility = "visible";
        userInput.style.visibility = "visible";
        submitGuess.style.visibility = "visible";
        timerDisplay.style.visibility = "visible";
        scoreDisplay.style.visibility = "visible";
        userInput.value = " ";
        userInput.disabled = false;
        submitGuess.disabled = false;
        playButton.textContent = "Next Level";
        playButton.disabled = true;

        countdown = 120;
        startTimer();
    } else {
        playButton.textContent = "Restart";
        playButton.disabled = false;
        userInput.disabled = true;
        submitGuess.disabled = true;
        currentIndex = 0;

        score = 0;
        updateScore();
    }
}

function checkGuess() {
    const playerGuess = userInput.value.trim().toLowerCase();
    const currentWord = images[currentIndex].word.toLowerCase();

    if (playerGuess === currentWord) {
        const correctSound = document.getElementById("correctGuess");
        correctSound.currentTime = 0;
        correctSound.play();
        currentIndex++;
        userInput.disabled = true;
        submitGuess.disabled = true;
        playButton.disabled = false;
        endLevel();
    } else {
        const incorrectSound = document.getElementById("incorrectGuess");
        incorrectSound.currentTime = 0;
        incorrectSound.play();
    }
}

function updateScore() {
    if (scoreDisplay) {
        scoreDisplay.innerHTML = `Score: ${score}`;
    }
}

function updateScoreDisplay(score) {
    if (scoreDisplay) {
        console.log("Updating score to:", score);
        scoreDisplay.innerHTML = `Score: ${score}`;
    }
}
// Timer
let timer;
let countdown = 120;

function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;

        const formattedTime = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

        const ele = document.getElementById("timerDisplay");
        if (ele) {
            ele.innerHTML = formattedTime;
        }

        countdown--;

        if (countdown < 0) {
            clearInterval(timer);

            playLoseAudio();
        }
    }, 1000);
}
function playLoseAudio() {
    const gameOverAudio = document.getElementById("gameOverAudio");

    if (gameOverAudio) {
        gameOverAudio.play();
    }
}

function endLevel() {
    levelTimeLeft = countdown;

    if (levelTimeLeft >= 60) {
        bonusPoints = 500;
    } else if (levelTimeLeft >= 30) {
        bonusPoints = 250;
    } else if (levelTimeLeft >= 10) {
        bonusPoints = 50;
    } else {
        bonusPoints = 0;
    }

    score += basePoints + bonusPoints;

    updateScore();
}

playButton.addEventListener("click", startGame);
submitGuess.addEventListener("click", checkGuess);
playButton.addEventListener("click", () => {
    countdown = 120;
    startTimer();
});
