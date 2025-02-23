let countdown;
let timeLeft = 0;
let isRunning = false;

// Set the timer based on egg type but don't start yet
function setTimer(seconds) {
    stopTimer(); // Reset timer if switching eggs
    timeLeft = seconds;
    updateTimerDisplay(timeLeft);
}

// Start the timer countdown
function startTimer() {
    if (isRunning || timeLeft <= 0) return;
    
    isRunning = true;
    const then = Date.now() + timeLeft * 1000;

    countdown = setInterval(() => {
        timeLeft = Math.round((then - Date.now()) / 1000);
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("🥚🍳 Your egg is ready! Enjoy! 🍽️");
            isRunning = false;
        }        

        updateTimerDisplay(timeLeft);
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(countdown);
    isRunning = false;
}

// Update timer display
function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    document.getElementById("timer").textContent = `${minutes}:${String(remainderSeconds).padStart(2, "0")}`;
}
