const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')
const timezoneSelect = document.getElementById('timezone-select');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

timezoneSelect.addEventListener('change', () => {
    setTime();
  });
  
  function setTime() {
    const selectedTimezone = timezoneSelect.value;
    const time = new Date().toLocaleString('en-US', { timeZone: selectedTimezone });
    const convertedTime = new Date(time);
  
    const month = convertedTime.getMonth();
    const day = convertedTime.getDay();
    const date = convertedTime.getDate();
    const hours = convertedTime.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = convertedTime.getMinutes();
    const seconds = convertedTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;
  
    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
  }

  function loadTimezones() {
    return new Promise((resolve, reject) => {
      fetch('timezones.json')
        .then(res => res.json())
        .then(data => {
          data.map(e => {
            const option = document.createElement('option');
            option.innerText = e.timezone;
            timezoneSelect.appendChild(option);
          });
          resolve();
        })
        .catch(err => reject(err));
    });
  }
  
  loadTimezones()
    .then(() => {
      setTime();
      setInterval(setTime, 1000);
    })
    .catch(err => console.log(err));
  
  
  

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime()
loadTimezones();
setInterval(setTime, 1000)
