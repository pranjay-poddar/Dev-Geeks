const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
  });


  const navP1 = document.querySelector(".navLinks");
  const width = window.innerWidth;;
  const drop = () => {
      if (navP1.style.display == "block") {
          navP1.style.display = "none";
      }
      else{
          navP1.style.display = "block";
      }
  }
