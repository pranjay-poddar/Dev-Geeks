const addEventListenerForPersistChange = () => {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => checkbox.addEventListener('change', sessionPersistanceSetting));
}

const addEventListenerForSaveName = () => {
    let saveCardNameButtons = document.querySelectorAll('button.name-save-btn');
    saveCardNameButtons.forEach((button) => button.addEventListener('click', saveCardName));
}

const attachClickListener = () => {
    cardListDiv.addEventListener('click', function(event) {

        // return if there is no action button

        if(!event.target.classList.contains("actionBtn"))
            return;
        
        // action button on the card list was clicked

        const clickedElement = event.target;
        if(clickedElement.classList.contains('restore'))
            restore(clickedElement);
        else
            deleteCard(clickedElement);
    });
}

const deleteCard = (deleteBtn) => {
    const indexOfClickedCard = parseInt(deleteBtn.id.substring(4), 10);

    // Remove the card from DOM

    let clickedCard = document.querySelector("#card-section-" + indexOfClickedCard);
    clickedCard.remove();
    location.href = "popup.html";

    // Update stored data

    const savedData = JSON.parse(localStorage.getItem('data'));
    savedData.splice(indexOfClickedCard, 1);
    localStorage.setItem('data', JSON.stringify(savedData));
}

const restore = function(restoreBtn) {
    const savedData = JSON.parse(localStorage.getItem('data'));
    const indexOfClickedCard = parseInt(restoreBtn.id.substring(8), 10);
    
    // Find the tab which is active when the button is clicked

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {     
        let currentIndex = tabs[0].index;                           // Record its index
        
        savedData[indexOfClickedCard].urls.forEach(url => {     // Fire up the stored tabs
            chrome.tabs.create({url: url});
        });

        if(currentIndex !== null) {
            chrome.tabs.highlight({tabs: currentIndex});        // The tab which the user was using should be in focus.            }
        };

        if (!savedData[indexOfClickedCard].persist) {

            // Remove the card from DOM

            let clickedCard = document.querySelector("#card-section-" + indexOfClickedCard);
            clickedCard.remove();
    
            // Update stored data

            savedData.splice(indexOfClickedCard, 1);
            localStorage.setItem('data', JSON.stringify(savedData));
        }
    });
}

const sessionPersistanceSetting = function(event) {
    const indexOfCard = event.target.id;
    const savedTabGroups = JSON.parse(localStorage.getItem('data'));

    let indexToInsertAt;
    if (!event.target.checked) {
        indexToInsertAt = savedTabGroups.findIndex((tabGroup) => !tabGroup.persist);
    }

    savedTabGroups[indexOfCard].persist = event.target.checked;                   // Update persistence status
    
    if (event.target.checked) {    
        // Card has to be persisted. Move the persisted card to the top of the list                                                    
        if (indexOfCard > 0) {
            savedTabGroups.unshift(savedTabGroups.splice(indexOfCard, 1)[0]);
        }           
    } else {                      
        // Don't persist this card anymore. Move the card to the first position after the persisted cards
        if (savedTabGroups.length > 1) {
            if (indexToInsertAt == -1) {
                savedTabGroups.push(savedTabGroups.splice(indexOfCard, 1)[0]);        // Insert at the end
            } else { 
                indexToInsertAt--;                               // Since we insert after first removing the element from the array
                savedTabGroups.splice(indexToInsertAt, 0, savedTabGroups.splice(indexOfCard, 1)[0]);
            }
        }
    }

    localStorage.setItem('data', JSON.stringify(savedTabGroups));
}

const saveCardName = (event) => {
    let idString = event.target.id;
    const indexOfCardClicked = parseInt(idString.substring(8), 10);       // saveBtn- is 8 character long
    
    let nameTextBox = document.querySelector("#name-" + indexOfCardClicked);
    const enteredName = nameTextBox.value;
    if (enteredName) {
        const savedTabGroups = JSON.parse(localStorage.getItem('data'));
        savedTabGroups[indexOfCardClicked].name = enteredName;
        localStorage.setItem('data', JSON.stringify(savedTabGroups));
    }
    location.href = "popup.html";
}