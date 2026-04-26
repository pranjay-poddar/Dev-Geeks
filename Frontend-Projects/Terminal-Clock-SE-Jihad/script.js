// Add leading zero to numbers
const padZero = (num) => num.toString().padStart(2, "0");

// Get current date and time
const getDateTimeData = () => {
  const now = new Date();

  let rawHours = now.getHours();
  const isPM = rawHours >= 12;
  const ampmStr = isPM ? "PM" : "AM";

  const hours = padZero(rawHours % 12 || 12);
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const formattedDate = now.toLocaleDateString("en-US", dateOptions);

  return {
    timeString: `${hours}:${minutes}:${seconds}`,
    ampm: ampmStr,
    dateString: formattedDate,
  };
};

// Update the DOM elements
const renderClock = () => {
  const timeEl = document.getElementById("sys-time");
  const dateEl = document.getElementById("sys-date");

  if (!timeEl || !dateEl) return;

  const data = getDateTimeData();
  timeEl.innerHTML = `${data.timeString} <span class="ampm">${data.ampm}</span>`;
  dateEl.textContent = `[*] Current System Date: ${data.dateString}`;
};

// Pro-level Typing Animation
const runBootSequence = () => {
  const cmdText = "./start_clock.sh";
  const cmdElement = document.getElementById("cmd-text");
  const cursor = document.getElementById("cmd-cursor");
  const clockContainer = document.getElementById("clock-container");
  const newPrompt = document.getElementById("new-prompt");

  let i = 0;

  // Typing effect logic
  const typingInterval = setInterval(() => {
    if (i < cmdText.length) {
      cmdElement.textContent += cmdText.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);

      // Wait a moment, then "execute" the command
      setTimeout(() => {
        cursor.style.display = "none"; // Hide upper cursor
        clockContainer.classList.remove("hidden");
        newPrompt.classList.remove("hidden");

        // Start the clock engine
        renderClock();
        setInterval(renderClock, 1000);
      }, 500);
    }
  }, 100); // Typing speed
};

// Start everything when DOM loads
document.addEventListener("DOMContentLoaded", runBootSequence);
