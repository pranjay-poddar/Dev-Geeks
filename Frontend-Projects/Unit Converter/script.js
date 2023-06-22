const length = document.querySelector('#amount');
const convertFrom = document.querySelector('#from');
const convertTo = document.querySelector('#to');
const formular = document.querySelector('.content');
const result = document.querySelector('#result');
const selectElem = document.querySelectorAll('select');


const units = [
    'meter',
    'kilometer',
];



for (let i = 1; i >= 0; i--) {
    let option = `<option value=${units[i]}>${units[i]}</option>`;
    selectElem[0].firstElementChild.insertAdjacentHTML('afterend', option);
}
for (let i = 1; i >= 0; i--) {
    let option = `<option value=${units[i]}>${units[i]}</option>`;
    selectElem[1].firstElementChild.insertAdjacentHTML('afterend', option);
}


function convertUnits (){
    if (
        (convertFrom.value === 'centimeter') && (convertTo.value === 'centimeter') ||
        (convertFrom.value === 'meter') && (convertTo.value === 'meter') ||
        (convertFrom.value === 'kilometer') && (convertTo.value === 'kilometer')
    ){
        result.value = length.value;
    
    }
    else if((convertFrom.value === 'centimeter') && (convertTo.value === 'meter')){
        result.value = length.value / 100;
       
    }
    else if((convertFrom.value === 'centimeter') && (convertTo.value === 'kilometer')){
        result.value = length.value / 100000;
       
    }
    else if((convertFrom.value === 'meter') && (convertTo.value === 'centimeter')){
        result.value = length.value * 100;
        
    }
    else if((convertFrom.value === 'meter') && (convertTo.value === 'kilometer')){
        result.value = length.value / 1000;
       
    }
    else if((convertFrom.value === 'kilometer') && (convertTo.value === 'centimeter')){
        result.value = length.value * 100000;
       
    }
    else if((convertFrom.value === 'kilometer') && (convertTo.value === 'meter')){
        result.value = length.value * 1000;
       
    }
}


convertFrom.addEventListener('change',convertUnits);
convertTo.addEventListener('change',convertUnits);
length.addEventListener('input',convertUnits);