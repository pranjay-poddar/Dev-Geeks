// Карточки снеков. Блоки товаров
// Snack cards. Product blocks
const menuSnack = [
    {
        vendorCode: 'snc0000',
        name: 'Panner Tikka',
        price: '₹99/-',
        img: `<img src='img/snacks/snack1.png' class='img-snack'>`,
        imgBasket: `<img src='img/snacks/snack1.png' class='basket-img-narrow'>`,
        btns: `<div>
                    <button class='btn-add' data-id='snc0000'>Add</button>
                    <button class='btn-info-snack' data-id='snc0000'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-snack'> 
                    <ul class='filling-list-snack'>
                        <li>Olives</li>
                        <li>Cheese</li>
                        <li>Salami</li>
                    </ul>
                    <button class='close-filling close-snack-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'snc0001',
        name: 'French fries',
        price: '₹59/-',
        img: `<img src='img/snacks/snack2.png' class='img-snack'>`,
        imgBasket: `<img src='img/snacks/snack2.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='snc0001'>Add</button>
                    <button class='btn-info-snack' data-id='snc0001'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-snack'> 
                    <ul class='filling-list-snack'>
                        <li>French fries 250 gram</li>
                    </ul>
                    <button class='close-filling close-snack-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'snc0002',
        name: 'Almonds',
        price: '₹159/-',
        img: `<img src='img/snacks/snack3.png' class='img-snack'>`,
        imgBasket: `<img src='img/snacks/snack3.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='snc0002'>Add</button>
                    <button class='btn-info-snack' data-id='snc0002'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-snack'> 
                    <ul class='filling-list-snack'>
                        <li>Almond 200 gram</li>
                    </ul>
                    <button class='close-filling close-snack-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'snc0003',
        name: 'Chips',
        price: '₹50/-',
        img: `<img src='img/snacks/snack4.png' class='img-snack'>`,
        imgBasket: `<img src='img/snacks/snack4.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='snc0003'>Add</button>
                    <button class='btn-info-snack' data-id='snc0003'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-snack'> 
                    <ul class='filling-list-snack'>
                        <li>Chips 200 gram</li>
                        <li>Signature sauce</li>
                    </ul>
                    <button class='close-filling close-snack-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'snc0004',
        name: 'Sandwich',
        price: '₹79/-',
        img: `<img src='img/snacks/snack5.png' class='img-snack'>`,
        imgBasket: `<img src='img/snacks/snack5.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='snc0004'>Add</button>
                    <button class='btn-info-snack' data-id='snc0004'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-snack'> 
                    <ul class='filling-list-snack'>
                        <li>Peanut paste</li>
                        <li>Cheese</li>
                        <li>Salami</li>
                        <li>Tomato</li>
                        <li>Cucumber</li>
                        <li>Lettuce</li>
                    </ul>
                    <button class='close-filling close-snack-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'snc0005',
        name: 'Nuggets',
        price: '₹85/-',
        img: `<img src='img/snacks/snack6.png' class='img-snack'>`,
        imgBasket: `<img src='img/snacks/snack6.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='snc0005'>Add</button>
                    <button class='btn-info-snack' data-id='snc0005'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-snack'> 
                    <ul class='filling-list-snack'>
                        <li>Nuggets 300 gram</li>
                        <li>Signautre souce</li>
                    </ul>
                    <button class='close-filling close-snack-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    }
];

export default menuSnack;