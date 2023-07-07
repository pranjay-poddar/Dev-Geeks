function getRandomColor(colorCodes){
  const colorCodesLength  = colorCodes.length
  return colorCodes[Math.floor(Math.random()*colorCodesLength)]
}

function getRandomFontWeight(){
  const fontWeights = [100, 200, 300, 400, 500, 1000],
        fontWeightsLength = fontWeights.length;

  return fontWeights[Math.floor(Math.random()*fontWeightsLength)]
}


setInterval(()=>{
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = ''

  const headingElement = document.createElement('h1');

  const splittedString = '30 Days of JavaScript Challenge 2023 By Asabeneh Yetayeh'.split('')

  splittedString.forEach(charecter => {
    const spanElement = document.createElement('span');
    spanElement.style.color = getRandomColor(colorCodesRange300)
    spanElement.textContent = charecter

    headingElement.appendChild(spanElement)
  })

  headingElement.style.fontWeight = getRandomFontWeight();
  
  mainElement.style.backgroundColor = getRandomColor(colorCodesRange900)

  mainElement.append(headingElement)
}, 3000)

