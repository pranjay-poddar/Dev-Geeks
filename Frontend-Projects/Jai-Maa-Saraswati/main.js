const imageContainer = document.getElementById('img-container');
const images = [
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/1.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/2.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/3.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/4.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/5.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/6.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/7.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/8.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/9.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/10.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/11.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/12.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/13.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/14.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/15.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/16.jpg`,
    `https://ik.imagekit.io/5bndldf5v/saraswati-maa/end.jpg`
];

let num = 0;
function next() {
    if (num < images.length) {
        imageContainer.innerHTML = `<img src="${images[num++]}" class="img" alt="maa.jpg">`
    }
}
setInterval(next, 1500);