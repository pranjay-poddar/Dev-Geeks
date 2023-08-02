const rand = function(min, max) {
    return Math.random() * ( max - min ) + min;
}

let canvas = document.getElementById('canvas');
let con = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
con = canvas.getContext('2d');
con.globalCompositeOperation = 'lighter';
});
let backgroundColors = [ '#FFDDCC', '#FEBBCC' ];
let colors = [
[ '#000003', '#410967' ],
[ '#932567', '#DC5039' ], 
[ '#FBA40A', '#FCFEA4' ]
];
let count = 70;
let blur = [ 12, 70 ];
let radius = [ 1, 120 ];

con.clearRect( 0, 0, canvas.width, canvas.height );
con.globalCompositeOperation = 'lighter';

let grd = con.createLinearGradient(0, canvas.height, canvas.width, 0);
grd.addColorStop(0, backgroundColors[0]);
grd.addColorStop(1, backgroundColors[1]);
con.fillStyle = grd;
con.fillRect(0, 0, canvas.width, canvas.height);

let items = [];

while(count--) {
    let thisRadius = rand( radius[0], radius[1] );
    let thisBlur = rand( blur[0], blur[1] );
    let x = rand( -100, canvas.width + 100 );
    let y = rand( -100, canvas.height + 100 );
    let colorIndex = Math.floor(rand(0, 299) / 100);
    let colorOne = colors[colorIndex][0];
    let colorTwo = colors[colorIndex][1];
    
    con.beginPath();
    con.filter = `blur(${thisBlur}px)`;
    let grd = con.createLinearGradient(x - thisRadius / 2, y - thisRadius / 2, x + thisRadius, y + thisRadius);

    grd.addColorStop(0, colorOne);
    grd.addColorStop(1, colorTwo);
    con.fillStyle = grd;
    con.fill();
    con.arc( x, y, thisRadius, 0, Math.PI * 2 );
    con.closePath();
    
    let directionX = Math.round(rand(-99, 99) / 100);
    let directionY = Math.round(rand(-99, 99) / 100);

    items.push({
    x: x,
    y: y,
    blur: thisBlur,
    radius: thisRadius,
    initialXDirection: directionX,
    initialYDirection: directionY,
    initialBlurDirection: directionX,
    colorOne: colorOne,
    colorTwo: colorTwo,
    gradient: [ x - thisRadius / 2, y - thisRadius / 2, x + thisRadius, y + thisRadius ],
    });
}


function changeCanvas(timestamp) {
con.clearRect(0, 0, canvas.width, canvas.height);
let adjX = 2;
let adjY = 2;
let adjBlur = 1;
items.forEach(function(item) {
    
    if(item.x + (item.initialXDirection * adjX) >= canvas.width && item.initialXDirection !== 0 || item.x + (item.initialXDirection * adjX) <= 0 && item.initialXDirection !== 0) {
        item.initialXDirection = item.initialXDirection * -1;
    }
    if(item.y + (item.initialYDirection * adjY) >= canvas.height && item.initialYDirection !== 0 || item.y + (item.initialYDirection * adjY) <= 0 && item.initialYDirection !== 0) {
        item.initialYDirection = item.initialYDirection * -1;
    }
    
    if(item.blur + (item.initialBlurDirection * adjBlur) >= radius[1] && item.initialBlurDirection !== 0 || item.blur + (item.initialBlurDirection * adjBlur) <= radius[0] && item.initialBlurDirection !== 0) {
        item.initialBlurDirection *= -1;
    }
    
    item.x += (item.initialXDirection * adjX);
    item.y += (item.initialYDirection * adjY);
    item.blur += (item.initialBlurDirection * adjBlur);
    con.beginPath();
    con.filter = `blur(${item.blur}px)`;
    let grd = con.createLinearGradient(item.gradient[0], item.gradient[1], item.gradient[2], item.gradient[3]);
    grd.addColorStop(0, item.colorOne);
    grd.addColorStop(1, item.colorTwo);
    con.fillStyle = grd;
    con.arc( item.x, item.y, item.radius, 0, Math.PI * 2 );
    con.fill();
    con.closePath();
    
});
window.requestAnimationFrame(changeCanvas);

}

window.requestAnimationFrame(changeCanvas);