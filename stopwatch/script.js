let timer;
let isRunning = false;
let seconds = 0;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startStopButton').textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 1000);
        document.getElementById('startStopButton').textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function updateTime() {
    seconds++;
    displayTime();
}

function displayTime() {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.getElementById('stopwatch').textContent = formattedTime;
}

function recordLap() {
    if (isRunning) {
        laps.push(document.getElementById('stopwatch').textContent);
        updateLapList();
    }
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    document.getElementById('stopwatch').textContent = '0:00';
    document.getElementById('startStopButton').textContent = 'Start';
    laps = [];
    updateLapList();
}