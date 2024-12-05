const images = [
    { src: "image1.jpg", word: "mountain" },
    { src: "image2.jpg", word: "bag" },
    { src: "image3.jpg", word: "window" },
];

let currentIndex = 0;

const playButton = document.getElementById("playButton");
const gameImage = document.getElementById("game-image");
const userInput = document.getElementById("userInput");
const submitGuess = document.getElementById("playerGuess");
const backgroundAudio = document.getElementById("background-ambiant");
const volumeControl = document.getElementById("volumeControl");
const playButtonTimer = document.getElementById("playButton");
const timerDisplay = document.getElementById("timerDisplay");

backgroundAudio.volume = 0.1;

// Must add timer(done), score(not done),

function startGame() {
    if (currentIndex < images.length) {
        const selectedImage = images[currentIndex];
        gameImage.src = selectedImage.src;
        gameImage.alt = `"Game image for level " + ${currentIndex + 1}`;
        gameImage.style.visibility = "visible";
        userInput.style.visibility = "visible";
        submitGuess.style.visibility = "visible";
        timerDisplay.style.visibility = "visible";
        userInput.value = " ";
        userInput.disabled = false;
        submitGuess.disabled = false;
        playButton.textContent = "Next Level";
        playButton.disabled = true;
    } else {
        playButton.textContent = "Restart";
        playButton.disabled = false;
        userInput.disabled = true;
        submitGuess.disabled = true;
        currentIndex = 0;
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
    } else {
        const incorrectSound = document.getElementById("incorrectGuess");
        incorrectSound.currentTime = 0;
        incorrectSound.play();
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

playButton.addEventListener("click", startGame);
submitGuess.addEventListener("click", checkGuess);
playButton.addEventListener("click", () => {
    countdown = 120;
    startTimer();
});
