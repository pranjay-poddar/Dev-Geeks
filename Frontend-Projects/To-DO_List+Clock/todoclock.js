function rotateClockHands() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  var hourAngle = (360 / 12) * (hour % 12) + (30 / 60) * minute;
  var minuteAngle = (360 / 60) * minute;
  var secondAngle = (360 / 60) * second;

  var hourHand = document.querySelector('.hour-hand');
  var minuteHand = document.querySelector('.minute-hand');
  var secondHand = document.querySelector('.second-hand');

  hourHand.style.transform = 'rotate(' + hourAngle + 'deg)';
  minuteHand.style.transform = 'rotate(' + minuteAngle + 'deg)';
  secondHand.style.transform = 'rotate(' + secondAngle + 'deg)';
}


setInterval(rotateClockHands, 1000);

//to list
setInterval(rotateClockHands, 1000);
document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  function addTask() {
    const task = taskInput.value.trim();
    if (task !== '') {
      const li = document.createElement('li');
      li.textContent = task;
      li.addEventListener('click', toggleTask);
      li.addEventListener('dblclick', deleteTask);
      taskList.appendChild(li);
      taskInput.value = '';
    }
  }

  function toggleTask() {
    this.classList.toggle('strikethrough');
  }
          
  function deleteTask() {
    this.remove();
  }

  addTaskBtn.addEventListener('click', addTask);
});