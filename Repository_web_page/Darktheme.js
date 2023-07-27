document.addEventListener("DOMContentLoaded", function () {
    const toggleCheckbox = document.getElementById("toggleCheckbox");

    // Check the user's preference for theme (light or dark) from local storage
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === "dark-theme") {
            toggleCheckbox.checked = true;
        }
    }

    // Listen for the toggle button click and switch themes
    toggleCheckbox.addEventListener("change", function () {
        if (toggleCheckbox.checked) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light-theme");
        }
    });
});
