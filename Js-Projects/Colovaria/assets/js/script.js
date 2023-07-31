const colors = [];
const colorPalette = document.querySelector('#color-palette');
const generateBtn = document.querySelector('.generate');

generateBtn.addEventListener('click', () => {
    colorPalette.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const color = generateColor();
        colors.push(color);
        let paletteCard = `
            <div class="card">
                <div class="clr"></div>
                <div class="name">${color}</div>
            </div>
        `;
        colorPalette.innerHTML += paletteCard;
        document.getElementsByClassName('clr')[i].style.backgroundColor = color;
    }
});

function generateColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
}
