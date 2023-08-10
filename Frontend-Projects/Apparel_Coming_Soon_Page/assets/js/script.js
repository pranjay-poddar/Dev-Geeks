// VARIABLE DECLARATIONS

const email = document.querySelector('#email'),
      mailContainer = document.querySelector('.mail-container'),
      errorPrompter = document.querySelector('.error-prompter'),
      submitBtn = document.querySelector('[type=submit]'),
      mainPage = document.querySelector('.main-page'),
      welcomePage = document.querySelector('.welcoming-page'),
      errorSign = document.querySelector('.error-sign'),
      greeting = document.querySelector('.greeting')
      let count = 0


// USING JS LIBRARY FOR ANIMATIONS
ScrollReveal().reveal('.reveal', { distance: '150%',origin: 'bottom', opacity: 0, duration: 1000})
ScrollReveal().reveal('.reveal-down',{ distance: '150%',origin: 'top', opacity: 0, duration: 1000})


// EMAIL VALIDATION

function onValidation(current ,messageString, booleanTest){
    let message = current
    message.textContent = messageString
    booleanTest != 0 ? count = 1 : count = 0
    count != 1 ? errorSign.style.display = 'unset': errorSign.style.display = 'none'
}

email.addEventListener('keyup', (e)=>{
    mailContainer.classList.remove('shake')
    email.value.includes('@') & email.value.includes('.com') ? onValidation(errorPrompter, '', 1) : onValidation(errorPrompter, '*Please provide a valid Email', 0)
})

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    if(count > 0){
        mainPage.classList.add('disabled')
        welcomePage.classList.remove('disabled')
        greeting.classList.add('reveal')
        setTimeout(() =>{
            ScrollReveal().reveal('.reveal', { distance: '150%',origin: 'bottom', opacity: 0, duration: 1000})
        }, 50);
    }
    else{
        errorPrompter.textContent = '*This field is Required'
        mailContainer.classList.add('shake')
        navigator.vibrate()
    }
})

