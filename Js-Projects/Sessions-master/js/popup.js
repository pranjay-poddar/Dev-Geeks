const display = () => {

    // Load data from the local storage

    const localStorageData = JSON.parse(localStorage.getItem('data'));

    // Array does not exists or is empty

    if((!Array.isArray(localStorageData)) || (localStorageData.length === 0)) {
        return;
    }

    // Display data from local storage 

    localStorageData.forEach((tabGroup, index) => {
        buildCard(tabGroup, index);
    });
}