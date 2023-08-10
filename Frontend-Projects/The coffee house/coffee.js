let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
};

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () => {
  cartItem.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

window.onscroll = () => {
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};


var btnvar1 = document.getElementById('btnh1');

function Toggle1() {
  if (btnvar1.style.color == "white") {
    btnvar1.style.color = "red"
  }
  else {
    btnvar1.style.color = "white"
  }
}
var btnvar2 = document.getElementById('btnh2');

function Toggle2() {
  if (btnvar2.style.color == "white") {
    btnvar2.style.color = "red"
  }
  else {
    btnvar2.style.color = "white"
  }
}
var btnvar3 = document.getElementById('btnh3');

function Toggle3() {
  if (btnvar3.style.color == "white") {
    btnvar3.style.color = "red"
  }
  else {
    btnvar3.style.color = "white"
  }
}
function dosomething() {
  alert("Form has been submitted");
}


if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
function start() {
    addEvents();
}
function update() {
    addEvents();
    updateTotal();
}
function addEvents() {
    let cartRemove_btns = document.querySelectorAll(".fa-trash");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
    });

let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
    });

    let addCart_btns =document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("change",handle_addCartItem)
    });
}

function handle_addCartItem(){
    let product = this.parentElement;
    let title =product.querySelector(".Title").innerHTML;
    let price =product.querySelector(".price").innerHTML;
    let imgSrc =product.querySelector(".image").src;
    console.log(title, price , imgSrc);

    let newToAdd={
        title,
        price,
        imgSrc,
    };
    if(itemsAdded.find((el) => el.title == newToAdd.title)){
        alert("This Item Is Already Existing!");
        return;
    }
    else{
        itemsAdded.push(newToAdd);
    }

    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}
function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el)=>
        el.title != 
        this.parentElement.querySelector('.cart-product-title').innerHTML)
        update();
}
function handle_changeItemQuantity() {
if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
}
this.value = Math.floor(this.value);
    update();
}
function handle_buyOrder(){
    if (itemsAdded.length <=0){
        alert("There is No Order to Place Yet!! \n Please Make an order first. " );
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML='';
    alert("Your Order is Placed successfully:)");
    itemsAdded=[];
    update();
}
function updateTotal() {
    let cartItems = document.querySelectorAll(".cart-item");
    const totalElement = cart - items - container.querySelector(".total-price");
    let total = 0;
    cartItems.forEach(function (cartItem) {
    let priceElement = cartItem.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("₹", ""));
    let quantity = cartItem.querySelector(".cart-quantity").value;
    total += price * quantity;
    });
    total =total.toFixed(2);

    // total = Math.round(total*100)/100;
    totalElement.innerHTML = "₹" + total;
}
function CartBoxComponent(title, price, imgSrc){
    return `
    div class="cart-item">
                    <img src=${imgSrc} alt="item-1" class="image" />
                    <div class="content">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">

                    </div>
                    <i class="fa-solid fa-trash"></i>
                </div>`;
}