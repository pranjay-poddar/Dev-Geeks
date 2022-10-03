let serverEndpoint = "http://localhost:4000/";
// ui variables
const form = document.querySelector(".form");

const input = form.querySelector(".form__input");
const ul = document.querySelector(".toDoList");
//fetch and save array to todolist
let toDoListArray = [];

fetch(`${serverEndpoint}`)
  .then((res) => {
    return res.json();
  })
  .then((arr) => {
    toDoListArray = arr;
    updateDom();
  });

//update dom
const updateDom = () => {
  ul.innerHTML = "";
  for (let i = 0; i < toDoListArray.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("data-id", toDoListArray[i]._id);
    // add toDoItem text to li
    li.innerText = toDoListArray[i].text;
    // add li to the DOM
    ul.appendChild(li);
  }
};
updateDom();

// event listeners
form.addEventListener("submit", (e) => {
  // prevent default behaviour - Page reload
  e.preventDefault();
  let toDoItem = input.value;
  //add item to the database
  fetch(`${serverEndpoint}add/`, {
    method: "POST",
    body: new URLSearchParams({
      text: toDoItem,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((arr) => {
      toDoListArray = arr;
      updateDom();
    });
  //update todolist
  input.value = "";
});

ul.addEventListener("click", (e) => {
  let id = e.target.getAttribute("data-id");
  if (!id) return; // user clicked in something else

  fetch(`${serverEndpoint}delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((arr) => {
      toDoListArray = arr;
      updateDom();
    });
});
