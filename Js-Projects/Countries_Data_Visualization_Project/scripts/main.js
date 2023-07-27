document.querySelector('#countries-count').textContent = countries.length


const searchBar = document.querySelector('[type="text"]');

searchBar.addEventListener('keyup', (e)=>{
  const filtersOptions = document.querySelectorAll("input:not([type=\"text\"])"),
        queryFeedbackDisplayer = document.querySelector('.main__query-feedback'),
        stringToSearch = e.target.value

  let result = []

  if(filtersOptions[0].checked) {
    const capitalizedString = stringToSearch.charAt(0).toUpperCase() + stringToSearch.slice(1).toLowerCase()
    result = countries.filter(country => country.startsWith(capitalizedString))

    queryFeedbackDisplayer.innerHTML = `Countries starts with 
                                       "<span class="main__highlighted">${stringToSearch}</span>" 
                                       are <span class="main__highlighted">${result.length}</span>`

  } else {
    const findCountryWithRegExp = new RegExp(stringToSearch, 'gi')
    result = countries.filter(country => country.match(findCountryWithRegExp))

    queryFeedbackDisplayer.innerHTML = `Countries containing 
                                       "<span class="main__highlighted">${stringToSearch}</span>" 
                                       are <span class="main__highlighted">${result.length}</span>`
  }

  if (filtersOptions[2].checked) result.reverse()

  const wrapperElement = document.querySelector('.main__countries-wrapper');
  wrapperElement.innerHTML = ''

  result.forEach(country => {
    const componentElement = document.createElement('div')
        componentElement.classList.add('main__country-component')
    
    

    componentElement.textContent = country

    wrapperElement.appendChild(componentElement)
    
  })

  document.querySelectorAll('.main__highlighted').forEach(element => {
    element.style.color = colorCodes[Math.floor(Math.random()*colorCodes.length)]
  })

  if (stringToSearch === '') queryFeedbackDisplayer.innerHTML = ''

})



