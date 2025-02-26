let countdown;
let timeLeft = 0;
let isRunning = false;
let isPaused = false;
let totalTime = 0;

// Set the timer based on egg type but don't start yet
function setTimer(seconds, eggType) {
    stopTimer(); // Reset timer if switching eggs
    timeLeft = seconds;
    totalTime = seconds;
    updateTimerDisplay(timeLeft);
    updateEggImage(eggType);
    
    // Enable start button
    document.getElementById('startBtn').disabled = false;
}

// Set custom timer
function setCustomTimer() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const totalSeconds = (minutes * 60) + seconds;
    
    if (totalSeconds > 0) {
        setTimer(totalSeconds, 'custom');
    } else {
        alert("Please enter a valid time!");
    }
}

// Start the timer countdown
function startTimer() {
    if (isRunning || timeLeft <= 0) return;
    
    isRunning = true;
    isPaused = false;
    
    // Disable start button, enable pause and reset buttons
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('stopBtn').disabled = false;
    
    // Add cooking animation to egg
    document.getElementById('eggImage').classList.add('cooking');
    
    let startTime = Date.now();
    let elapsedPauseTime = 0;

    countdown = setInterval(() => {
        if (!isPaused) {
            // Calculate remaining time
            const elapsed = Math.floor((Date.now() - startTime) / 1000) - elapsedPauseTime;
            timeLeft = totalTime - elapsed;
            
            // Update progress bar
            updateProgressBar(timeLeft, totalTime);
            
            if (timeLeft <= 0) {
                timerComplete();
            } else {
                updateTimerDisplay(timeLeft);
            }
        }
    }, 100); // Update more frequently for smoother progress bar
}

// Pause the timer
function pauseTimer() {
    if (!isRunning) return;
    
    if (!isPaused) {
        // Pause the timer
        isPaused = true;
        document.getElementById('pauseBtn').textContent = 'Resume';
        document.getElementById('eggImage').classList.remove('cooking');
    } else {
        // Resume the timer
        isPaused = false;
        document.getElementById('pauseBtn').textContent = 'Pause';
        document.getElementById('eggImage').classList.add('cooking');
    }
}

// Stop the timer
function stopTimer() {
    clearInterval(countdown);
    isRunning = false;
    isPaused = false;
    timeLeft = 0;
    updateTimerDisplay(0);
    updateProgressBar(0, 1); // Reset progress bar
    
    // Reset buttons
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('pauseBtn').textContent = 'Pause';
    document.getElementById('stopBtn').disabled = false;
    
    // Remove egg animations
    document.getElementById('eggImage').classList.remove('cooking');
    document.getElementById('eggImage').classList.remove('done');
}

// Timer completed
function timerComplete() {
    clearInterval(countdown);
    isRunning = false;
    
    // Play sound
    playAlarmSound();
    
    // Show notification
    showNotification();
    
    // Update UI
    updateTimerDisplay(0);
    document.getElementById('pauseBtn').disabled = true;
    
    // Change egg appearance
    document.getElementById('eggImage').classList.remove('cooking');
    document.getElementById('eggImage').classList.add('done');
    
    // Show alert
    setTimeout(() => {
        alert("🥚🍳 Your egg is ready! Enjoy! 🍽️");
    }, 500);
}

// Play alarm sound
function playAlarmSound() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
}

// Show browser notification
function showNotification() {
    if (Notification.permission === "granted") {
        const notification = new Notification("Egg Timer", {
            body: "Your egg is ready! 🥚🍳",
            icon: "egg.jpg"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
}

// Update egg image based on type
function updateEggImage(eggType) {
    // You can add different egg images for different types if you want
    // For now, we'll just use the same egg image
}

// Update timer display
function updateTimerDisplay(seconds) {
    if (seconds < 0) seconds = 0;
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    document.getElementById("timer").textContent = 
        `${minutes}:${String(remainderSeconds).padStart(2, "0")}`;
}

// Update progress bar
function updateProgressBar(timeLeft, totalTime) {
    const progressPercent = 100 - ((timeLeft / totalTime) * 100);
    document.getElementById('progress').style.width = `${progressPercent}%`;
}

// Request notification permission when page loads
window.addEventListener('load', () => {
    if (Notification.permission !== "denied") {
        Notification.requestPermission();
    }
    
    // Set buttons initially
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
});
