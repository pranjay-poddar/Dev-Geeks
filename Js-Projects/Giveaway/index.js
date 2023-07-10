const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// THIS WAS JUST TO TELL YOU THE APPROA
// let tempDate = new Date();
// let tempYear = tempDate.getFullYear();
// let tempMonth = tempDate.getMonth();
// let tempDay = tempDate.getDate();
// // months are ZERO index based;
// const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

let futureDate = new Date(2023, 7, 24, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();
function getRemaindingTime() {
  const today = new Date().getTime();

  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr

  // here we are calculating values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = t / oneDay;
  // to get integer value
  days = Math.floor(days);
  // we are doing this because we want ki hume din ke hisaab se time mile , means agr 489 hours rehte hai to 
  // vo 49 hours na dikhae din ke hisaab se dikhae, means jaise hi ek din khtm hoye fr jitne hourse bache 
  // vo aaye .means ye time aise khtm hoga ki , 2 din baad 1 hour rehta dikhae., aur 24 24 hr ke hisaab se chale
  // din ke hisaab se.
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];
  // this is just to add zero before a number
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}
// countdown;
let countdown = setInterval(getRemaindingTime, 1000);

// The reason why getRemaindingTime() is called at the end, even though it is already called in 
// setInterval, is to ensure that the initial values are set immediately when the page loads.
// When the page is first loaded, getRemaindingTime() is called once outside of the setInterval 
// function to set the initial values of the countdown timer. This ensures that the countdown 
// timer is displayed correctly from the start, without any delay.
// After the initial call, the setInterval function is used to call getRemaindingTime() 
// every 1000 milliseconds (1 second) to update the countdown timer in real-time. This 
// continuous calling of getRemaindingTime() inside setInterval ensures that the countdown 
// timer is regularly updated with the latest remaining time.
// So, by calling getRemaindingTime() at the end of the code, the initial values are 
// set right away, and then the setInterval function takes over to update the countdown timer every second.
getRemaindingTime();