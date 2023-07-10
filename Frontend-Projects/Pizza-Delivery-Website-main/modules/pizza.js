// Карточка пиццы, блоки товаров.
// Pizza card, product blocks.
const menuPizza = [
    {
        vendorCode: 'piz0000',
        name: 'Mushrooms-Pizza',
        price: '₹145/-',
        img: `<img src='img/pizzies/Mushrooms-Сheese-pizza.png' class='img-pizza'>`,
        imgBasket: `<img src='img/pizzies/Mushrooms-Сheese-pizza.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0000'>Add</button>
                    <button class='btn-info' data-id='piz0000'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Salami</li>
                        <li>Cheese</li>
                        <li>Mushrooms</li>
                        <li>Olives</li>
                        <li>Parsley</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0001',
        name: 'Omelette-Pizza',
        price: '₹180/-',
        img: `<img src='img/pizzies/Omelette-pizza.png' class='img-pizza'>`,
        imgBasket: `<img src='img/pizzies/Omelette-pizza.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0001'>Add</button>
                    <button class='btn-info' data-id='piz0001'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Olives</li>
                        <li>Mushrooms</li>
                        <li>Tomato</li>
                        <li>Ketchup</li>
                        <li>Eggs</li>
                        <li>Basil</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0002',
        name: 'Mexican-Pizza',
        price: '₹209/-',
        img: `<img src='img/pizzies/Roman-pizza.png' class='img-pizza'>`,
        imgBasket: `<img src='img/pizzies/Roman-pizza.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0002'>Add</button>
                    <button class='btn-info' data-id='piz0002'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Pepper</li>
                        <li>Cheese</li>
                        <li>Mushrooms</li>
                        <li>Olives</li>
                        <li>Basil</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0003',
        name: 'Tandoori-Pizza',
        price: '₹269/-',
        img: `<img src='img/pizzies/Royal-pizza.png' class='img-pizza'> `,
        imgBasket: `<img src='img/pizzies/Royal-pizza.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0003'>Add</button>
                    <button class='btn-info' data-id='piz0003'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Chili</li>
                        <li>Cheese</li>
                        <li>Mushrooms</li>
                        <li>Olives</li>
                        <li>Pepper</li>
                        <li>Tomato</li>
                        <li>Ketchup</li>
                        <li>Chicken</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0004',
        name: 'Farmhouse-Pizza',
        price: '₹279/-',
        img: `<img src='img/pizzies/Royal-two-pizza.png' class='img-pizza'>`,
        imgBasket: `<img src='img/pizzies/Royal-two-pizza.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0004'>Add</button>
                    <button class='btn-info' data-id='piz0004'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Tomato</li>
                        <li>Pepper</li>
                        <li>Mushrooms</li>
                        <li>Olives</li>
                        <li>Sour cream</li>
                        <li>Basil</li>
                        <li>Parsley</li>
                        <li>Mozzarella</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0005',
        name: 'Tomato-Pizza',
        price: '₹125/-',
        img: `<img src='img/pizzies/Tomato-pizza.png' class='img-pizza'>`,
        imgBasket: `<img src='img/pizzies/Tomato-pizza.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0005'>Add</button>
                    <button class='btn-info' data-id='piz0005'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Tomato</li>
                        <li>Basil</li>
                        <li>Ketchup</li>
                        <li>Olives</li>
                        <li>Mozzarella</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0006',
        name: 'Dragon-Pizza',
        price: '₹299/-' ,
        img: `<img src='img/pizzies/DRAGON.png' class='img-pizza'>`,
        imgBasket: `<img src='img/pizzies/DRAGON.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0006'>Add</button>
                    <button class='btn-info' data-id='piz0006'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Pepper Khotstar</li>
                        <li>Cheese</li>
                        <li>Olives</li>
                        <li>Salami</li>
                        <li>Mayonnaise</li>
                        <li>Onions</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0007',
        name: 'Veggie-pizza',
        price: '₹199/-',
        img: `<img src='img/pizzies/Easy-pizza.png' class='img-pizza'> `,
        imgBasket: `<img src='img/pizzies/Easy-pizza.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0007'>Add</button>
                    <button class='btn-info' data-id='piz0007'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Pepper</li>
                        <li>Cheese</li>
                        <li>Mushrooms</li>
                        <li>Olives</li>
                        <li>Tomato</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'piz0008',
        name: 'Marinara-Pizza',
        price: '₹309/-',
        img: `<img src='img/pizzies/Marinara.png' class='img-pizza'>`,
        imgBasket: `<img src='img/pizzies/Marinara.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='piz0008'>Add</button>
                    <button class='btn-info' data-id='piz0008'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-pizza'> 
                    <ul class='filling-list-pizza'>
                        <li>Krights</li>
                        <li>Squid</li>
                        <li>Olives</li>
                        <li>Cheese</li>
                    </ul>
                    <button class='close-filling close-pizza-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    }
];

export default menuPizza;
