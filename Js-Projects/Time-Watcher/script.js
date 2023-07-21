// Declaring global variables

// Input variables
const dd = document.getElementById('day');
const mm = document.getElementById('month');
const yyyy = document.getElementById('year');
const hh = document.getElementById('hour');
const min = document.getElementById('minute');
const sec = document.getElementById('second');
const milli = document.getElementById('milli');

// Output variables
const years = document.getElementById('years');
const months = document.getElementById('months');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliSeconds = document.getElementById('milli-seconds');

function updateDateTime() {
    // Get the current date and time
    const currentDate = new Date();

    // Get the entered date and time
    const enteredDate = new Date(
        yyyy.value,
        mm.value - 1,
        dd.value,
        hh.value,
        min.value,
        sec.value,
        milli.value
    );

    // Check for valid input values
    if (
        dd.value < 1 || dd.value > 31 ||
        mm.value < 1 || mm.value > 12 ||
        hh.value < 0 || hh.value > 23 ||
        min.value < 0 || min.value > 59 ||
        sec.value < 0 || sec.value > 59 ||
        milli.value < 0 || milli.value > 999
    ) {
        // Display flashing warning for invalid input values
        document.body.style.backgroundColor = 'red'; // Flash red background
        return; // Stop further processing for invalid input values
    }
    document.body.style.backgroundColor = '';

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - enteredDate;

    // Convert milliseconds to years, months, days, hours, minutes, seconds, and milliseconds
    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30.436875; // Approximate value for an average month
    const msPerYear = msPerDay * 365.25; // Approximate value for an average year

    const elapsedYears = Math.floor(timeDifference / msPerYear);
    const elapsedMonths = Math.floor(timeDifference / msPerMonth) - 12 * elapsedYears;
    const elapsedDays = Math.floor((timeDifference % msPerMonth) / msPerDay);
    const elapsedHours = Math.floor((timeDifference % msPerDay) / msPerHour);
    const elapsedMinutes = Math.floor((timeDifference % msPerHour) / msPerMinute);
    const elapsedSeconds = Math.floor((timeDifference % msPerMinute) / msPerSecond);
    const elapsedMilliSeconds = timeDifference % msPerSecond;

    // Update the output elements
    years.textContent = elapsedYears;
    months.textContent = elapsedMonths;
    days.textContent = elapsedDays;
    hours.textContent = elapsedHours;
    minutes.textContent = elapsedMinutes;
    seconds.textContent = elapsedSeconds;
    milliSeconds.textContent = elapsedMilliSeconds;

    // Call the function every millisecond
    setTimeout(updateDateTime, 1);
}

function handleInputChange(event) {
    // Start updating the date and time
    updateDateTime();
}

const inputElements = document.querySelectorAll('input');
inputElements.forEach(function (inputElement) {
    inputElement.addEventListener('input', handleInputChange);
});
