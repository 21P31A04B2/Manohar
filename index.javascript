let timer;
let isTimerRunning = false;
let timeRemaining = 0;
let isBreakTime = false;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time-display');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const alertSound = document.getElementById('alert-sound');

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let sec = seconds % 60;
    
    if (minutes < 10) minutes = '0' + minutes;
    if (sec < 10) sec = '0' + sec;
    return minutes + ':' + sec;
}


function startTimer() {
    if (isTimerRunning) return;

    isTimerRunning = true;
    timer = setInterval(() => {
        timeRemaining--;
        timeDisplay.textContent = formatTime(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timer);
            alertSound.play();
            isTimerRunning = false;
            isBreakTime = !isBreakTime;
            if (isBreakTime) {
                alert('Break time!');
            } else {
                alert('Pomodoro time!');
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    timeRemaining = 0;
    timeDisplay.textContent = formatTime(timeRemaining);
}

shortBreakButton.addEventListener('click', () => {
    isBreakTime = true;
    timeRemaining = 5 * 60;
    timeDisplay.textContent = formatTime(timeRemaining);
});

longBreakButton.addEventListener('click', () => {
    isBreakTime = true;
    timeRemaining = 15 * 60;
    timeDisplay.textContent = formatTime(timeRemaining);
});

startButton.addEventListener('click', () => {
    if (isBreakTime) {
        timeRemaining = timeRemaining;
    } else {
        timeRemaining = 25 * 60;
    }
    startTimer();
});

stopButton.addEventListener('click', () => {
    stopTimer();
});

resetButton.addEventListener('click', () => {
    resetTimer();
});
