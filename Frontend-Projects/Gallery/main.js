const currentWidth = window.innerWidth;
const photoContainer = document.getElementById("photo-container");
const photos = [
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/1.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/2.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/3.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/4.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/5.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/6.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/7.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/8.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/9.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/10.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/11.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/12.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/13.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/14.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/15.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/16.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/17.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/18.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/19.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/20.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/21.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/22.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/23.jpg`,
    `https://ik.imagekit.io/5bndldf5v/tr:w-${currentWidth}/Gallery/24.jpg`
]

const str = document.querySelector(`#txt`);
const txt = `Welcome to Gallery of Rashmika Mandanna! `;

let num = 0;

function move() {
    pos++;
    str.innerHTML += txt.charAt(pos);
    if(str.innerHTML === txt){
        clearInterval(t)
    }
}

function next() {
    var slider = document.getElementById(`slider`);
    num++;
    if (num >= photos.length) {
        num = 0;
    }
    slider.src = photos[num];
}

function auto() {
    setInterval(next, 1500);
}
