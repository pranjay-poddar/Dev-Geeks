// Initialising variables
const allzone = document.getElementById('allzone');
const currentTime = document.getElementById('currentTime');

// Setting the current time of India as initial string
currentTime.innerText = new Date().toLocaleString('en-us', { timeStyle: 'full' });

// Fetching data from the json file
fetch('timezone.json')
    .then(res => res.json())
    .then(data => {
        data.map(e => {
            const option = document.createElement('option');
            option.innerText = e.timezone;
            allzone.appendChild(option);
        })
    })
    .catch(err => console.log(err));

// Calling time after 1 second of interval
allzone.oninput = () => setInterval(() => time(), 1000);

// Function which sets the current time of the clock
function time() {
    const ctime = new Date().toLocaleString('en-us', { timeZone: allzone.value, timeStyle: 'full' });
    currentTime.innerText = ctime;
}