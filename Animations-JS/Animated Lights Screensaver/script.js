const container = document.getElementById('container');
const user = document.getElementById('user');
const colorsCombo = ['#e5243f','#f65c51','#f7b15c','#54c6be','#2f5755']; // color combinations

/**
 * returns the distance between 2 points (x1, y1) and (x2, y2)
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}

let height = 20;
let width = 20;
let gap = 5;
let x = 5;
let y = 5;
let lights = []
let blinkTime = 10000 //ms

// setup
for(let i=0; i<3000; i++) {
    
    if(x + width > innerWidth) {
        x = 5;
        y = y + height + gap;
    }
    if (y + height > innerHeight) {
        break;
    }

    let bulb = document.createElement('span');
    bulb.style.left = `${x}px`;
    bulb.style.top = `${y}px`;
    
    // setting a random color from color combinations
    let color = colorsCombo[Math.floor(Math.random() * colorsCombo.length)];
    bulb.style.backgroundColor = color;
    
    // setting the onclick function
    bulb.onclick = () => {
        bulb.style.filter = `brightness(1.7) drop-shadow(0 0 6px ${color}) blur(2px)`;
        // the light bulb becomes normal after blinkTime 
        setTimeout(() => {
            bulb.style.filter = `brightness(0.4) blur(1px) opacity(0.8)`;
        },blinkTime);
    }

    bulb.setAttribute('class','light');
    lights.push(bulb);
    container.appendChild(bulb);
    
    x = x + width + gap;
}

// user interaction, may be removed
addEventListener('mousemove',(event) => {
    user.style.top = `${event.pageY-100}px`;
    user.style.left = `${event.pageX-100}px`;
});

addEventListener('resize',() => location.reload());

// for patterns edit the lights to be clicked
setInterval(() => {
    lights[Math.floor(Math.random()* lights.length)].click();
},200)

