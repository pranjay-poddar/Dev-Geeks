let attachEventSaveTabs = () => {

    // select all the tabs and store it in local storage when button is clicked

    let storeTabs = document.querySelector('#createSession');
    storeTabs.addEventListener('click', () => {

        // Get and store all the tabs in the current window

        chrome.tabs.query({currentWindow: true}, function(tabs) {         
          let savedTabs = {                                               
              createdAt : Date.now(),
              noOfTabs : tabs.length,
              titles : tabs.map(tab => {
                  return tab.title;
              }),
              urls : tabs.map(tab => {
                  return tab.url;
              }),
              favIconUrls: tabs.map(tab => {
                  return tab.favIconUrl;
              }),
              persist : false
          };

          // Store into local storage if empty else push into next index
          
          let savedData;
          if(localStorage.getItem('data') === null)
              savedData = [savedTabs];
          else {
              savedData = JSON.parse(localStorage.getItem('data'));
              let index = savedData.findIndex((tabGroup) => !tabGroup.persist);
              if (index == -1) {
                  savedData.push(savedTabs);
              } else {
                  savedData.splice(index, 0, savedTabs);
              }
          }
          
          // Update stored data and reload the page to display udated items

          localStorage.setItem('data', JSON.stringify(savedData));
          location.href = "popup.html";
      
          // Close all the tabs and create a new tab
          let checkBox = document.getElementById("tabStateSelector");
          if(!checkBox.checked){
          chrome.tabs.create({});
          chrome.tabs.remove(tabs.map(tab => {
              return tab.id;
          }));
        } 
        });
    });
} 