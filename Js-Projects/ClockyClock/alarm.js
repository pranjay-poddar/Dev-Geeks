const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime;
let isAlarmSet = false;
ringtone = new Audio("clock-alarm-8761.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  hr = date.getHours();
  min = date.getMinutes();
  sec = date.getSeconds();
  ampm = "AM";
  if (hr >= 12) {
    hr = hr - 12;
    ampm = "PM";
  }
  hr = hr == 0 ? (hr = 12) : hr;
  hr = hr < 10 ? "0" + hr : hr;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.innerText = `${hr}:${min}:${sec}  ${ampm}`;
  if (alarmTime === `${hr}:${min} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("ClockyClock:Please enter a valid time for setting alarm");
  }
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Stop Alarm";
}
setAlarmBtn.addEventListener("click", setAlarm);
