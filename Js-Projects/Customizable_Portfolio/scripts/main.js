// Insha allah, This script still needs to be improved 

document.querySelector('.main__author-about').textContent = userData.author.bio


const imgElement = document.querySelector('.main__tech-stack');

const keyWords = Object.keys(userData.keywords);

const titlesContainer = document.querySelector('.main__titles');

let indexForTechStack = 0,
    indexForTitles = 0;

setInterval(()=>{
    const currentTitle = userData.author.titles[indexForTitles]
    titlesContainer.innerHTML= `
        <span class="main__titlemoji">${currentTitle[0]}</span>
        <p class="main__title--animated">${currentTitle[1]}</p>
    `
    indexForTitles++
    if(indexForTitles === userData.author.titles.length-1) { indexForTitles = 0};

    imgElement.removeChild(document.querySelector('.main__tech--animated'))

    const img = document.createElement('img');
    img.setAttribute('src', userData.keywords[keyWords[indexForTechStack]]);
    img.setAttribute('alt', keyWords[indexForTechStack]);
    img.classList.add('main__tech--animated')
       
    imgElement.append(img)
    indexForTechStack++;
    if(indexForTechStack === keyWords.length-1) { indexForTechStack = 0};
  }, 3000)

