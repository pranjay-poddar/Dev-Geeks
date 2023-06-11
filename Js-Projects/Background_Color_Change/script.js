const button = document.querySelector("button")
const body = document.querySelector("body")

const color = [ 'red' , 'blue' , 'green' , 'aqua' , 'magenta' , 'orange' , 'yellow' , 'purple']

//adding default initial bgcolor

body.style.backgroundColor = "Violet"

//now adding an event i.e, whenever I click/hover the button , color should change

button.addEventListener('click' , changeColor)

function changeColor() {
    const colorIndex = parseInt(Math.random()*color.length)
    body.style.backgroundColor = color[colorIndex]

}
