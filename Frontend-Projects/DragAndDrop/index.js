let draggedItem = null;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    draggedItem = event.target;
}

function drop(event) {
    event.preventDefault();
    var container = document.getElementById("container2");
    container.appendChild(draggedItem);
    draggedItem = null;
    document.getElementById("successMessage").textContent = "Item dropped successfully!";
}

function reset() {
    var container1 = document.getElementById("container1");
    var container2 = document.getElementById("container2");
    var items = container2.getElementsByClassName("item");
    while (items.length > 0) {
        container1.appendChild(items[0]);
    }
    document.getElementById("successMessage").textContent = "";
}