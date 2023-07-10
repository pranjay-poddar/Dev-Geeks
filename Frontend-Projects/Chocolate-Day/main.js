const body = document.querySelector("#main")
const str = document.querySelector("#txt");

const play = () => {
    document.getElementById("audio").play();
}
const move = () => {
    pos++;
    str.innerHTML += txt.charAt(pos);
}
const image = () => {
    const mobileBgImage = "https://w0.peakpx.com/wallpaper/174/391/HD-wallpaper-hearts-red.jpg";
    const laptopBgImage = "https://w0.peakpx.com/wallpaper/315/84/HD-wallpaper-red-glare-hearts-red-glitter-background-creative-love-concepts-abstract-hearts-red-hearts.jpg";
    if(window.innerWidth<500){
        return mobileBgImage;
    }
    return laptopBgImage;
}

let txt = "Happy chocolate 🍫 day!";
let txtlen = txt.length;
let pos = -1;
let t = setInterval(move, 200);

window.addEventListener("mouseover", play);
window.addEventListener("click", play);

body.style.backgroundImage = `url(${image()})`;
swal({
    title: "Happy Chocolate Day !",
    text: "Have A Beautiful day !!",
    icon: "success",
    button: "Thanks 🍫",
});