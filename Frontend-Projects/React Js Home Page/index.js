let item = document.getElementsByClassName("item")

function enableNightMode() {
    let background = document.body.style.background
    if (background === "white") {
        document.body.style.transition = "all 0.2s ease"
        document.body.style.background = "#23272f"
        document.body.style.color = "white"
        setItemColor("white")
    } else {
        document.body.style.background = "white"
        document.body.style.color = "black" 
        setItemColor("black") 
    }
}

// change color of navbar items
function setItemColor(color) {
    for (let i=0;i<item.length;i++) {
        item[i].style.color = color
    }
}