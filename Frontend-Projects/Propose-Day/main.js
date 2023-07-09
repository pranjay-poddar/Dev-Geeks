swal({
    title: "Happy Propose Day !",
    text: "Have A Beautiful day !!",
    icon: "success",
    button: "Thanks ❤️",
});

window.addEventListener("mouseover", play);
window.addEventListener("click", play);
function play() {
    document.getElementById("audio").play();
}
let str = document.querySelector("#text");
let txt = "Happy Propose day ❤️";
let txtlen = txt.length;
let pos = -1;
let t = setInterval(move, 400);

function move() {
    pos++;
    str.innerHTML += txt.charAt(pos);
}