const section = document.querySelector('.section');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.registration-link');
const btnPopup = document.querySelector('.split');
const iconClose = document.querySelector('.icon-close');


registerLink.addEventListener('click', ()=> {
    section.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    section.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    section.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    section.classList.remove('active-popup');
});
