function yes() {
    var a1 = Math.random() * 50;
    var b1 = Math.floor(a1);
    var a2 = Math.random() * 30;
    var b2 = Math.floor(a2);

    const yes = document.getElementById("yes");
    yes.style.margin = `${b1}vh 0vw 0vh ${b2}vw`;

    var content1 = document.getElementById("content1");
    content1.style.textAlign = "initial";
}

function no() {
    var ele = document.getElementById("container2");
    ele.style.display = "none"

    var ele2 = document.getElementById("afterans").style.display = "block"
}