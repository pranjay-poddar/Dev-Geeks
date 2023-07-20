//Set the target date (e.g., 1 January 2024 00:00:00)
const targetDate = new Date('2024-01-01T00:00:00').getTime();

// Update the countdown every 1 second
const timer = setInterval(updateCountdown, 1000);

function updateCountdown() {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the time remaining
  const timeRemaining = targetDate - now;

  // Calculate the days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Display the time remaining in the HTML elements
  document.getElementById('days').textContent = formatTime(days);
  document.getElementById('hours').textContent = formatTime(hours);
  document.getElementById('minutes').textContent = formatTime(minutes);
  document.getElementById('seconds').textContent = formatTime(seconds);

  // If the countdown is finished, clear the timer
  if (timeRemaining < 0) {
    clearInterval(timer);
  }
}

function formatTime(time) {
  // Add leading zeros if the time value is less than 10
  return time < 10 ? `0${time}` : time;
}
