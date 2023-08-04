const number = document.getElementById("number");
const currency = document.getElementById("currency");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

// const API_KEY = "";
// const API_URL = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${currency}&want=`;

btn.addEventListener("click",()=>{
    const amount = number.value;
    const currencyValue = currency.value;
    const url = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=USD&want=${currencyValue}&amount=${amount}`;
    // const url = API_URL + currencyValue;

    fetch(url,{
        method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5fdd29336dmsh7aeec9f200302d7p1059e9jsn561dfefa6b6c',
		'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
	}
    })
    .then((response => response.json()))
    .then((data)=>{
        console.log(data)
        const rate = data.new_amount;
        const prevCurrency = data.old_currency;
        // const price = amount * rate;
        result.innerHTML = `$${amount} ${prevCurrency} = ${rate} ${currencyValue}`;
    })
    .catch(error=>{
        console.error(`Request Failed:`,error);
        result.innerHTML = "Sorry You Can't Convert it!"
    })
})
