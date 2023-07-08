/* Function to find ten most populated countries

   1. We using key to get value during iteration of the object
      in map, then map returns an new object itself. Eg: {name: xxxx, population: yyyy}
   
   2. We chained sort() with map to sort the object by ascending order with population count,
      and then we splicing the first ten objects in our array

   3. Finally we returning the tenMostPopulatedCountries array
      
*/
function findTenMostPopulatedCountries(){
  const tenMostPopulatedCountries = Object.keys(countries_data).map(key => {
    const country = countries_data[key]
  
    return {
      name: country.name,
      population: country.population,
    }
  }).sort((a, b)=> {
    if (a.population > b.population) return -1
    if (a.population < b.population) return 1
    return 0
  }).splice(0, 10)

  return tenMostPopulatedCountries
}


/* Function to find ten most populated countries

   1. We using key to get value during iteration of the object
      in forEach, then iterated value is added to filteringLanguages set.
      We are using set() because it will avoid distinct elements, which means
      we can avoid duplicates easily
      
   2. Now we want to create an array of objects which includes the language 
      name and its count, And we can't use forEach for set we obtained earlier.
      That's why we using Array.from() which converts a set into an array.
      Along with that we chaining reduce method which returns the current 
      language with count initialized to 0
      Eg: 'English' { language: English, count: 0 }
      Here the key is the language itself, using this way we can increment the count easier
   
   3. Now we want to iterate through the original countries object with corresponding keys
      using forEach(), inside this we iterating the current country's languages (it is in Array[]).
      if the current language of country is equal to the languagesWithCount object then
      our corresponding country's count is incremented
    
   3. After this process, we want to sort the objects with higher count of language.
      So We chained sort() with map to sort the object by ascending order with language count,
      and then we splicing the first ten objects in our array

   3. Finally we returning the tenMostSpokenLanguages array
      
*/

function findTenMostSpokenLanguages(){

  const filteringLanguages = new Set()

  Object.keys(countries_data).forEach(key => {
    countries_data[key].languages.forEach(lang => filteringLanguages.add(lang))
  })

  const languagesWithCount = Array.from(filteringLanguages).reduce((acc, cur) => {
    acc[cur] = {
      language: cur,
      count: 0
    }
    return acc
  }, {})

  Object.keys(countries_data).forEach(key => {
    countries_data[key].languages.forEach(lang => {
        if(languagesWithCount[lang].language === lang) languagesWithCount[lang].count++
    })
  })

  const tenMostSpokenLanguages = Object.keys(languagesWithCount).map(key => languagesWithCount[key]).sort((a, b)=> {
    if (a.count>b.count) return -1
    if (a.count<b.count) return 1
    return 0
  }).splice(0, 10)

  return tenMostSpokenLanguages
}



/* Function to update DOM

   1. This part is not tough like the above ones, It requires the optionToProceed whether
      its update DOM for population or languages.
   
   3. If optionToProceed is equal to 'languages' then it will update DOM for languages
      otherwise it will update DOM for  'population'
      
*/

function updateDOM(optionToProceed){

  const wrapperElement = document.querySelector('.wrapper');
        wrapperElement.innerHTML = ''

  if (optionToProceed === 'languages') {

    const returnedObject = findTenMostSpokenLanguages();

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

  const returnedObject = findTenMostPopulatedCountries();

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




/* Select all button elements and loop through's each element
   to add click event listener.

   If user click any one of them, then the button's value is passed
   as an argument to updateDOM() function
*/
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', (e)=>updateDOM(e.target.value))
})