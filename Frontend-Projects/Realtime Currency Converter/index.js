const currencyElement_one = document.getElementById('currency-one'); //selecting the first currency drop down
const currencyElement_two = document.getElementById('currency-two'); //selecting the second currency drop down
const amountElement_one = document.getElementById('amount-one');    //selecting the first input blank
const amountElement_two = document.getElementById('amount-two');    //selecting the second input blank

const rateElement = document.getElementById('rate');    //getting the rate stored in rateElement variable

// Adding the api link

function calculate(){
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)  //fetching the rates from the api
    .then(res => res.json())
    .then(data => {
        const rate = data.rates[currency_two];
        rateElement.innerText = `1 ${currency_one}  equals  ${rate} ${currency_two}`; //printing the unit rate
        amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    });
}

// Added event listener
// to automatically invoke the calculate function whenever new value is input
currencyElement_one.addEventListener('change', calculate); 
currencyElement_two.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
amountElement_two.addEventListener('input', calculate);


calculate();
