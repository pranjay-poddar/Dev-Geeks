import {toast} from 'wc-toast';

const mailInput = document.querySelector('input'),
      mailRegExp = /^([a-zA-z0-9._%+-]+)@([a-zA-z0-9.-]+)\.([a-zA-z]{2,})$/,
      errorPrompter = document.querySelector('#error-message');

let validationPassed = false;

mailInput.addEventListener('keyup', (e)=>{
    const userInput = e.target.value;

    if (mailRegExp.test(userInput)){
        e.target.classList.remove('main__email--invalid');
        validationPassed = true;
    } else {
        e.target.classList.add('main__email--invalid');
        errorPrompter.textContent = 'Please provide a valid email address';
        validationPassed = false;
    }
})


const formElement = document.querySelector('form');

formElement.addEventListener('submit', (e)=>{
    e.preventDefault();

    if (validationPassed) {
        mailInput.value = '';
        toast.success('Subscribed!');
        validationPassed = false;
    } else if (mailInput.value == '') {
        errorPrompter.textContent = 'Whoops! It looks like you forgot to add your email';
        mailInput.classList.add('main__email--invalid')
    }
})