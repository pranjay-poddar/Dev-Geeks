var bar = document.querySelector('#left #bar2');
var btn = document.querySelector('#left button');

var pos = 0;
var s;

function barAnimation() {
    if (pos === 0) {
        s = setInterval(function () {
            pos++;
            bar.style.transform = `translateX(${pos}px)`;
        }, 5);
        setTimeout(function () {
            clearInterval(s);
            console.log(pos);
        }, 300);
        setTimeout(function () {
            pos = 0;
            bar.style.display = 'none';
        }, 1000);
    }
    else {
        pos = 0;
    }
}

btn.addEventListener('mouseover', function () {
    bar.style.display = 'flex';
    barAnimation();
});

var cart = document.querySelector('#bubble h6');

var items = 0;

btn.addEventListener('click', function () {
    items++;
    cart.textContent = `${items}`;
});

var leftbtn = document.querySelector('#leftbtn');
var rightbtn = document.querySelector('#rightbtn');
var cycle3 = document.querySelector('#cycle3 img');
var cycle2 = document.querySelector('#cycle2 img');
var cycle1 = document.querySelector('#cycle1 img');
var bone = document.querySelector('#one');
var btwo = document.querySelector('#two');
var bthree = document.querySelector('#three');
var size = document.querySelector('#mid #size');
var sizeVal = document.querySelector('#size h3');
var weight = document.querySelector('#mid #weight');
var weightVal = document.querySelector('#weight h3');
var origin = document.querySelector('#mid #origin');
var originVal = document.querySelector('#origin h3');
var slabColor = document.querySelector('#right #south');
var slabBtnLColor = document.querySelector('#south #leftbtn');
var slabBtnRColor = document.querySelector('#south #rightbtn');
var price = document.querySelector('#south h1');
var bikeName = document.querySelector('#south h2');

var posC1 = -47;
var posC2 = 53;
var posC3 = 153;

function Red() {
    slabColor.style.backgroundColor = 'rgba(199, 25, 19, 0.74)';
    slabBtnLColor.style.backgroundColor = '#ff3f3f';
    slabBtnRColor.style.backgroundColor = '#ff3f3f';

    bikeName.textContent = 'Pedelec';
    price.textContent = '$302.99';

    circle1.style.background = 'linear-gradient(to bottom right, rgb(238, 145, 145), rgba(233, 56, 56, 0.842))';
    circle2.style.background = 'rgb(226, 221, 221)';
    circle3.style.background = 'rgb(226, 221, 221)';
    left.style.background = 'linear-gradient(to bottom right, rgb(238, 145, 145), rgba(233, 56, 56, 0.842))';
    // one
    bone.style.top = '315px';
    bone.style.left = '542px';
    bone.style.background = 'rgba(233, 56, 56, 1)';
    // two
    btwo.style.top = '297px';
    btwo.style.left = '815px';
    btwo.style.background = 'rgba(233, 56, 56, 1)';
    // three
    bthree.style.top = '513px';
    bthree.style.left = '553px';
    bthree.style.background = 'rgba(233, 56, 56, 1)';

    bone.addEventListener('mouseover', function () {
        origin.style.display = 'initial';
        originVal.textContent = 'Germany';
    });

    btwo.addEventListener('mouseover', function () {
        weight.style.display = 'initial';
        weightVal.textContent = '11 Kg';
    });
    bthree.addEventListener('mouseover', function () {
        size.style.display = 'initial';
        sizeVal.textContent = '48 cm';
    });
}

function Blue() {
    slabColor.style.backgroundColor = '#2e3e5bcb';
    slabBtnLColor.style.backgroundColor = '#2c92ff';
    slabBtnRColor.style.backgroundColor = '#2c92ff';

    price.textContent = '$298.99';
    bikeName.textContent = 'AeroBike';

    circle1.style.background = 'rgb(226, 221, 221)';
    circle2.style.background = 'linear-gradient(to bottom right, #8ec5ff, #007bffdc)';
    circle3.style.background = 'rgb(226, 221, 221)';
    left.style.background = 'linear-gradient(to bottom right, #409cff, #007bfff1)';
    // one
    bone.style.top = '235px';
    bone.style.left = '625px';
    bone.style.background = '#2c92ff';
    // two
    btwo.style.top = '256px';
    btwo.style.left = '845px';
    btwo.style.background = '#2c92ff';
    // three
    bthree.style.top = '550px';
    bthree.style.left = '655px';
    bthree.style.background = '#2c92ff';

    bone.addEventListener('mouseover', function () {
        origin.style.display = 'initial';
        originVal.textContent = 'Italy';
    });
    btwo.addEventListener('mouseover', function () {
        weight.style.display = 'initial';
        weightVal.textContent = '10 Kg';
    });
    bthree.addEventListener('mouseover', function () {
        size.style.display = 'initial';
        sizeVal.textContent = '50 cm';
    });
}

function Orange() {
    slabColor.style.backgroundColor = 'rgba(236, 140, 15, 0.90)';
    slabBtnLColor.style.backgroundColor = 'rgb(255, 180, 81)';
    slabBtnRColor.style.backgroundColor = 'rgb(255, 180, 81)';

    bikeName.textContent = 'Mahindra GenZe';
    price.textContent = '$280.99';

    circle1.style.background = 'rgb(226, 221, 221)';
    circle2.style.background = 'rgb(226, 221, 221)';
    circle3.style.background = 'linear-gradient(to bottom right, #eec794, #ee9c31dc)';
    left.style.background = 'linear-gradient(to bottom right, #ffc187, #ff8f26)';
    // one
    bone.style.top = '235px';
    bone.style.left = '668px';
    bone.style.background = ' #ff8f26';
    // two
    btwo.style.top = '305px';
    btwo.style.left = '832px';
    btwo.style.background = ' #ff8f26';
    // three
    bthree.style.top = '520px';
    bthree.style.left = '686px';
    bthree.style.background = ' #ff8f26';

    bone.addEventListener('mouseover', function () {
        origin.style.display = 'initial';
        originVal.textContent = 'India';
    });
    btwo.addEventListener('mouseover', function () {
        weight.style.display = 'initial';
        weightVal.textContent = '10 Kg';
    });
    bthree.addEventListener('mouseover', function () {
        size.style.display = 'initial';
        sizeVal.textContent = '49 cm';
    });
    // if (posC3 > 53) {
    // posC1 -= 100;
    // posC2 -= 100;
    // posC3 -= 100;
    // cycle1.style.left = `${posC1}%`;
    // cycle2.style.left = `${posC2}%`;
    // cycle3.style.left = `${posC3}%`;
    // }
}

function currentPage() {
    origin.style.display = 'none';
    weight.style.display = 'none';
    size.style.display = 'none';
    if (posC2 === 53) {
        Blue();
    }
    else if (posC1 === 53) {
        Red();
    }
    else if (posC3 === 53) {
        Orange();
    }
};
currentPage();

rightbtn.addEventListener('click', function () {
    if (posC3 > 53) {
        posC1 -= 100;
        posC2 -= 100;
        posC3 -= 100;
        cycle1.style.left = `${posC1}%`;
        cycle2.style.left = `${posC2}%`;
        cycle3.style.left = `${posC3}%`;
    }
    currentPage();
});

leftbtn.addEventListener('click', function () {
    if (posC1 < 53) {
        posC1 += 100;
        posC2 += 100;
        posC3 += 100;
        cycle1.style.left = `${posC1}%`;
        cycle2.style.left = `${posC2}%`;
        cycle3.style.left = `${posC3}%`;
    }
    currentPage();
});

var models = document.querySelector('#west i');
var dropDown = document.querySelector('#drop-down');

var pedelec = document.querySelector('#drop-down #pedelec');
var aerobike = document.querySelector('#drop-down #aerobike');
var genze = document.querySelector('#drop-down #genze');

pedelec.addEventListener('click', function () {
    Red();
    toCenter(posC1);
});

aerobike.addEventListener('click', function () {
    Blue();
    toCenter(posC2);
});

genze.addEventListener('click', function () {
    Orange();
    toCenter(posC3);
});

models.addEventListener('click', function (dets) {
    dropDown.style.opacity = '1';
    dropDown.style.top = '16%';
    dropDown.addEventListener('mouseleave', function () {
        setTimeout(function () {
            dropDown.style.opacity = '0';
            dropDown.style.top = '0%';
        }, 2000);
    });
});

var distance;

function toCenter(cycle) {
    distance = 53 - cycle;
    posC1 += distance;
    posC2 += distance;
    posC3 += distance;
    cycle1.style.left = `${posC1}%`;
    cycle2.style.left = `${posC2}%`;
    cycle3.style.left = `${posC3}%`;
    // console.log(distance);
    // console.log(cycle);
};

var addToCart = document.querySelector('#left button');
var atc = document.querySelector('#ATCtext')
addToCart.addEventListener('click', function(){
    atc.style.opacity = '1';
    setTimeout (function(){
        atc.style.opacity = '0';
    }, 1000);
});