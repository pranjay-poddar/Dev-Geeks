// dog food card js
// CARD 1
function inc1() {
    const qntElement = document.getElementById("product-quantity_1");
    const qnt = parseInt(qntElement.innerHTML);

    qntElement.innerHTML = qnt + 1;
}
function dec1() {
    const qntElement = document.getElementById("product-quantity_1");
    const qnt = parseInt(qntElement.innerHTML);
    if (qnt == 1) {
        alert('Minimun Quanity can be 1')
    }
    else {
        qntElement.innerHTML = qnt - 1;
    }
}

// CARD 2
function inc2() {
    const qntElement = document.getElementById("product-quantity_2");
    const qnt = parseInt(qntElement.innerHTML);

    qntElement.innerHTML = qnt + 1;
}
function dec2() {
    const qntElement = document.getElementById("product-quantity_2");
    const qnt = parseInt(qntElement.innerHTML);
    if (qnt == 1) {
        alert('Minimun Quanity can be 1')
    }
    else {
        qntElement.innerHTML = qnt - 1;
    }
}
// CARD 3
function inc3() {
    const qntElement = document.getElementById("product-quantity_3");
    const qnt = parseInt(qntElement.innerHTML);

    qntElement.innerHTML = qnt + 1;
}
function dec3() {
    const qntElement = document.getElementById("product-quantity_3");
    const qnt = parseInt(qntElement.innerHTML);
    if (qnt == 1) {
        alert('Minimun Quanity can be 1')
    }
    else {
        qntElement.innerHTML = qnt - 1;
    }
}
// CARD 4
function inc4() {
    const qntElement = document.getElementById("product-quantity_4");
    const qnt = parseInt(qntElement.innerHTML);

    qntElement.innerHTML = qnt + 1;
}
function dec4() {
    const qntElement = document.getElementById("product-quantity_4");
    const qnt = parseInt(qntElement.innerHTML);
    if (qnt == 1) {
        alert('Minimun Quanity can be 1')
    }
    else {
        qntElement.innerHTML = qnt - 1;
    }
}



