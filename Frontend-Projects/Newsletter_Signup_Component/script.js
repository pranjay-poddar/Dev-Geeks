const mailInput = document.querySelector('input'),
      mailRegExp = /^([a-zA-z0-9._%+-]+)@([a-zA-z0-9.-]+)\.([a-zA-z]{2,})$/;

let isLiveMailVerifierInitialized = false;

function initializeLiveMailVerifier() {
    mailInput.addEventListener('keyup', (e)=>{
        const userInput = e.target.value;
    
        if (mailRegExp.test(userInput)){
            e.target.classList.remove('form__mail--invalid');
        } else {
            e.target.classList.add('form__mail--invalid');
        }
    })    
}

const formElement = document.querySelector('form'),
      formSection = document.querySelector('.main__form');

formElement.addEventListener('submit', (e)=>{
    e.preventDefault();

    if (isLiveMailVerifierInitialized === false) {
        initializeLiveMailVerifier()
        isLiveMailVerifierInitialized = true
    }

    if (mailRegExp.test(mailInput.value)) {
        mailInput.value = '';
        formSection.classList.add('main__form--success')

    } else {
        mailInput.classList.add('form__mail--invalid')
    }
})

document.querySelector('.success-state__dismiss-btn').addEventListener('click', ()=>{
    formSection.classList.remove('main__form--success')
})