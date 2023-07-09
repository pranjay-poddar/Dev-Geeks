const menuBurger = [
    {
        vendorCode: 'brg0000',
        name: 'Burger',
        price: '₹45/-',
        img: `<img src='img/burgers/Burger1.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger1.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0000'>Add</button>
                    <button class='btn-info-burger' data-id='brg0000'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                        <li>Bun</li>
                        <li>Pork</li>
                        <li>Cheese</li>
                        <li>Lettuce</li>
                        <li>Tomato</li>
                        <li>Pickled cucumber</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0001',
        name: 'Double-cheese',
        price: '₹89/-',
        img: `<img src='img/burgers/Burger2.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger2.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0001'>Add</button>
                    <button class='btn-info-burger' data-id='brg0001'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                        <li>Bun</li>
                        <li>2x Beef</li>
                        <li>2x Cheese</li>
                        <li>Lettuce</li>
                        <li>Tomato</li>
                        <li>Pickled cucumber</li>
                        <li>Pickled onion</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0002',
        name: 'Egg-Burger',
        price: '₹125/-',
        img: `<img src='img/burgers/Burger3.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger3.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0002'>Add</button>
                    <button class='btn-info-burger' data-id='brg0002'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                        <li>Bun</li>
                        <li>Egg</li>
                        <li>Cheese</li>
                        <li>2x Beef</li>
                        <li>Tomato</li>
                        <li>Ketchup</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0003',
        name: 'Ham-Burger',
        price: '₹65/-',
        img: `<img src='img/burgers/Burger4.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger4.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0003'>Add</button>
                    <button class='btn-info-burger' data-id='brg0003'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                        <li>Bun</li>
                        <li>Beef</li>
                        <li>Cheese</li>
                        <li>Lettuce</li>
                        <li>Tomato</li>
                        <li>Pickled cucumber</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0004',
        name: 'Classic-Burger',
        price: '₹109/-',
        img: `<img src='img/burgers/Burger5.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger5.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0004'>Add</button>
                    <button class='btn-info-burger' data-id='brg0004'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                        <li>Golden Bun</li>
                        <li>Beef</li>
                        <li>French fries</li>
                        <li>Iceberg lettuce</li>
                        <li>Tomato</li>
                        <li>Pickled cucumber</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0005',
        name: 'Whopper',
        price: '₹149/-',
        img: `<img src='img/burgers/Burger6.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger6.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0005'>Add</button>
                    <button class='btn-info-burger' data-id='brg0005'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                       <li>Bun</li>
                        <li>2x Beef</li>
                        <li>2x Cheese</li>
                        <li>Lettuce</li>
                        <li>Pickled onion</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0006',
        name: 'Cheese-Burger',
        price: '₹75/-',
        img: `<img src='img/burgers/Burger7.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger7.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0006'>Add</button>
                    <button class='btn-info-burger' data-id='brg0006'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                        <li>Bun</li>
                        <li>Beef</li>
                        <li>Cheese</li>
                        <li>Lettuce</li>
                        <li>Tomato</li>
                        <li>Pickled cucumber</li>
                        <li>Pickled onion</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0007',
        name: 'Ulitmate-Burger',
        price: '₹189/-',
        img: `<img src='img/burgers/Burger8.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger8.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0007'>Add</button>
                    <button class='btn-info-burger' data-id='brg0007'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                       <li>Black Bun</li>
                        <li>Beef</li>
                        <li>Cheese</li>
                        <li>Lettuce</li>
                        <li>Tomato</li>
                        <li>Cucumber</li>
                        <li>Onion</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    },
    {
        vendorCode: 'brg0008',
        name: 'Sausage-Burger',
        price: '₹220/-',
        img: `<img src='img/burgers/Burger9.png' class='img-burger'>`,
        imgBasket: `<img src='img/burgers/Burger9.png' class='basket-img'>`,
        btns: `<div>
                    <button class='btn-add' data-id='brg0008'>Add</button>
                    <button class='btn-info-burger' data-id='brg0008'>Filling</button>
                </div>`,
        filling: `<div class='box-filling-burger'> 
                    <ul class='filling-list-burger'>
                        <li>Bun</li>
                        <li>Salami</li>
                        <li>Sausages</li>
                        <li>2x Cheese</li>
                        <li>2x Lettuce</li>
                        <li>2x Tomato</li>
                        <li>Pickled cucumber</li>
                        <li>2x Onion</li>
                    </ul>
                    <button class='close-filling close-burger-list'>
                        <i class="fa-solid fa-xmark close-list"></i>
                    </button>
                </div>`
    }
];


export default menuBurger;