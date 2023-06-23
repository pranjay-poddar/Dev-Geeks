const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Input section
let color= document.querySelector('#color');
function change_color(){
    console.log('hi');
    let colored='#';
    let random=Math.random().toString(16).slice(2,8);
    colored+=random;
    console.log(colored);
    ctx.strokeStyle = colored;
    isbeautiful=false;
    //Change the heading and button color
    document.querySelector('.heading').style.color=colored;
}

color.addEventListener('click',change_color);

//Changing colors section
let beautiful=document.querySelector('#hue');
let isbeautiful=false;
beautiful.addEventListener('click',()=> {
    isbeautiful=true;
    console.log(isbeautiful);
});
//clearing
const clear=document.querySelector('#clear');
clear.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth=2;
//GlobalCompositeOpeartaor to play with blend. Have a look

let isDrawing=false; //Acts as a flag to tell that we have clicked the mouse and we can dra now
let lastX=0; // To give the start and the end point in the line
let lastY=0;
let hue=0;//To change the colors
let width_direction=true;
function draw(e){
    if(!isdrawing)
       return;// Stops the function when they are not moused down
    // console.log(e);
    if(isbeautiful){
       ctx.strokeStyle = '#BADA55';
       ctx.strokeStyle=`hsl(${hue},100%,50%)`;//Hue,saturation,lightness
       //Change the heading and button color
       document.querySelector('.heading').style.color=ctx.strokeStyle;
    }
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX=e.offsetX;
    lastY=e.offsetY;
     hue++;
     if(hue>360){
        hue=0;
     }
     if(ctx.lineWidth>50 || ctx.lineWidth <=1){
        width_direction=!width_direction;
     }
     if(width_direction)
       ctx.lineWidth++;
     else
       ctx.lineWidth--;
}
//Adding mousedown event before mousemove ,inorder to update the lastX,lastY. So, that drawing starts from the place where it is clicked first instead of 0,0;
document.addEventListener('mousedown',(e) => {
   isdrawing=true;
   lastX=e.offsetX;
   lastY=e.offsetY;
});
document.addEventListener('mousemove', draw);  
document.addEventListener('mouseup', () => isdrawing=false);
document.addEventListener('mouseout',() => isdrawing=false);