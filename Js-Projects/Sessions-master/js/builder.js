const cardListDiv = document.querySelector('.sessionContainer');

const buildCard = (cardDetails, indexOfCard) => {
    const cardSectionDiv = document.createElement('div');
    cardSectionDiv.id = "card-section-" + indexOfCard;

    const nameDiv = buildNameDiv(indexOfCard, cardDetails.name);
    cardSectionDiv.appendChild(nameDiv);

    const div = document.createElement("div");
    div.classList.add("card");

    const header = buildHeader(cardDetails.createdAt, cardDetails.noOfTabs);
    div.appendChild(header);

    const content = buildContent(cardDetails.titles, cardDetails.favIconUrls);
    div.appendChild(content);
    
    const footer = buildFooter(indexOfCard, cardDetails.persist);
    div.appendChild(footer);

    cardSectionDiv.appendChild(div);
    cardListDiv.appendChild(cardSectionDiv);

    let illustrationDom = document.querySelector('.illustration');
    illustrationDom.style.display = "none";

    let textDom = document.querySelector('.textContent');
    textDom.style.display = "none";

}

const buildNameDiv = (indexOfCard, cardName) => {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "name-row-div");
    let nameBtn = document.createElement("button");
    nameBtn.classList.add("name-btn");
    if (cardName) {
        nameBtn.style.display = "block"
        nameBtn.textContent = cardName;
        nameBtn.disabled = true;
        rowDiv.appendChild(nameBtn);
        return rowDiv;
    }

    let nameTextBox = document.createElement('input');
    nameTextBox.setAttribute("type", "text inline");
    nameTextBox.setAttribute("placeholder", "Enter name");
    nameTextBox.classList.add("name-text-box", "hide-element");
    nameTextBox.id = "name-" + indexOfCard;
    nameTextBox.style.display = "none";

    let saveNameBtn = document.createElement("button");
    saveNameBtn.classList.add("name-save-btn", "hide-element");
    saveNameBtn.textContent = "Save";
    saveNameBtn.id = "saveBtn-" + indexOfCard;
    saveNameBtn.style.display = "none";

    nameBtn.textContent = "Enter Session Name";
    nameBtn.addEventListener('click', function() {
        if(nameTextBox.classList.contains("hide-element")) {
            nameTextBox.style.display = "block";
            saveNameBtn.style.display = "block";
            nameBtn.style.display = "none"
        } 
    });

    rowDiv.appendChild(nameBtn);
    rowDiv.appendChild(nameTextBox);
    rowDiv.appendChild(saveNameBtn);

    return rowDiv;
}


const buildHeader = (createdAt, noOfTabs) => {
    let headerDiv = document.createElement('div');
    headerDiv.classList.add("header", "row");

    let dateDiv = document.createElement('div');
    dateDiv.classList.add("date", "col", "s6");
    dateDiv.textContent = moment(createdAt).fromNow();
    headerDiv.appendChild(dateDiv);

    let noOfTabsDiv = document.createElement('div');
    noOfTabsDiv.classList.add("noOfTabs", "col", "s6");
    noOfTabsDiv.textContent = noOfTabs + " Tabs";
    headerDiv.appendChild(noOfTabsDiv);
    
    return headerDiv;
}

const buildContent = function(tabTitles, favIconUrls) {
    const container = document.createElement('div');
    container.classList.add("card-content");

    const list = document.createElement('ul');
    list.classList.add("collection");

    let count=0;
    for(count ; count < tabTitles.length && count < 3; ++count) {        // Display upto three tabs
        let item = document.createElement('li');
        item.classList.add("collection-item");
        
        let icon = document.createElement('img');
        icon.setAttribute("src", favIconUrls[count]);
        item.appendChild(icon);
    

        let textNode = document.createTextNode(tabTitles[count]);
        item.appendChild(textNode);
        list.appendChild(item);
    }

    container.appendChild(list);
    return container;
}

const buildFooter = function(indexOfCard, is_card_persisted) {
    const div = document.createElement('div');
    div.classList.add("card-action");
    
    const restore = document.createElement('a');
    restore.classList.add("actionBtn", "restore");
    restore.setAttribute("href", "#");
    restore.textContent = "Restore";
    restore.id = "restore-" + indexOfCard;
    div.appendChild(restore);
    
    const del = document.createElement('a');
    del.classList.add("actionBtn", "del");
    del.setAttribute("href", "#");
    del.textContent = "Delete";
    del.id = "del-" + indexOfCard;
    div.appendChild(del);
    
    const persistLabel = document.createElement('label');
    persistLabel.setAttribute("for", indexOfCard.toString());

    const persistCheckBox = document.createElement('input');
    persistCheckBox.setAttribute("type", "checkbox");
    persistCheckBox.id = indexOfCard.toString();
    if (is_card_persisted) {
        persistCheckBox.setAttribute("checked", "checked");
    }
    persistLabel.appendChild(persistCheckBox);

    const persistSpan = document.createElement('span');
    persistSpan.textContent = "Do not remove";
    persistLabel.appendChild(persistSpan);

    div.appendChild(persistLabel);

    return div;
}