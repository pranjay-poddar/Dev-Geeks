// SCROLL TO TOP BUTTON
let calcScrollValue = () => {
    let scrollProg = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProg.style.display = "grid";
    } else {
      scrollProg.style.display = "none";
    }
    scrollProg.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProg.style.background = `conic-gradient(#5e5e5e ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };
  
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;

  // DARK MODE BUTTON
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check if the user has a preferred color scheme set
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply the initial theme based on user preference
if (prefersDarkMode) {
  body.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});
