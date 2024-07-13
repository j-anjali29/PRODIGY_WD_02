let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = '<img src="start_pause_icon.png" alt="Pause">';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = '<img src="start.png" alt="Start">';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = '<img src="start.png" alt="Start">';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    display.innerHTML = "00:00:00.00";
    difference = 0;
    lapCounter = 0;
    laps.innerHTML = '';
}

function lap() {
    const li = document.createElement('li');
    li.innerHTML = `Lap ${++lapCounter}: ${display.innerHTML}`;
    laps.appendChild(li);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = 
        (hours > 9 ? hours : "0" + hours) + ":" + 
        (minutes > 9 ? minutes : "0" + minutes) + ":" + 
        (seconds > 9 ? seconds : "0" + seconds) + "." + 
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}

startStopBtn.addEventListener("click", startStop);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);
