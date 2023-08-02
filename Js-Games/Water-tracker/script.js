const cups = document.getElementById('cups')
const remained = document.getElementById('remained')
const percentage = document.getElementById('percentage')
const litres = document.getElementById('litres')
const text = document.getElementById('text')


text.addEventListener('change', (e) => {
  const goal = e.target.value

  const glasses = goal/(250/1000) 
  const unit = 1/glasses 

  const createCups = Array.from({length: glasses}, (_, index) => index + 1);

  cups.innerHTML = ''
  
  createCups.forEach(cup => {
    const cupEl = document.createElement('span')
    cupEl.classList.add('cup-small', 'cup')
    cupEl.innerHTML = cup
    cupEl.innerText = '250ml'
    cups.appendChild(cupEl)
    cupEl.style.cursor ='pointer'
  })

  updateBigCap()

  const smallCups = document.querySelectorAll('.cup-small')

  smallCups.forEach((cup,idx) => {
    cup.addEventListener('click', () => highlightCups(idx))
  })

  function highlightCups(idx) {

    if (smallCups[idx].classList.contains('full') && smallCups[idx].nextElementSibling == null) {
      idx--
    } else if(smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')){
      idx--
    }

    smallCups.forEach((cup, idx2) => {
      if(idx2 <= idx) {
        cup.classList.add('full')
      } else {
        cup.classList.remove('full')
      }
    })

    updateBigCap()
  }

  function updateBigCap() {
    const fullCaps = document.querySelectorAll('.full').length
    
    if(goal == 0){
      remained.style.visibility = 'hidden'
      percentage.innerText = ''
      percentage.style.opacity = 0;
      percentage.style.background = 'rgba(255, 255, 255, 0.7)';
    } else {
      percentage.style.opacity = 1;
      remained.style.visibility = 'visible'
      percentage.style.background = 'rgba(146, 216, 227, 0.7)';
      percentage.style.flex = (unit * fullCaps)
      percentage.innerText = `${Math.round((unit * fullCaps * 100)*10)/10}%`
      remained.style.flex = (1 - (unit * fullCaps))
      litres.innerText = `${ goal - (250 * fullCaps)/1000 }L`}

    if((unit * fullCaps) == 1){
      remained.style.height = 0
      remained.style.opacity = 0
      percentage.innerText = 'Well done!'
      percentage.style.fontWeight = '500';
      percentage.style.fontSize = '20px';
      percentage.style.height = '100%'
    } else {
      remained.style.opacity = 1
    }

    if((unit * fullCaps) == 0) {
      percentage.style.height = 0
      percentage.style.opacity = 0
    } else {
      percentage.style.opacity = 1
    }

  }
  
}) 





