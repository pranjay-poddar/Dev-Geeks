const everyInputElement = document.querySelectorAll('input')

const regExps = [/^[0-9a-zA-Z]{3,15}$/, 
                /^[0-9a-zA-Z]{3,15}$/,                                              // Name
                /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/,           // Email
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/,                              // Password
            ]


let index = 0  // Used for iterative purposes

everyInputElement.forEach(inputElement => {

    const currentRegExp = regExps[index]

    inputElement.addEventListener('keyup', (e)=>{
        e.target.parentNode.parentNode.classList.add('main__form-container--added-space')

        const value = e.target.value

        if(currentRegExp.test(value)) {
            e.target.parentNode.classList.remove('main__form-label--prompt-disabled')
            e.target.parentNode.classList.add('main__form-label--validation-success')
        } else {
            e.target.parentNode.classList.add('main__form-label--prompt-disabled')
        }
    })


    ++index
})



index = 0  // Re-using the index variable for iteration

function isValidationPassed(){
    const errorPrompters = document.querySelectorAll('label')
    const validationSuccessCount = []

    errorPrompters.forEach(prompter => {
        const ifTrue = prompter.classList.contains('main__form-label--validation-success')
        const currentInputElement = everyInputElement[index]
        
        if(ifTrue && currentInputElement.value !== '') {
            validationSuccessCount.push(ifTrue)
        } else {
            prompter.classList.remove('main__form-label--validation-success')
            prompter.classList.add('main__form-label--prompt-disabled') 
            prompter.parentElement.classList.add('main__form-container--added-space')  
        }

        ++index
    })

    index = 0

    return validationSuccessCount.length === 4
    
}

const confirmOverlayContainer = document.querySelector('.main__form-overlay')

document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault()

    if(isValidationPassed()) return confirmOverlayContainer.classList.remove('main__form-overlay--disabled')
})

