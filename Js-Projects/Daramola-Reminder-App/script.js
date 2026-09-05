function addTask() {
    const input = document.getElementById("input");
    const taskText = input.value;
    if (taskText === "") return;

    const ul = document.getElementById("task-list");
    const li = document.createElement("li");
    li.textContent = taskText;
    ul.appendChild(li);
    input.value = "";
}
