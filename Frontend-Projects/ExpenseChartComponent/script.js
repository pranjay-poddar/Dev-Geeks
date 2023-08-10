import data from './data.json' assert { type: 'json'}

const bar = document.getElementsByClassName('bar')
const amt = document.getElementById('amt')
const amtSpend = document.getElementsByClassName('amtSpend')

let total = 0;
let highestAmt = 0;

for(let i = 0; i < data.length; i++){
    total += data[i].amount
    highestAmt = data[i].amount > highestAmt ? data[i].amount : highestAmt
    amtSpend[i].innerHTML = "$" + data[i].amount
}

amt.innerHTML += total


for(let i = 0; i < data.length; i++){
    const heightPercentage = data[i].amount / highestAmt * 100
    bar[i].style.height =  (heightPercentage/100 ) * 120 + 'px'
    if(bar[i].style.height === '120px'){
        bar[i].style.backgroundColor = 'hsl(186, 34%, 60%)'
    }
}