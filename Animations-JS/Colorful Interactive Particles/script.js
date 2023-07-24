window.onload = init();
function init(){
canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;
canvas.addEventListener('mousemove',MouseMove,false);

mouse = {x:0,y:0}
particleHolder = [];
x = 100;
y = 100;
angle = 0.2;
radius = 80;
particleCount = 1500;
color = [
'rgba(106, 210, 231, 0.5)',
'rgba(250, 104, 0, 0.5)',
'rgba(243, 132, 48, 0.5)',
'rgba(198, 244, 98, 0.5)',
'rgba(255, 107, 107, 0.5)',
'rgba(250, 204, 0, 0.5)',
 'rgba(232, 125, 2, 0.5)',
'rgba(202, 232, 105, 0.5)',
'rgba(0, 169, 199, 0.5)',
'rgba(63, 191, 202, 0.5)',
'rgba(174, 225, 55, 0.5)',
 'rgba(208, 231, 80, 0.5)',
'rgba(78, 189, 233, 0.5)',
'rgba(37, 174, 228, 0.5)',
'rgba(249, 214, 36, 0.5)',
'rgba(240, 122, 25, 0.5)',
'rgba(239, 169, 46, 0.5)',
'rgba(136, 197, 38, 0.5)',
'rgba(190, 242, 2, 0.5)',
'rgba(250, 42, 0, 0.5)',
'rgba(0, 178, 255, 0.5)',
'rgba(127, 255, 36, 0.5)',
'rgba(194, 255, 102, 0.5)',
'rgba(200, 255, 0, 0.5)',
'rgba(19, 205, 75, 0.5)',
'rgba(126, 112, 215, 0.5)',
'rgba(187, 233, 7, 0.5)',
'rgba(192, 250, 56, 0.5)',
'rgba(170, 255, 0, 0.5)',
'rgba(255, 170, 0, 0.5)',
'rgba(255, 0, 170, 0.5)',
'rgba(170, 0, 255, 0.5)',
'rgba(0, 170, 255, 0.5)',
'rgba(255, 255, 0, 0.5)'
];


function MouseMove(event)
{
	mouse.x = event.pageX - canvas.offsetLeft;
	mouse.y = event.pageY - canvas.offsetLeft;
}
for(i = 0; i < particleCount ; i++)
{particleHolder.push(new generateParticles());}
function generateParticles()
{
this.x = Math.random()*canvas.width;
this.y = Math.random()*canvas.height;
this.color = color[Math.floor(Math.random()*color.length)];
this.rad = Math.floor(Math.random()*7);
}
function vibrate()
{

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);
for(var j = 0; j < particleHolder.length; j++)
{
var par = particleHolder[j];
var distanceX = par.x - mouse.x;
var distanceY = par.y - mouse.y;
particleDistance =  Math.sqrt(distanceX*distanceX + distanceY*distanceY);

particleMouse = Math.max( Math.min( 75 / ( particleDistance /par.rad ), 10 ), 0.1 );
context.beginPath();
context.fillStyle = par.color;
context.arc(par.x + Math.sin(angle++*Math.cos(radius++)), 
par.y - Math.cos(angle++*Math.sin(radius++)), 
par.rad*particleMouse, Math.PI*2, false);
context.fill();
}
}
setInterval(vibrate, 30);
};