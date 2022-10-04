const clock = document.querySelector(".clock");
const place = document.querySelector("#place");
const date = document.querySelector("#date");
const format_12 = document.querySelector(".format-12");
const format_24 = document.querySelector(".format-24");

const zone = "Asia/Kolkata";

place.textContent = zone;

function getTime(zone) {
  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format();
  const data = new Intl.DateTimeFormat("en-IN", {
    timeZone: zone,
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format();
  const [day, month, year] = data.split("/");
  const [hr, min, sec] = time.replaceAll(" ", ":").split(":");
  let hours_24 = hr; // Varaible for converting into 24 hr format
  if (format_12.classList.contains("active")) {
    clock.textContent =
      `${hours_24 - 12}:${min}:${sec}` +
      " " +
      `${hours_24 >= 12 ? "PM" : "AM"}`;
  } else {
    clock.textContent =
      `${hours_24}:${min}:${sec}` + "     " + `${hours_24 >= 12 ? "PM" : "AM"}`;
  }
  date.textContent = `${day}-${month}-${year}`;
}

format_12.addEventListener("click", function () {
  format_12.classList.add("active");
  format_24.classList.remove("active");
});
format_24.addEventListener("click", function () {
  format_12.classList.remove("active");
  format_24.classList.add("active");
});

setInterval(getTime, 0, zone);
// getTime("Asia/Kolkata");
