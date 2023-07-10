// Selecting elements
let navbar = document.querySelector('.navbar');
let cart = document.querySelector('.box-container');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-items-container');
let btnvar1 = document.getElementById('btnh1');
let btnvar2 = document.getElementById('btnh2');
let btnvar3 = document.getElementById('btnh3');
let itemsAdded = [];
// Menu button click event
document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

// Search button click event
document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
};

// Cart button click event
document.querySelector('#cart-btn').onclick = () => {
  cartItem.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

// Window scroll event
window.onscroll = () => {
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

// Toggle1 function
function Toggle1() {
  if (btnvar1.style.color == "white") {
    btnvar1.style.color = "red";
  } else {
    btnvar1.style.color = "white";
  }
}

// Toggle2 function
function Toggle2() {
  if (btnvar2.style.color == "white") {
    btnvar2.style.color = "red";
  } else {
    btnvar2.style.color = "white";
  }
}

// Toggle3 function
function Toggle3() {
  if (btnvar3.style.color == "white") {
    btnvar3.style.color = "red";
  } else {
    btnvar3.style.color = "white";
  }
}

// Form submission alert
function dosomething() {
  alert("Form has been submitted");
}

// Start function
function start() {
  addEvents();
}

// Update function
function update() {
  addEvents();
  updateCartTotal();
}

// Add event listeners
function addEvents() {
  let cartRemove_btns = document.querySelectorAll(".fa-trash");
  cartRemove_btns.forEach(btn => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
  cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach(btn => {
    btn.addEventListener("click", handle_addCartItem);
  });
}

// Handle adding a cart item
function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".Title").innerHTML;
  let price = product.querySelector(".price").innerHTML;
  let imgSrc = product.querySelector(".image").src;
  console.log(product);
  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  if (itemsAdded.find(el => el.title == newToAdd.title)) {
    alert("This Item Already Exists!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".box");
  cartContent.appendChild(newNode);

  update();
}

// Handle removing a cart item
function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(el =>
    el.title != this.parentElement.querySelector('.cart-product-title').innerHTML
  );
  update();
}

// Handle changing item quantity
function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);
  update();
}

// Handle buying an order
function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There are no items to place an order yet!");
    return;
  }

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = '';
  alert("Your order has been placed successfully!");
  itemsAdded = [];
  update();
}

// Update total price




function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}

function addToCart(elem) {
  //init
  var sibs = [];





  var getprice;
  var getproductName;
  var cart = [];
   var stringCart;
  //cycles siblings for product info near the add button
  while(elem  = elem.previousSibling) {
      if (elem.nodeType === 3) continue; // text node
      if(elem.className == "price"){
          getprice = elem.innerText;
      }
      if (elem.className == "Title") {
          getproductName = elem.innerText;
      }
      sibs.push(elem);
  }
  //create product object
  var product = {
      productname : getproductName,
      price : getprice
  };
  //convert product data to JSON for storage
  var stringProduct = JSON.stringify(product);
  /*send product data to session storage */
  
  if(!sessionStorage.getItem('cart')){
      //append product JSON object to cart array
      cart.push(stringProduct);
      //cart to JSON
      stringCart = JSON.stringify(cart);
      //create session storage cart item
      sessionStorage.setItem('cart', stringCart);
      addedToCart(getproductName);
      updateCartTotal();
  }
  else {
      //get existing cart data from storage and convert back into array
     cart = JSON.parse(sessionStorage.getItem('cart'));
      //append new product JSON object
      cart.push(stringProduct);
      //cart back to JSON
      stringCart = JSON.stringify(cart);
      //overwrite cart data in sessionstorage 
      sessionStorage.setItem('cart', stringCart);
      addedToCart(getproductName);
      updateCartTotal();
  }
}

/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('btn');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}


// Cart box component template
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-item">
      <img src=${imgSrc} alt="item-1" class="image" />
      <div class="content">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="fa-solid fa-trash"></i>
    </div>
  `;
}

// Initialize when DOM is loaded
if (document.readyState == "loading") {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}




// my code 


/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* ADD TO CART functions */

function addToCart(elem) {
    //init
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    //cycles siblings for product info near the add button
    while(elem  = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    var product = {
        productname : getproductName,
        price : getprice
    };
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */
    
    if(!sessionStorage.getItem('cart')){
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculate Cart Total */
function updateCartTotal(){
    //init
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++){
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            //get property value of price
            price = parseFloat(x.price.split('₹')[1]);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>₹" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* User Manually empty cart */
function emptyCart() {
    //remove cart session storage object & refresh cart totals
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      //clear message and remove class style
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}