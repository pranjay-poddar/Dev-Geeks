const band1 = document.getElementById('band1');
const band2 = document.getElementById('band2');
const band3 = document.getElementById('band3');
const band4 = document.getElementById('band4');
const calcBtn = document.querySelector('.btn');

// Define color options for each band
const colorOptions = {
  band1: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'],
  band2: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'],
  band3: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'],
  band4: ['Gold', 'Silver', 'No Colour']
};

function updateDropdownOptions(dropdown, options) {
  dropdown.innerHTML = ''; // Clear existing options

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement('option');
    option.value = options[i].toLowerCase();
    option.text = options[i];
    option.style.backgroundColor = options[i];
    dropdown.appendChild(option);
  }
}

// Update dropdown options initially and on change
updateDropdownOptions(band1, colorOptions.band1);
updateDropdownOptions(band2, colorOptions.band2);
updateDropdownOptions(band3, colorOptions.band3);
updateDropdownOptions(band4, colorOptions.band4);

//adding event listener to the button to calculate the resistance
calcBtn.addEventListener('click', calcResistance);

//resistance calculating function
function calcResistance() {
  const band1Value = band1.value.toLowerCase();
  const band2Value = band2.value.toLowerCase();
  const band3Value = band3.value.toLowerCase();
  const band4Value = band4.value.toLowerCase();
    console.log(band3Value);
  const resistorValues = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    gray: 8,
    white: 9
  };

  const resistanceValue = (resistorValues[band1Value] * 10 + resistorValues[band2Value]) ;

  let tolerancePercentage = '';

  if (band4Value === 'gold') {
    tolerancePercentage = '5%';
  } else if (band4Value === 'silver') {
    tolerancePercentage = '10%';
  } else {
    tolerancePercentage = '20%';
  }

  // Open the popup for the resistance result
  const popup = document.getElementById('popup');
  const popupResult = document.getElementById('popup-result');
  popupResult.textContent = `The value of Resistance is ${resistanceValue} x 10^${resistorValues[band3Value]} Ω ± ${tolerancePercentage} tolerance`;
  popup.style.display = 'flex';
}

// Hide the popup when OK button is clicked
const okButton = document.getElementById('closebtn');
okButton.addEventListener('click', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
});