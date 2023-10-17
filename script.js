let hours = 0, minutes = 0, seconds = 0;
let timer;
let isRunning = false;

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function captureScreenshot() {
    html2canvas(document.body).then(function(canvas) {
        const imgData = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'screenshot-' + new Date().toISOString() + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

function startTimer() {
    isRunning = true;
    timer = setInterval(() => {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
        updateDisplay();
        
        // Check if 15 minutes have passed
        if (hours % 15 == 0 && minutes == 0 && seconds == 0) {
            captureScreenshot();
        }
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
        startStopBtn.textContent = 'Stop';
    } else {
        stopTimer();
        startStopBtn.textContent = 'Start';
    }
});

resetBtn.addEventListener('click', () => {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
});
