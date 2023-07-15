class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    analyzeBtnClick(clickedBtn){
        const btns = document.querySelectorAll('button');
        let btnType = undefined

        btns.forEach(btn => { if(btn.textContent === clickedBtn){ btnType = btn; console.log(btn)}})
        this.activateBtn(btnType)
    }

    activateBtn(type){

        let btnType = type.attributes[0].name.slice(5)

        if(btnType === 'equals'){
            type.classList.add('clicked-equals');
        }
        else if(btnType === 'operation'){
            type.classList.add('clicked-operation');
        }
        else if(btnType === 'all-clear' || btnType === 'delete'){
            btnType = 'erase'
            type.classList.add('clicked-erase');
        }
        else if(btnType === 'number'){
            type.classList.add('clicked-number');
        }
        this.disableTransition(btnType);
    }

    disableTransition(element){
        function removeTransition(e){   // Function with (e)event info as argument.
            if(e.propertyName !== 'transform') return; // if
            e.target.classList.remove(`clicked-${element}`);   // else
        }

        const actionBtns = document.querySelectorAll('button');
        actionBtns.forEach(btn => btn.addEventListener('transitionend', removeTransition));
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computedResult
        let previousValue = parseFloat(this.previousOperand)
        let currentValue = parseFloat(this.currentOperand)
        if(isNaN(previousValue) || isNaN(currentValue)) return
        switch(this.operation){
            case '+':
                computedResult = previousValue + currentValue
                break
            case '-':
                computedResult = previousValue - currentValue
                break
            case 'x':
            case '*':
                computedResult = previousValue * currentValue
                break 
            case '÷':
            case '/':
                computedResult = previousValue / currentValue
                break
            case '%':
                computedResult = previousValue % currentValue  
                break
            default:
                return                     
        }
        this.currentOperand = computedResult
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)

        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach( button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        calculator.activateBtn(button)
    })
})

operationButtons.forEach( button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        calculator.activateBtn(button)
    })
})

equalsButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
    calculator.activateBtn(button.target)
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
    calculator.activateBtn(button.target)

})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
    calculator.activateBtn(button.target)
})

window.addEventListener('keydown', (e)=>{
   let keyValue = e.key

   if((keyValue > -1 && keyValue < 10) || keyValue === '.'){;
        console.log(e)
        calculator.appendNumber(keyValue)
        calculator.updateDisplay()
        calculator.analyzeBtnClick(keyValue)
   }
   else if(keyValue === 'Enter' || keyValue === '='){
        calculator.compute()
        calculator.updateDisplay()
        calculator.analyzeBtnClick('=')
    }
   else if(keyValue === 'Backspace' || keyValue === 'Delete'){
        calculator.delete()
        calculator.updateDisplay()
        calculator.analyzeBtnClick('DEL')
    }
   else if(keyValue === 'c' || keyValue === 'C'){
        calculator.clear()
        calculator.updateDisplay()
        calculator.analyzeBtnClick('AC')
   }
   else if(keyValue === '+' ||
           keyValue === '-' || 
           keyValue === '*' ||
           keyValue === '%' || 
           keyValue === '/'){
        calculator.chooseOperation(keyValue)
        calculator.updateDisplay() 
        if(keyValue === '*'){keyValue = 'x'}
        if(keyValue === '/'){keyValue = '÷'}
        calculator.analyzeBtnClick(keyValue)
   }
   else{
    return
   }
})

