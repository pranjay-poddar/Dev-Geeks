let navbar = document.querySelector(".navbar");

document.querySelector('#menu-bar').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}


var swiper = new Swiper (".featured-slider", {
    loop:true,
    grabCursor:true,
    spaceBetween: 20,
    autoplay:{
        delay:9500,
        disableOnInteraction: false,
    },
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        991:{
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper (".brand-slider", {
    loop:true,
    grabCursor:true,
    spaceBetween: 20,
    autoplay:{
        delay:2500,
        disableOnInteraction: false,
    },
    breakpoints:{
        0:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
        991:{
            slidesPerView: 5,
        },
    },
});
