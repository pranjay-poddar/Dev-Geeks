// Initialize Swiper

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "5",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true
  });


// Initialize ScrollReveal

ScrollReveal().reveal('.reveal', { distance: '150%',origin: 'bottom', opacity: 0, duration: 1000})