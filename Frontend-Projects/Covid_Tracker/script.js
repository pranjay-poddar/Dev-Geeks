// Intialising global variables
const input = document.querySelector('input');
const button = document.querySelector('button');

// Function fetch the data from the server about covid-19
function covidTracker() {
    fetch(`https://corona.lmao.ninja/v2/countries/${input.value}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById("country").innerHTML = data.country;
            document.getElementById("active").innerHTML = data.active.toLocaleString();
            document.getElementById("cases").innerHTML = data.cases.toLocaleString();
            document.getElementById("critical").innerHTML = data.critical.toLocaleString();
            document.getElementById("death").innerHTML = data.deaths.toLocaleString();
            document.getElementById("recovered").innerHTML = data.recovered.toLocaleString();
            document.getElementById("tests").innerHTML = data.tests.toLocaleString();
            document.getElementById("flag").src = data.countryInfo.flag;
        });
}
covidTracker();

// Submit button functionality
button.addEventListener('click', ()=> {
    if(input.value === '') return;
    covidTracker();
});

// Enter Button functionality
document.addEventListener('keyup', (event)=> {
    if(event.key === 'Enter') {
        if(input.value === '') return;
        covidTracker();
    }
});
