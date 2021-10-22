let inputBoxValue = document.querySelector('#inputField');
let addToButton = document.querySelector('.addbtn');
let clearButton = document.querySelector('.clearbtn');
let delButton = document.querySelector('.fas');
let taskList = document.querySelector('.task-list');

inputBoxValue.onkeyup = () => {
  let userData = inputBoxValue.value;
  if (userData.trim() != 0) {
    addToButton.classList.add('activate');
  } else addToButton.classList.remove('activate');
};

tasksDisplay();

addToButton.onclick = () => {
  let userData = inputBoxValue.value;
  let getLocalStorage = localStorage.getItem('New Task');
  if (getLocalStorage == null) taskArr = [];
  else {
    taskArr = JSON.parse(getLocalStorage);
  }
  taskArr.push(userData);
  localStorage.setItem('New Task', JSON.stringify(taskArr));

  tasksDisplay();
  addToButton.classList.remove('activate');
};

function tasksDisplay() {
  let getLocalStorage = localStorage.getItem('New Task');
  if (getLocalStorage == null) taskArr = [];
  else {
    taskArr = JSON.parse(getLocalStorage);
  }

  if (taskArr.length > 0) {
    clearButton.classList.add('active');
  } else {
    clearButton.classList.remove('active');
  }

  let newListTag = '';
  taskArr.forEach((element, index) => {
    newListTag += `<li style="height: auto;"> <div class="to-do-block">${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash-alt"></i></span></div></li>`;
  });

  taskList.innerHTML = newListTag;
  inputBoxValue.value = '';
}

function deleteTask(index) {
  let getLocalStorage = localStorage.getItem('New Task');
  taskArr = JSON.parse(getLocalStorage);
  taskArr.splice(index, 1);

  localStorage.setItem('New Task', JSON.stringify(taskArr));
  tasksDisplay();
}

clearButton.onclick = () => {
  taskArr = [];
  localStorage.setItem('New Task', JSON.stringify(taskArr));
  tasksDisplay();
};
