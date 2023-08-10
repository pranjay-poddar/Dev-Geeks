
let currentResults;


function addCountries(countriesObject){
  const countriesWrapper = document.querySelector('.countries-wrapper')

  countriesWrapper.innerHTML = ''

  Object.keys(countriesObject).forEach(key => {
      const divElement = document.createElement('div')
             divElement.classList.add('country-container')

      const currentCountry = countriesObject[key]

      divElement.innerHTML = `
      
      <img src="${currentCountry.flag}" alt="${currentCountry.name}">
      <p class="country-name">${currentCountry.name}</p>
      <p class="country-capital">Capital: ${currentCountry.capital}</p>
      <p class="country-languages">Languages: ${currentCountry.languages.join(', ')}</p>
      <p class="country-population">Population: ${currentCountry.population}</p>

      `
      countriesWrapper.append(divElement)
  })
}


const inputToSearchCountries = document.querySelector('input')


inputToSearchCountries.addEventListener('keyup', (e)=>{
  const string = e.target.value
  const stringToSearch = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  const regExp = new RegExp(stringToSearch, 'gi')

  const resultByName =  Object.keys(countries_data).map(key => countries_data[key]).filter(country => country.name.match(regExp))

  const resultByLanguage = Object.keys(countries_data).map(key => countries_data[key]).filter(country => country.languages.join(' ').match(regExp))

  if(resultByName.length > 0) {
    currentResults = resultByName
    addCountries(resultByName)
  } else {
    currentResults = resultByLanguage
    addCountries(resultByLanguage)
  }

  updateDOM('population')

})


function sortingMechanism(sortBy, isDescendingIsTrue){

  if(currentResults === undefined) return
  
  const sortedCountries = Object.keys(currentResults).map(key => {
                          
                          return currentResults[key]

                        }).sort((a, b)=> {

                          if (a[sortBy] > b[sortBy]) return 1
                          if (a[sortBy] < b[sortBy]) return -1
                          return 0
                        })
 if(isDescendingIsTrue) sortedCountries.reverse()

 addCountries(sortedCountries)
}

document.querySelectorAll('button').forEach(button => {
  if(button.classList.length === 0) return

  button.addEventListener('click', (e)=> {
    e.target.classList.toggle('sort-desc')

    if(e.target.classList.contains('sort-desc')) return sortingMechanism(e.target.textContent, 1)

    sortingMechanism(e.target.textContent, 0)
  })
})

addCountries(countries_data)
currentResults = countries_data


 let totalPopulation,
     totalLanguages;

(function findTotalPopulations(){
const returnedObject = mostPopulatedCountries()

const sumOfPopulation = Object.keys(returnedObject).map(key =>{
 return returnedObject[key].population
}).reduce((a, b) => a+b )

totalPopulation = sumOfPopulation
})();



(function findTotalLanguages(){
const returnedObject = mostSpokenLanguages()

const sumOfLanguages = Object.keys(returnedObject).map(key => {
 return returnedObject[key].count
}).reduce((a, b) => a+b)

totalLanguages = sumOfLanguages
})();


function mostPopulatedCountries(){
  const mostPopulatedCountries = Object.keys(currentResults).map(key => {
    const country = currentResults[key]
  
    return {
      name: country.name,
      population: country.population,
    }
  }).sort((a, b)=> {
    if (a.population > b.population) return -1
    if (a.population < b.population) return 1
    return 0
  })

  return mostPopulatedCountries
}




function mostSpokenLanguages(){

  const filteringLanguages = new Set()

  Object.keys(currentResults).forEach(key => {
    currentResults[key].languages.forEach(lang => filteringLanguages.add(lang))
  })

  const languagesWithCount = Array.from(filteringLanguages).reduce((acc, cur) => {
    acc[cur] = {
      language: cur,
      count: 0
    }
    return acc
  }, {})

  Object.keys(currentResults).forEach(key => {
    currentResults[key].languages.forEach(lang => {
        if(languagesWithCount[lang].language === lang) languagesWithCount[lang].count++
    })
  })

  const tenMostSpokenLanguages = Object.keys(languagesWithCount).map(key => languagesWithCount[key]).sort((a, b)=> {
    if (a.count>b.count) return -1
    if (a.count<b.count) return 1
    return 0
  })

  return tenMostSpokenLanguages
}


function updateDOM(optionToProceed){

  const wrapperElement = document.querySelector('.wrapper');
        wrapperElement.innerHTML = ''

  if (optionToProceed === 'languages') {

    const returnedObject = mostSpokenLanguages();

    returnedObject.unshift({language: 'World', count: totalLanguages})

    const maxValue = Object.keys(returnedObject).map(key => {
                         return returnedObject[key].count
                      })[0]
    
    Object.keys(returnedObject).forEach(key => {
      const componentElement = document.createElement('div')
          componentElement.classList.add('component')
      
      const language = returnedObject[key].language,
            spokenCountOfLanguage = returnedObject[key].count

      componentElement.innerHTML = `
      <p class="description">${language}</p>
      <progress min="0" max="${maxValue}" value="${spokenCountOfLanguage}"></progress>
      <p class="count">${spokenCountOfLanguage}</p>
      `

      wrapperElement.appendChild(componentElement)
      
    })
    return
  }

  const returnedObject = mostPopulatedCountries();

  returnedObject.unshift({name: 'World', population: totalPopulation})
  
  const maxValue = Object.keys(returnedObject).map(key => {
                       return returnedObject[key].population
                    })[0]
  
  Object.keys(returnedObject).forEach(key => {
    const componentElement = document.createElement('div')
          componentElement.classList.add('component')
    
    const country = returnedObject[key].name,
          populationOfCountry = returnedObject[key].population

    componentElement.innerHTML = `
    <p class="description">${country}</p>
    <progress min="0" max="${maxValue}" value="${populationOfCountry}"></progress>
    <p class="count">${populationOfCountry}</p>
    `

    wrapperElement.appendChild(componentElement)
  })
}


document.querySelectorAll('button').forEach(button => {
  if(button.classList.length !== 0) return

  button.addEventListener('click', (e)=>updateDOM(e.target.value))
})
