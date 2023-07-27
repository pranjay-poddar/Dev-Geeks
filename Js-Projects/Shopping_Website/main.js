
let carts = document.querySelectorAll('.cart');

let products = [
   {
      name : 'Funky Shirt Yellow',
      tag : 'f1',
      price : 650,
      inCart : 0
   },
   {
      name : 'Funky Shirt Cream',
      tag : 'f2',
      price : 650,
      inCart : 0
   },
   {
      name : 'Funky Shirt Grey',
      tag : 'f3',
      price : 650,
      inCart : 0
   },
   {
      name : 'Funky Shirt White',
      tag : 'f4',
      price : 650,
      inCart : 0
   },
   {
      name : 'Funky Shirt Purple',
      tag : 'f5',
      price : 650,
      inCart : 0
   },
   {
      name : 'Funky Shirt',
      tag : 'f6',
      price : 400,
      inCart : 0
   },
   {
      name : 'Funky Pant',
      tag : 'f7',
      price : 400,
      inCart : 0
   },
   {
      name : 'Ladies wear',
      tag : 'f8',
      price : 300,
      inCart : 0
   },
]

for(let i=0; i<carts.length; i++) {
   carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
   })
}

function onLoadCartNumbers() {
   let productNumbers = localStorage.getItem('cartNumbers');

   if(productNumbers) {
      document.querySelector('#cnt').textContent = productNumbers;
   }
}

function cartNumbers(product) {
   console.log("The product is : ", product);
   let productNumbers = localStorage.getItem('cartNumbers');
   productNumbers = parseInt(productNumbers);
   if(productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers+1);
      document.querySelector('#cnt').textContent = productNumbers + 1;
   }
   else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('#cnt').textContent = 1;
   }

   setItems(product);
}

function setItems(product) {

   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);

   if(cartItems != null) {

      if(cartItems[product.tag] == undefined) {
         cartItems = {
            ...cartItems,
            [product.tag] : product
         }
      }
      cartItems[product.tag].inCart += 1;
   }
   else {
      product.inCart = 1;
      cartItems = {
         [product.tag] : product
      }
   }

   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
   let cartCost = localStorage.getItem('totalCost');
   if(cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost",cartCost+product.price);
   }
   else {
      localStorage.setItem("totalCost",product.price); 
   }
}


function displayCart() {
   let cartItems = localStorage.getItem("productsInCart")
   cartItems = JSON.parse(cartItems);
   console.log(cartItems);
   let productContainer = document.querySelector(".products");
   let cartCost = localStorage.getItem('totalCost');
   if(cartItems && productContainer) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
         productContainer.innerHTML += `
         <div class="product">
            <button class="btn" onclick='deleteFromCart(${JSON.stringify(item)})'>Delete</button>
            <img src="./img/products/${item.tag}.jpg">
            <span>${item.name}</span>
            <div class="price">₹${item.price}/-</div>
            <div class="quantity">
               <ion-icon name="caret-back"></ion-icon>
               <span>${item.inCart}</span>
               <ion-icon name="caret-forward"></ion-icon>
            </div>
            <div class="total">
            ₹${item.inCart * item.price}/-
            </div>
         </div>
         `;
      });

      productContainer.innerHTML += `
         <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
               Cart Total
            </h4>
            <h4 class="basketTotal">
               ₹${cartCost}/-
            </h4>
         </div>
      `;
   }
}


function deleteFromCart(item) {
   let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
 
   delete cartItems[item.tag];
   localStorage.setItem('productsInCart', JSON.stringify(cartItems));

   let productNumbers = localStorage.getItem('cartNumbers');
   productNumbers = parseInt(productNumbers);
   if (productNumbers) {
     localStorage.setItem('cartNumbers', productNumbers - item.inCart);
     document.querySelector('#cnt').textContent = productNumbers - item.inCart;
   }
   let cartCost = localStorage.getItem('totalCost');
   if (cartCost != null) {
     cartCost = parseInt(cartCost);
     localStorage.setItem('totalCost', cartCost - (item.price * item.inCart));
   }
 
   displayCart();
}

onLoadCartNumbers();
displayCart();