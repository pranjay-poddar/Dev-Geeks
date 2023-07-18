const scoreVar = document.querySelector('.score span');
let score = 0;

const holes = [...document.querySelectorAll('.hole')];

function start(){
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'mole-image.jpg';

    img.addEventListener('click', () => {
        img.src = 'pngtree-mole-image.jpg';
        score++;
        scoreVar.textContent = score;
    })

    hole.appendChild(img);

    setTimeout(() => {
        hole.removeChild(img);
        start();
    }, 1000);
}

start();