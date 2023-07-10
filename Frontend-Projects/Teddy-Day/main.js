const play = () => {
    document.getElementById("audio").play();
}

const move = () => {
    pos++;
    str.innerHTML += txt.charAt(pos);
}

let str = document.querySelector("#txt");
let txt = "Happy Teddy day 🐻";
let txtlen = txt.length;
let pos = -1;
let t = setInterval(move, 400);


window.addEventListener("mouseover", play);
window.addEventListener("click", play);




swal({
    title: "Happy Teddy Day !",
    text: "Have A Beautiful day !!",
    icon: "success",
    button: "Thanks 🐻",
});