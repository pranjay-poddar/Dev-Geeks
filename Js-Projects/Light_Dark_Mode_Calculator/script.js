function clearScreen() {
    document.getElementById("result").value = "";
  }
  function liveScreen(value) {
    document.getElementById("result").value += value;
  }

  function switchTheme() {
    let darkMode = document.getElementById("dark-mode");
    let theme = document.getElementById("theme");
    if (theme.getAttribute("href") == "light.css") {
      theme.href = "dark.css";
      darkMode.innerHTML = "Light Mode 🌙";
    } else {
      theme.href = "light.css";
      darkMode.innerHTML = "Dark Mode 🌙";
    }
  }