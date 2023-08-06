const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let color = 'black';
let prevX = 0;
let prevY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    prevX = e.offsetX;
    prevY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        draw(e.offsetX, e.offsetY);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

function draw(x, y) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
    prevX = x;
    prevY = y;
}

const colors = document.querySelectorAll('.color');

colors.forEach((button) => {
    button.addEventListener('click', () => {
        color = button.style.backgroundColor;
    });
});

const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
