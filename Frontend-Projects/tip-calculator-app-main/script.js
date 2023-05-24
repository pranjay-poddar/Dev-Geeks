let bill = document.getElementById('bill_input_input')
let people = document.getElementById('people_input')
let tip = 5;

let tipButtons = document.querySelectorAll('[data-tip-button]')

tipButtons.forEach(function (button) {
    button.addEventListener("click", () => {
        setTip(parseInt(button.innerHTML.toString().slice(0,-1)))
        tipButtons.forEach(function (button) {
            button.style.backgroundColor = "hsl(183, 100%, 15%)"
        })
        button.style.backgroundColor = "hsl(172, 67%, 45%)"
        // clicked_button = button
    });
})



function custominput() {
    let custom = document.getElementById('custom')
    custom.removeAttribute("disabled")
    // let tip_input = document.querySelector('[data-tip-custom]')
    custom.focus()
}


function setCustom() {
    let custom = document.getElementById('custom')
    custom.setAttribute('disabled', '')
    let tip_input = document.querySelector('[data-tip-custom]')
    tip_input.setAttribute('placeholder', "Custom")
}


function setTip(num) { 
    tip = num
    updateCounter()
}

function tipPerPerson() {
    let total_people = parseInt(people.value)
    let value_  = bill.value ? parseInt(bill.value) : 0
    let totalTip = (tip/100) * value_
    let tip_per_person = document.getElementById('tip_per_person')

    let tip_per_head = (totalTip / total_people) ? (totalTip / total_people) : 0.0
    tip_per_person.innerHTML = `$${parseFloat(tip_per_head).toPrecision(2)}`
}

function totalPerPerson() {
    let total_people = parseInt(people.value)
    let value_ = bill.value ? parseInt(bill.value) : 0
    let total = value_ + (value_ * (tip/100))
    let total_per_person = document.getElementById('total_per_person')

    total_per_person.innerHTML = `$${parseFloat(total).toPrecision(2)}`
}

function updateCounter() {
    tipPerPerson()
    totalPerPerson()
}

function doReset() {
    bill.value= ''
    bill.placeholder=0.0
    people.value=''
    people.placeholder = 0
    updateCounter()
}

updateCounter()



