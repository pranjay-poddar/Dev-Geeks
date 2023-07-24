function calculateWeight(){
  const massOfObject = document.querySelector('input').value,
        planetName = document.querySelector('select').value,
        wrapperDiv = document.querySelector('.wrapper')
  
  // Removing child elements before appending new child elements
  wrapperDiv.innerHTML = ''

  // Returns the error message if the input is empty or submitted with other charecters
  if(massOfObject === '') return wrapperDiv.innerHTML = '<p class="result glass-bg g-place-center">Please enter weight in kilograms</p>' 
  if(planetName === '') return wrapperDiv.innerHTML = '<p class="result glass-bg g-place-center">Please choose a Planet to proceed</p>' 

  // Planet's mass & other properties are assigned
  const planet = planetData[planetName]

  // Weight is calculated
  const  weight = parseFloat(massOfObject * planet.surfaceGravity).toFixed(2);

  // Finally, the result is edited in innerHTML of wrapperDiv
  wrapperDiv.innerHTML = `
                          <p class="result glass-bg g-place-center">The weight of the object on <b>${planetName}</b>
                              <span class="rounded g-place-center">${weight} N</span>
                          </p>
                          <img src="https://raw.githubusercontent.com/0xabdulkhalid/30-days-of-javascript-solutions/main/day-24/images/${planetName}.png" alt="${planetName}">
                          `  

}