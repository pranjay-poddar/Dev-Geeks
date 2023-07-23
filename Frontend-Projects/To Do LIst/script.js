/* Add a todo/ */

// creating a empty array
let demoarray = [];

// function for rendering the todo items
function renderTodo(todo) {
  localStorage.setItem("demoarray", JSON.stringify(demoarray));

  // select unorder list using class
  const list = document.querySelector(".todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    return;
  }

  // check if checked is true add done class effect otherwise as it is
  const isChecked = todo.checked ? "done" : "";
  // create a new list
  const newlist = document.createElement("li");
  // set attribute to new list
  newlist.setAttribute("class", `todo-item ${isChecked}`);
  newlist.setAttribute("data-key", todo.id);
  newlist.innerHTML = `
<input id="${todo.id}"  type="checkbox"/>
<label for "${todo.id}"  class="tick js-tick"></label>
<span>${todo.x}</span>
<button class="delete-todo js-delete-todo">
    <button class="delete-todo js-delete-todo">
        <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
    </button>
`;

  if (item) {
    list.replaceChild(newlist, item);
  } else {
    list.append(newlist);
  }

  /* // disabled this after fixing a selection bug
                list.append(newlist); */
}

// function for adding a todo
function myFunction(x) {
  // creating a object
  const todoobject = {
    x,
    checked: false,
    id: Date.now(),
  };

  // push new todo into a demoarray object
  demoarray.push(todoobject);

  renderTodo(todoobject);
  console.log(demoarray);

  /* disabled this because updated it show in list  */
  /* // print demoarray in console
                console.log(demoarray); */
}

function toggleDone(b) {
  const index = demoarray.findIndex((myitem) => myitem.id === Number(b));
  demoarray[index].checked = !demoarray[index].checked;
  renderTodo(demoarray[index]);
}

function deleteTodo(c) {
  const index = demoarray.findIndex((myitem) => myitem.id === Number(c));
  const emptytodo = {
    deleted: true,
    ...demoarray[index],
  };
  demoarray = demoarray.filter((myitem) => myitem.id !== Number(c));
  renderTodo(emptytodo);
}

// select form
const form = document.querySelector(".formselect");

// add a event listner submit on form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // select input
  const input = document.querySelector(".inputselect");

  // remove whitespace of input vlaue using trim method
  const text = input.value.trim();

  // statement condition for printing a input value
  if (text !== "") {
    // call a function for adding a new todo value
    myFunction(text);
    // after submit input value will be become blank ""
    input.value = "";
  }
});

// select entire list
const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("demoarray");
  if (ref) {
    demoarray = JSON.parse(ref);
    demoarray.forEach((t) => {
      renderTodo(t);
    });
  }
});

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
