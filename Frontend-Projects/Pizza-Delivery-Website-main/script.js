// Import of blocks, product cards.
import menuPizza from './modules/pizza.js';
import menuBurger from './modules/burger.js';
import menuDrink from './modules/drink.js';
import menuSnack from './modules/snack.js';



function appPizzaShop() {
    // Selectors
    const popupButton = document.querySelector('.popup-button');
    const btnPizzaChoice = document.querySelector('.pizza');
    const btnBurgerChoice = document.querySelector('.burger');
    const btnSnackChoice = document.querySelector('.snack');
    const btnDrinkChoice = document.querySelector('.drink');
    const displayName = document.querySelector('.display-name');
    const displaySurname = document.querySelector('.display-surname');
    const logName = document.querySelector('.log-name');
    const logSurname = document.querySelector('.log-surname');
    const logOutButton = document.querySelector('.log-out-nav');
    const btnFilling = document.querySelector('.btn-info');
    const btnOpenLearnMore = document.querySelector('.prize-btn');
    const btnCloseLearnMore = document.querySelector('.close-prize');
    const btnOpenComent = document.querySelector('.coments-nav');
    const btnCloseComent = document.querySelector('.close-review');
    const btnBasketNav = document.querySelector('.basket-nav');
    const btnCloseMaximazeBasket = document.querySelector('.maximaze-close');
    const btnHomeProfile = document.querySelector('.home-nav');
    const btnCloseHomeProfile = document.querySelector('.close-profile');

    //Selectors for window Charity.
    const btnCharityOpen = document.querySelector('.charity-nav');
    const btnCharityClose = document.querySelector('.close-charity');
    const btnCharityAdd = document.querySelector('.add-charity');

    // Selectors for window Profile User. Selectors for functions
    const emailUser = document.querySelector('.email-input');
    const numberUser = document.querySelector('.number-input');
    const emailBlockDisplay = document.querySelector('.out-email');
    const numberBlockDisplay = document.querySelector('.out-number');
    const profileNameDisplay = document.querySelector('.profile-name');
    const profileSurnameDisplay = document.querySelector('.profile-surname');

    // Selector for window "Input Adress"
    const inputAdress = document.querySelector('.input-adress');
    const btnSubmitAdress = document.querySelector('.accept-adress');
    const fieldForAdress = document.querySelector('.users-adress');


    // Adding Event Listener
    popupButton.addEventListener('click', closePopup);
    btnPizzaChoice.addEventListener('click', createChoiceMenuPizza);
    btnBurgerChoice.addEventListener('click', createChoiceMenuBurger);
    btnSnackChoice.addEventListener('click', createChoiceMenuSnack);
    btnDrinkChoice.addEventListener('click', createChoiceMenuDrink);
    logOutButton.addEventListener('click', restartAndLogOut);
    document.addEventListener('click', createFillingPizza);
    document.addEventListener('click', createFillingBurger);
    document.addEventListener('click', createFillingSnack);
    document.addEventListener('click', createFillingDrink);
    btnOpenLearnMore.addEventListener('click', learnMorePrize);
    btnCloseLearnMore.addEventListener('click', closeLearnMore);
    btnOpenComent.addEventListener('click', openComent);
    btnCloseComent.addEventListener('click', closeComent);
    btnBasketNav.addEventListener('click', maximaizeSummary);
    btnCloseMaximazeBasket.addEventListener('click', closeMaximaizeSummary);
    btnHomeProfile.addEventListener('click', openProfile);
    btnCloseHomeProfile.addEventListener('click', closeProfile);
    btnCharityOpen.addEventListener('click', openCharity);
    btnCharityClose.addEventListener('click', closeCharity);
    btnCharityAdd.addEventListener('click', addCharity);
    btnSubmitAdress.addEventListener('click', addingAdress);

    // Adding name and surname in field info person
    popupButton.onclick = logDisplay;
    document.addEventListener('click', addNumberAndEmail);


    //Parts code for functions innerHTML to create food menu ------------
    const menuInnerPizza = `<div class='block-pizza'>
        <div class='box-pizza box-1-p'> ${menuPizza[0].img} <span> ${menuPizza[0].name} ${menuPizza[0].price}</span> ${menuPizza[0].btns} </div>
        <div class='box-pizza box-2-p'> ${menuPizza[1].img} <span> ${menuPizza[1].name} ${menuPizza[1].price}</span> ${menuPizza[1].btns} </div>
        <div class='box-pizza box-3-p'> ${menuPizza[2].img} <span> ${menuPizza[2].name} ${menuPizza[2].price}</span> ${menuPizza[2].btns} </div>
        </div>
        <div class='block-pizza'>
        <div class='box-pizza box-4-p'> ${menuPizza[3].img} <span> ${menuPizza[3].name} ${menuPizza[3].price}</span> ${menuPizza[3].btns} </div>
        <div class='box-pizza box-5-p'> ${menuPizza[4].img} <span> ${menuPizza[4].name} ${menuPizza[4].price}</span> ${menuPizza[4].btns} </div>
        <div class='box-pizza box-6-p'> ${menuPizza[5].img} <span> ${menuPizza[5].name} ${menuPizza[5].price}</span> ${menuPizza[5].btns} </div>
        </div>
        <div class='block-pizza'>
        <div class='box-pizza box-7-p'> ${menuPizza[6].img} <span> ${menuPizza[6].name} ${menuPizza[6].price}</span> ${menuPizza[6].btns} </div>
        <div class='box-pizza box-8-p'> ${menuPizza[7].img} <span> ${menuPizza[7].name} ${menuPizza[7].price}</span> ${menuPizza[7].btns} </div>
        <div class='box-pizza box-9-p'> ${menuPizza[8].img} <span> ${menuPizza[8].name} ${menuPizza[8].price}</span> ${menuPizza[8].btns} </div>
        </div>
        `;
    const menuInnerBurger = `<div class='block-burger'>
        <div class='box-burger box-1-b'> ${menuBurger[0].img} <span> ${menuBurger[0].name} ${menuBurger[0].price}</span> ${menuBurger[0].btns} </div>
        <div class='box-burger box-2-b'> ${menuBurger[1].img} <span> ${menuBurger[1].name} ${menuBurger[1].price}</span> ${menuBurger[1].btns} </div>
        <div class='box-burger box-3-b'> ${menuBurger[2].img} <span> ${menuBurger[2].name} ${menuBurger[2].price}</span> ${menuBurger[2].btns} </div>
        </div>
        <div class='block-burger'>
        <div class='box-burger box-4-b'> ${menuBurger[3].img} <span>${menuBurger[3].name} ${menuBurger[3].price}</span> ${menuBurger[3].btns} </div>
        <div class='box-burger box-5-b'> ${menuBurger[4].img} <span>${menuBurger[4].name} ${menuBurger[4].price}</span> ${menuBurger[4].btns} </div>
        <div class='box-burger box-6-b'> ${menuBurger[5].img} <span>${menuBurger[5].name} ${menuBurger[5].price}</span> ${menuBurger[5].btns} </div>
        </div>
        <div class='block-burger'>
        <div class='box-burger box-7-b'> ${menuBurger[6].img} <span>${menuBurger[6].name} ${menuBurger[6].price}</span> ${menuBurger[6].btns} </div>
        <div class='box-burger box-8-b'> ${menuBurger[7].img} <span>${menuBurger[7].name} ${menuBurger[7].price}</span> ${menuBurger[7].btns} </div>
        <div class='box-burger box-9-b'> ${menuBurger[8].img} <span>${menuBurger[8].name} ${menuBurger[8].price}</span> ${menuBurger[8].btns} </div>
        </div>
        `;
    const menuInnerSnacks = `<div class='block-snack'>
        <div class='box-snack box-1-s'> ${menuSnack[0].img} <span>${menuSnack[0].name} ${menuSnack[0].price}</span> ${menuSnack[0].btns} </div>
        <div class='box-snack box-2-s'> ${menuSnack[1].img} <span>${menuSnack[1].name} ${menuSnack[1].price}</span> ${menuSnack[1].btns} </div>
        <div class='box-snack box-3-s'> ${menuSnack[2].img} <span>${menuSnack[2].name} ${menuSnack[2].price}</span> ${menuSnack[2].btns} </div>
        </div>
        <div class='block-snack'>
        <div class='box-snack box-4-s'> ${menuSnack[3].img} <span>${menuSnack[3].name} ${menuSnack[3].price}</span> ${menuSnack[3].btns} </div>
        <div class='box-snack box-5-s'> ${menuSnack[4].img} <span>${menuSnack[4].name} ${menuSnack[4].price}</span> ${menuSnack[4].btns} </div>
        <div class='box-snack box-6-s'> ${menuSnack[5].img} <span>${menuSnack[5].name} ${menuSnack[5].price}</span> ${menuSnack[5].btns} </div>
        </div>
        `;
    const menuInnerDrink = `<div class='block-drink'>
        <div class='box-drink box-1-d'> ${menuDrink[0].img} <span>${menuDrink[0].name} ${menuDrink[0].price}</span> ${menuDrink[0].btns} </div>
        <div class='box-drink box-2-d'> ${menuDrink[1].img} <span>${menuDrink[1].name} ${menuDrink[1].price}</span> ${menuDrink[1].btns} </div>
        <div class='box-drink box-3-d'> ${menuDrink[2].img} <span>${menuDrink[2].name} ${menuDrink[2].price}</span> ${menuDrink[2].btns} </div>
        </div>
        <div class='block-drink'>
        <div class='box-drink box-4-d'> ${menuDrink[3].img} <span>${menuDrink[3].name} ${menuDrink[3].price}</span> ${menuDrink[3].btns} </div>
        <div class='box-drink box-5-d'> ${menuDrink[4].img} <span>${menuDrink[4].name} ${menuDrink[4].price}</span> ${menuDrink[4].btns} </div>
        <div class='box-drink box-6-d'> ${menuDrink[5].img} <span>${menuDrink[5].name} ${menuDrink[5].price}</span> ${menuDrink[5].btns} </div>
        </div>
        `;

    // Functions ================

    // Functions for person info. Adding in order Name and Surname
    // Function for window Profile. Input, adding email and phone number. Below
    function logDisplay() {
        const valName = logName.value;
        const valSurname = logSurname.value;
        displayName.innerHTML = valName;
        displaySurname.innerHTML = valSurname;
        profileNameDisplay.innerHTML = valName;
        profileSurnameDisplay.innerHTML = valSurname;

    }


    // Function for window Profile User. Adding number and email.
    function addNumberAndEmail() {
        if (event.target.classList.contains('submit-number')) {
            numberBlockDisplay.innerHTML = `
                                <div class='profile-info'>
                                ${numberUser.value}
                                <div>`;
        } else if (event.target.classList.contains('submit-email')) {
            emailBlockDisplay.innerHTML = `
                                <div profile-info>
                                ${emailUser.value}
                                </div>`
        };
    };

    // Open field to type name and surname
    const openPopup = setTimeout(() => {
        const popupActive = document.querySelector('.popup');
        popupActive.classList.add('open');
    }, 1000);
    // CLose window with fields for type name and surname
    function closePopup() {
        const popupActiveTwo = document.querySelector('.popup.open');
        popupActiveTwo.classList.remove('open');
    };

    //Function to open window Charity
    function openCharity() {
        const windowCharityOpen = document.querySelector('.charity-block');
        windowCharityOpen.classList.add('open');
    }
    //Function to close window Charity
    function closeCharity() {
        const windowCharityClose = document.querySelector('.charity-block.open');
        windowCharityClose.classList.remove('open');
    }
    function addCharity() {
        const windowCharityClose = document.querySelector('.charity-block.open');
        windowCharityClose.classList.remove('open');
        displayCartOrder();
    }

    // Function to open window "learn More" about prize. 
    function learnMorePrize() {
        const learnMoreOpen = document.querySelector('.popup-discount')
        learnMoreOpen.classList.add('open');
    }
    // Function to close window "learn More" about prize. 
    function closeLearnMore() {
        const learnMoreOpen = document.querySelector('.popup-discount.open');
        learnMoreOpen.classList.remove('open');
    };

    // Function to open Profile users. Minimum informations.
    function openProfile() {
        const profile = document.querySelector('.profile');
        profile.classList.add('open');
    }
    // Function to close Profile users. Minimum informations.
    function closeProfile() {
        const profileOpen = document.querySelector('.profile.open');
        profileOpen.classList.remove('open')
    }

    // Function to open window "Coment" in nav-menu.
    function openComent() {
        const undisplayBlock = document.querySelector('.review');
        undisplayBlock.classList.add('open');
    }
    // Function to close window "Coment" in nav-menu.
    function closeComent() {
        const displayBlock = document.querySelector('.review.open');
        displayBlock.classList.remove('open');
    }

    // Function to open summary on all window.
    function maximaizeSummary() {
        const summaryOpen = document.querySelector('.summary');
        const btnCloseMaximaze = document.querySelector('.maximaze-close');
        summaryOpen.classList.add('open');
        btnCloseMaximaze.classList.add('open');
    }
    // Function to сlose summary on all window.
    function closeMaximaizeSummary() {
        const summaryCloseOpen = document.querySelector('.summary.open');
        const btnCloseMaximazeWindow = document.querySelector('.maximaze-close.open')
        summaryCloseOpen.classList.remove('open');
        btnCloseMaximazeWindow.classList.remove('open');
    }


    // Function on choice menu. Create Burger, Snacks and Drinks lists. Code below
    
    function createChoiceMenuPizza() {
        const menu = document.getElementById('menu-cards');
        menu.innerHTML = menuInnerPizza;
    };
    function createChoiceMenuBurger() {
        const menu = document.getElementById('menu-cards');
        menu.innerHTML = menuInnerBurger;
    };
    function createChoiceMenuSnack() {
        const menu = document.getElementById('menu-cards');
        menu.innerHTML = menuInnerSnacks;
    };
    function createChoiceMenuDrink() {
        const menu = document.getElementById('menu-cards');
        menu.innerHTML = menuInnerDrink;
    };

    //Function restert page and reset name and surname
    function restartAndLogOut() {
        location.reload()
    };


    // Function create pop - op info about po
    function createFillingPizza(event) {
        // selectors pizza
        const boxPizza1 = document.querySelector('.box-1-p');
        const boxPizza2 = document.querySelector('.box-2-p');
        const boxPizza3 = document.querySelector('.box-3-p');
        const boxPizza4 = document.querySelector('.box-4-p');
        const boxPizza5 = document.querySelector('.box-5-p');
        const boxPizza6 = document.querySelector('.box-6-p');
        const boxPizza7 = document.querySelector('.box-7-p');
        const boxPizza8 = document.querySelector('.box-8-p');
        const boxPizza9 = document.querySelector('.box-9-p');

        // condition
        if (event.target.dataset.id === 'piz0000' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza1, menuPizza[0].filling);
        } else if (event.target.dataset.id === 'piz0001' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza2, menuPizza[1].filling);
        } else if (event.target.dataset.id === 'piz0002' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza3, menuPizza[2].filling);
        } else if (event.target.dataset.id === 'piz0003' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza4, menuPizza[3].filling);
        } else if (event.target.dataset.id === 'piz0004' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza5, menuPizza[4].filling);
        } else if (event.target.dataset.id === 'piz0005' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza6, menuPizza[5].filling);
        } else if (event.target.dataset.id === 'piz0006' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza7, menuPizza[6].filling);
        } else if (event.target.dataset.id === 'piz0007' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza8, menuPizza[7].filling);
        } else if (event.target.dataset.id === 'piz0008' && event.target.classList.contains('btn-info')) {
            displayFilling(boxPizza9, menuPizza[8].filling);
        } else if (!event.target.classList.contains('btn-info')) {
            return ''
        }


        
        // function to close the list of ingredients (toppings)
        const closeFillingPizza = document.querySelector('.close-pizza-list');
        closeFillingPizza.onclick = createChoiceMenuPizza;

    }
    function createFillingBurger(event) {
        // selectors burgers
        const boxBurger1 = document.querySelector('.box-1-b');
        const boxBurger2 = document.querySelector('.box-2-b');
        const boxBurger3 = document.querySelector('.box-3-b');
        const boxBurger4 = document.querySelector('.box-4-b');
        const boxBurger5 = document.querySelector('.box-5-b');
        const boxBurger6 = document.querySelector('.box-6-b');
        const boxBurger7 = document.querySelector('.box-7-b');
        const boxBurger8 = document.querySelector('.box-8-b');
        const boxBurger9 = document.querySelector('.box-9-b');


        // condition - условие
        if (event.target.dataset.id === 'brg0000' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger1, menuBurger[0].filling);
        } else if (event.target.dataset.id === 'brg0001' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger2, menuBurger[1].filling);
        } else if (event.target.dataset.id === 'brg0002' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger3, menuBurger[2].filling);
        } else if (event.target.dataset.id === 'brg0003' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger4, menuBurger[3].filling);
        } else if (event.target.dataset.id === 'brg0004' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger5, menuBurger[4].filling);
        } else if (event.target.dataset.id === 'brg0005' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger6, menuBurger[5].filling);
        } else if (event.target.dataset.id === 'brg0006' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger7, menuBurger[6].filling);
        } else if (event.target.dataset.id === 'brg0007' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger8, menuBurger[7].filling);
        } else if (event.target.dataset.id === 'brg0008' && event.target.classList.contains('btn-info-burger')) {
            displayFilling(boxBurger9, menuBurger[8].filling);
        } else if (!event.target.classList.contains('btn-info-burger')) {
            return ''
        }

        const closeFillingBurger = document.querySelector('.close-burger-list');
        closeFillingBurger.onclick = createChoiceMenuBurger;
    }
    function createFillingSnack(event) {
        // selectors burgers - селекторы бургеров
        const boxSnack1 = document.querySelector('.box-1-s');
        const boxSnack2 = document.querySelector('.box-2-s');
        const boxSnack3 = document.querySelector('.box-3-s');
        const boxSnack4 = document.querySelector('.box-4-s');
        const boxSnack5 = document.querySelector('.box-5-s');
        const boxSnack6 = document.querySelector('.box-6-s');


        // condition - условие
        if (event.target.dataset.id === 'snc0000' && event.target.classList.contains('btn-info-snack')) {
            displayFilling(boxSnack1, menuSnack[0].filling);
        } else if (event.target.dataset.id === 'snc0001' && event.target.classList.contains('btn-info-snack')) {
            displayFilling(boxSnack2, menuSnack[1].filling);
        } else if (event.target.dataset.id === 'snc0002' && event.target.classList.contains('btn-info-snack')) {
            displayFilling(boxSnack3, menuSnack[2].filling);
        } else if (event.target.dataset.id === 'snc0003' && event.target.classList.contains('btn-info-snack')) {
            displayFilling(boxSnack4, menuSnack[3].filling);
        } else if (event.target.dataset.id === 'snc0004' && event.target.classList.contains('btn-info-snack')) {
            displayFilling(boxSnack5, menuSnack[4].filling);
        } else if (event.target.dataset.id === 'snc0005' && event.target.classList.contains('btn-info-snack')) {
            displayFilling(boxSnack6, menuSnack[5].filling);
        } else if (!event.target.classList.contains('btn-info-snack')) {
            return ''
        }
        const closeFillingSnack = document.querySelector('.close-snack-list');
        closeFillingSnack.onclick = createChoiceMenuSnack;
    }
    function createFillingDrink(event) {
        // selectors burgers - селекторы бургеров
        const boxDrink1 = document.querySelector('.box-1-d');
        const boxDrink2 = document.querySelector('.box-2-d');
        const boxDrink3 = document.querySelector('.box-3-d');
        const boxDrink4 = document.querySelector('.box-4-d');
        const boxDrink5 = document.querySelector('.box-5-d');
        const boxDrink6 = document.querySelector('.box-6-d');

        // condition - условие
        if (event.target.dataset.id === 'drk0000' && event.target.classList.contains('btn-info-drink')) {
            displayFilling(boxDrink1, menuDrink[0].filling);
        } else if (event.target.dataset.id === 'drk0001' && event.target.classList.contains('btn-info-drink')) {
            displayFilling(boxDrink2, menuDrink[1].filling);
        } else if (event.target.dataset.id === 'drk0002' && event.target.classList.contains('btn-info-drink')) {
            displayFilling(boxDrink3, menuDrink[2].filling);
        } else if (event.target.dataset.id === 'drk0003' && event.target.classList.contains('btn-info-drink')) {
            displayFilling(boxDrink4, menuDrink[3].filling);
        } else if (event.target.dataset.id === 'drk0004' && event.target.classList.contains('btn-info-drink')) {
            displayFilling(boxDrink5, menuDrink[4].filling);
        } else if (event.target.dataset.id === 'drk0005' && event.target.classList.contains('btn-info-drink')) {
            displayFilling(boxDrink6, menuDrink[5].filling);
        } else if (!event.target.classList.contains('btn-info-drink')) {
            return ''
        }

        const closeFillingDrink = document.querySelector('.close-drink-list');
        closeFillingDrink.onclick = createChoiceMenuDrink;
    }
    //Function create filling cards. InnerHTML
    function displayFilling(elemBlock, elemFilling) {
        elemBlock.innerHTML = elemFilling;
    }




    // Create functions for Basket
    // Function add product in basket
    let basket = {
        'piz0000': 0,
        'piz0001': 0,
        'piz0002': 0,
        'piz0003': 0,
        'piz0004': 0,
        'piz0005': 0,
        'piz0006': 0,
        'piz0007': 0,
        'piz0008': 0,
        'brg0000': 0,
        'brg0001': 0,
        'brg0002': 0,
        'brg0003': 0,
        'brg0004': 0,
        'brg0005': 0,
        'brg0006': 0,
        'brg0007': 0,
        'brg0008': 0,
        'snc0000': 0,
        'snc0001': 0,
        'snc0002': 0,
        'snc0003': 0,
        'snc0004': 0,
        'snc0005': 0,
        'drk0000': 0,
        'drk0001': 0,
        'drk0002': 0,
        'drk0003': 0,
        'drk0004': 0,
        'drk0005': 0
    };
   
    document.onclick = (event) => {
        if (event.target.classList.contains('btn-add')) {
            addFunction(event.target.dataset.id);
        };
        if (event.target.classList.contains('fa-minus')) {
            cleareBasket(event.target.dataset.id);
        };
    };
    
    function addFunction(id) {
        basket[id]++;
        displayCartOrder();


        const displayTotal = document.querySelector('.total-sum');
    };
   
    function cleareBasket(id) {
        basket[id]--;
    }


    
    function displayCartOrder() {

        const sum = document.querySelector('.summary');
        const newCart = document.createElement('div');
        newCart.classList.add('cart-sum');
        sum.appendChild(newCart);

        
        if (event.target.dataset.id === menuPizza[0].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                      <div>${menuPizza[0].imgBasket}</div>
                                      <div>${menuPizza[0].name}</div>
                                      <div class='price'>${menuPizza[0].price}</div> 
                                      <i data-id='piz0000' class="fa-solid fa-minus delete"></i>
                                     </div>`;
        }
        else if (event.target.dataset.id === menuPizza[1].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[1].imgBasket}</div>
                                  <div>${menuPizza[1].name}</div>
                                  <div class='price'>${menuPizza[1].price}</div> 
                                  <i data-id='piz0001' class="fa-solid fa-minus delete"></i>
                                 </div>`
        } else if (event.target.dataset.id === menuPizza[2].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[2].imgBasket}</div>
                                  <div>${menuPizza[2].name}</div>
                                  <div class='price'>${menuPizza[2].price}</div> 
                                  <i data-id='piz0002' class="fa-solid fa-minus delete"></i>
                                 </div>`
        } else if (event.target.dataset.id === menuPizza[3].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[3].imgBasket}</div>
                                  <div>${menuPizza[3].name}</div>
                                  <div class='price'>${menuPizza[3].price}</div> 
                                  <i data-id='piz0003' class="fa-solid fa-minus delete"></i>
                                 </div>`
        } else if (event.target.dataset.id === menuPizza[4].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[4].imgBasket}</div>
                                  <div>${menuPizza[4].name}</div>
                                  <div class='price'>${menuPizza[4].price}</div> 
                                  <i data-id='piz0004' class="fa-solid fa-minus delete"></i>
                                 </div>`
        } else if (event.target.dataset.id === menuPizza[5].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[5].imgBasket}</div>
                                  <div>${menuPizza[5].name}</div>
                                  <div class='price'>${menuPizza[5].price}</div> 
                                  <i data-id='piz0005' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuPizza[6].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[6].imgBasket}</div>
                                  <div>${menuPizza[6].name}</div>
                                  <div class='price'>${menuPizza[6].price}</div> 
                                  <i data-id='piz0006' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuPizza[7].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[7].imgBasket}</div>
                                  <div>${menuPizza[7].name}</div>
                                  <div class='price'>${menuPizza[7].price}</div> 
                                  <i data-id='piz0007' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuPizza[8].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuPizza[8].imgBasket}</div>
                                  <div>${menuPizza[8].name}</div>
                                  <div class='price'>${menuPizza[8].price}</div> 
                                  <i data-id='piz0008' class="fa-solid fa-minus delete"></i>
                                 </div> `
        }
        else if (event.target.dataset.id === menuBurger[0].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[0].imgBasket}</div>
                                  <div>${menuBurger[0].name}</div>
                                  <div class='price'>${menuBurger[0].price}</div> 
                                  <i data-id='brg0000' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[1].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[1].imgBasket}</div>
                                  <div>${menuBurger[1].name}</div>
                                  <div>${menuBurger[1].price}</div> 
                                  <i data-id='brg0001' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[2].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[2].imgBasket}</div>
                                  <div>${menuBurger[2].name}</div>
                                  <div>${menuBurger[2].price}</div> 
                                  <i data-id='brg0002' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[3].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[3].imgBasket}</div>
                                  <div>${menuBurger[3].name}</div>
                                  <div>${menuBurger[3].price}</div> 
                                  <i data-id='brg0003' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[4].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[4].imgBasket}</div>
                                  <div>${menuBurger[4].name}</div>
                                  <div>${menuBurger[4].price}</div> 
                                  <i data-id='brg0004' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[5].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[5].imgBasket}</div>
                                  <div>${menuBurger[5].name}</div>
                                  <div>${menuBurger[5].price}</div> 
                                  <i data-id='brg0005' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[6].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[6].imgBasket}</div>
                                  <div>${menuBurger[6].name}</div>
                                  <div>${menuBurger[6].price}</div> 
                                  <i data-id='brg0006' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[7].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[7].imgBasket}</div>
                                  <div>${menuBurger[7].name}</div>
                                  <div>${menuBurger[7].price}</div> 
                                  <i data-id='brg0007' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuBurger[8].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuBurger[8].imgBasket}</div>
                                  <div>${menuBurger[8].name}</div>
                                  <div>${menuBurger[8].price}</div> 
                                  <i data-id='brg0008' class="fa-solid fa-minus delete"></i>
                                 </div> `
        }
        // Отрисовка снеков --------------------
        // Drawing snacks --------------------
        else if (event.target.dataset.id === menuSnack[0].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuSnack[0].imgBasket}</div>
                                  <div>${menuSnack[0].name}</div>
                                  <div>${menuSnack[0].price}</div> 
                                  <i data-id='snc0000' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuSnack[1].vendorCode) {
            const newLocal_1 = `<div class='basket-list'>
                                  <div>${menuSnack[1].imgBasket}</div>
                                  <div>${menuSnack[1].name}</div>
                                  <div>${menuSnack[1].price}</div> 
                                  <i data-id='snc0001' class="fa-solid fa-minus delete"></i>
                                 </div> `;
        } else if (event.target.dataset.id === menuSnack[2].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuSnack[2].imgBasket}</div>
                                  <div>${menuSnack[2].name}</div>
                                  <div>${menuSnack[2].price}</div> 
                                  <i data-id='snc0002' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuSnack[3].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuSnack[3].imgBasket}</div>
                                  <div>${menuSnack[3].name}</div>
                                  <div>${menuSnack[3].price}</div> 
                                  <i data-id='snc0003' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuSnack[4].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuSnack[4].imgBasket}</div>
                                  <div>${menuSnack[4].name}</div>
                                  <div>${menuSnack[4].price}</div> 
                                  <i data-id='snc0004' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuSnack[5].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuSnack[5].imgBasket}</div>
                                  <div>${menuSnack[5].name}</div>
                                  <div>${menuSnack[5].price}</div> 
                                  <i data-id='snc0005' class="fa-solid fa-minus delete"></i>
                                 </div> `
        }
        
        else if (event.target.dataset.id === menuDrink[0].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuDrink[0].imgBasket}</div>
                                  <div>${menuDrink[0].name}</div>
                                  <div>${menuDrink[0].price}</div> 
                                  <i data-id='drk0000' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuDrink[1].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuDrink[1].imgBasket}</div>
                                  <div>${menuDrink[1].name}</div>
                                  <div>${menuDrink[1].price}</div> 
                                  <i data-id='drk0001' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuDrink[2].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuDrink[2].imgBasket}</div>
                                  <div>${menuDrink[2].name}</div>
                                  <div>${menuDrink[2].price}</div> 
                                  <i data-id='drk0002' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuDrink[3].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuDrink[3].imgBasket}</div>
                                  <div>${menuDrink[3].name}</div>
                                  <div>${menuDrink[3].price}</div> 
                                  <i data-id='drk0003' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuDrink[4].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuDrink[4].imgBasket}</div>
                                  <div>${menuDrink[4].name}</div>
                                  <div>${menuDrink[4].price}</div> 
                                  <i data-id='drk0004' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.dataset.id === menuDrink[5].vendorCode) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div>${menuDrink[5].imgBasket}</div>
                                  <div>${menuDrink[5].name}</div>
                                  <div>${menuDrink[5].price}</div> 
                                  <i data-id='drk0005' class="fa-solid fa-minus delete"></i>
                                 </div> `
        } else if (event.target.classList.contains('add-charity') || event.target.classList.contains('check-charity')) {
            newCart.innerHTML = `<div class='basket-list'>
                                  <div><i class="fa-solid fa-heart"></i></div>
                                  <div>Helping children</div>
                                  <div>$10.00</div> 
                                  <i data-id='chrt000' class="fa-solid fa-minus delete"></i>
                                 </div> `
        };



        // Function delete cart in total order
        let deleteButton = document.querySelectorAll('.delete')
        for (let i = 0; i < deleteButton.length; i++) {
            let button = deleteButton[i];
            button.addEventListener('click', function (id) {
                event.target.parentElement.parentElement.remove();
                cleareBasket()
            });
        };

    };

    function addingAdress() {
        const adress = inputAdress.value;
        fieldForAdress.innerHTML = adress;
    };

   
    // Calling the function for the initial appearance of the "Pizza" menu selection
    createChoiceMenuPizza();
};


// Call function all app  
appPizzaShop();
