const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;

    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    context.beginPath();
    context.arc(x, y, size / 2, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function exportImage() {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'drawing.png';
    link.click();
}