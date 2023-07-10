// Hamburger menu section
const navigationButton = document.querySelector('.header__menu-button');
navigationButton.addEventListener('click', (e)=> {
    navigationButton.getAttribute('aria-expanded') === 'false' ? navigationButton.setAttribute('aria-expanded', 'true') : navigationButton.setAttribute('aria-expanded', 'false')
})

// Header trigger on scroll down
window.onscroll = function() {
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ?  document.querySelector("header").classList.add('header--active') : document.querySelector("header").classList.remove('header--active')
};
