document.addEventListener("keydown", function (event) {

    var output = document.getElementById("output");
    document.querySelector('p').innerHTML = "The key pressed is "
    output.textContent = "Keycode: " + event.keyCode + " | Key value: " + event.key;
});
