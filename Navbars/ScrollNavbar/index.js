// Element.getBoundingClientRect() method returns the size of an element and its position relative to the 
// viewport pageYOffset is a read - only window property that returns the number of pixels the document 
// has been scrolled vertically. 


const navbar=document.querySelector('.navbar');

// use scrolly instead of pageyoffset.
window.addEventListener('scroll',function () {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
      navbar.classList.add("fixed-nav");
    } else {
      navbar.classList.remove("fixed-nav");
    }
})