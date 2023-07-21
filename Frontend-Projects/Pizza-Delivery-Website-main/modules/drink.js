// Карточки напитков. Блоки товаров
// Drink cards. Product blocks
const menuDrink = [
    {
        vendorCode: 'drk0000',
        name: 'Cola',
        price: '₹59/-',
        img: `<img src='img/drinks/drink1.png' class='img-drink'>`,
        imgBasket: `<img src='img/drinks/drink1.png' class='basket-img-narrow'>`,
        btns: `<div>
                    <button class='btn-add' data-id='drk0000'>Add</button>
                    <button class='btn-info-drink' data-id='drk0000'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-drink'> 
                    <ul class='filling-list-drink'>
                        <li>Just Cola 330ml :)</li>
                    </ul>
                    <button class='close-filling close-drink-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'drk0001',
        name: 'Sprite',
        price: '₹79/-',
        img: `<img src='img/drinks/drink2.png' class='img-drink'>`,
        imgBasket: `<img src='img/drinks/drink2.png' class='basket-img-narrow'>`,
        btns: `<div>
                    <button class='btn-add' data-id='drk0001'>Add</button>
                    <button class='btn-info-drink' data-id='drk0001'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-drink'> 
                    <ul class='filling-list-drink'>
                        <li>Just Sprite 330ml :)</li>
                    </ul>
                    <button class='close-filling close-drink-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'drk0002',
        name: 'Coffe',
        price: '₹45/-',
        img: `<img src='img/drinks/drink3.png' class='img-drink'>`,
        imgBasket: `<img src='img/drinks/drink3.png' class='basket-img-coffe'>`,
        btns: `<div>
                    <button class='btn-add' data-id='drk0002'>Add</button>
                    <button class='btn-info-drink' data-id='drk0002'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-drink'> 
                    <ul class='filling-list-drink'>
                        <li>Signature latte</li>
                        <li>Milk</li>
                        <li>Watter</li>
                        <li>Espresso</li>
                        <li>Mystery Ingredient</li>
                    </ul>
                    <button class='close-filling close-drink-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'drk0003',
        name: 'Black Tea',
        price: '₹60/-',
        img: `<img src='img/drinks/drink4.png' class='img-drink'>`,
        imgBasket: `<img src='img/drinks/drink4.png' class='basket-img-flattened'>`,
        btns: `<div>
                    <button class='btn-add' data-id='drk0003'>Add</button>
                    <button class='btn-info-drink' data-id='drk0003'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-drink'> 
                    <ul class='filling-list-drink'>
                        <li>Black Tea</li>
                    </ul>
                    <button class='close-filling close-drink-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'drk0004',
        name: 'Blueberry Tea',
        price: '₹95/-',
        img: `<img src='img/drinks/drink5.png' class='img-drink'>`,
        imgBasket: `<img src='img/drinks/drink5.png' class='basket-img-flattened'>`,
        btns: `<div>
                    <button class='btn-add' data-id='drk0004'>Add</button>
                    <button class='btn-info-drink' data-id='drk0004'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-drink'> 
                    <ul class='filling-list-drink'>
                        <li>20 gram Blueberries</li>
                        <li>20 gram Strawberries</li>
                        <li>40 gram Honey</li>
                        <li>400 ml. Water</li>
                    </ul>
                    <button class='close-filling close-drink-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'drk0005',
        name: 'Raspberry Tea',
        price: '₹108/-',
        img: `<img src='img/drinks/drink6.png' class='img-drink'>`,
        imgBasket: `<img src='img/drinks/drink6.png' class='basket-img-flattened'>`,
        btns: `<div>
                    <button class='btn-add' data-id='drk0005'>Add</button>
                    <button class='btn-info-drink' data-id='drk0005'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-drink'> 
                    <ul class='filling-list-drink'>
                        <li>20 gram Raspberries</li>
                        <li>10 gram Blackberries</li>
                        <li>20 gram Strawberries</li>
                        <li>40 gram Honey</li>
                        <li>400 ml. Water</li>
                    </ul>
                    <button class='close-filling close-drink-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    }
];


export default menuDrink;