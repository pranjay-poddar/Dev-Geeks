// Initialising variables
let percentage = document.querySelector(".percentage");
let percent = document.querySelector(".percent");

// Update status after every 2 seconds
setInterval(batteryStatus, 2000);

// Function calculate status of the battery
function batteryStatus() {
	navigator.getBattery().then(function (battery) {
		percentage.style.width = battery.level * 100 + "%";
		percent.innerHTML = Math.floor(battery.level * 100) + "%";
	});
}
batteryStatus();

// Toggle button functioning
let sec = document.querySelector(".sec");
let toggle = document.querySelector(".toggle");
toggle.addEventListener("click", function () {
	sec.classList.toggle("dark");
});

