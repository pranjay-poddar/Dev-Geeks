// object for storing a contacts in array for localstorage
let contacts = [];

/* console.log(contacts); */

function renderContact(contact) {
  /* set item to localStorage to store data */
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // selecting the list where we will appending a all node items
  const list = document.querySelector(".Contact_list");

  const item = document.querySelector(`[data-key='${contact.id}']`);

  if (contact.deleted) {
    // remove the item from the DOM
    item.remove();
    return;
  }

  // creating new element article
  const node = document.createElement("article");
  node.setAttribute("class", "person"); // setting attribute class:"person"
  node.setAttribute("data-key", contact.id);
  // adding a image name and dob in article element
  // we can access the contactObject items with contactObject.objectitem because we rendered a contactObject in renderContact function as a parameter
  node.innerHTML = `
<img src="${contact.imageurl}">
<div class="contactdetail">
<h1><i class="fas fa-user-circle contactIcon"></i> ${contact.name}</h1>
<p> <i class="fas fa-envelope contactIcon"></i> ${contact.email}</p>
<p><i class="fas fa-phone-alt contactIcon"></i> ${contact.contactnumber}  </p>
</div>
    <button class="delete-contact js-delete-contact">
        <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
    </button>
`;
  // appending a node in list
  list.append(node);
}

const list = document.querySelector(".Contact_list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-delete-contact")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteContact(itemKey);
  }
});

function deleteContact(key) {
  // find the corresponding contactObject in the contacts array
  const index = contacts.findIndex((item) => item.id === Number(key));
  // Create a new object with properties of the current contactobject item
  // and a `deleted` property which is set to true
  const UpdatedContactObject = {
    deleted: true,
    ...contacts[index],
  };
  // remove the contactobject item from the array by filtering it out
  contacts = contacts.filter((item) => item.id !== Number(key));
  renderContact(UpdatedContactObject);
}

// function for adding todo
function addContact(name, email, imageurl, contactnumber, id) {
  const contactObject = {
    name: document.getElementById("fullName").value,
    email: document.getElementById("myEmail").value,
    imageurl: document.getElementById("imgurl").value,
    contactnumber: document.getElementById("myTel").value,
    id: Date.now(),
  };

  // push a contactObject in todoItems array for store a data as a array in localstorage
  contacts.push(contactObject);
  /* console.log(todoItems); */
  // rendering contactObject in renderContact function as a prameter
  renderContact(contactObject);
}

// add a event listner submit to the form
const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // when the form is submitted addTodo function is called
  addContact();
  form.reset();
});

// adding a add event listner when content is loaded and showing stored data array on the screen
document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("contacts");
  if (ref) {
    contacts = JSON.parse(ref);
    contacts.forEach((t) => {
      renderContact(t);
    });
  }
});


