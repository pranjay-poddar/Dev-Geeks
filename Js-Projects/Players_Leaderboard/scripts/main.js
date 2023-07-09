// Insha allah, i will comment out each line & it's use cases after challenge completion

document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const firstName = e.target.children[0].value,
          lastName = e.target.children[1].value,
          country = e.target.children[2].value,
          score = e.target.children[3].value,
          errorPrompter = document.querySelector('.main__error-prompter')

    errorPrompter.style.display = 'none'

    if (firstName === '' ||
        lastName === '' ||
        country === '' ||
        score === '') return errorPrompter.style.display = 'block'

    const scoreboardContainer = document.querySelector('.main__scoreboard-wrapper')

    const scoreboardElement = document.createElement('div')
          scoreboardElement.classList.add('main__scoreboard');

    scoreboardElement.innerHTML = `
                            <div>
                                <p class="main__player-name">${firstName} ${lastName}</p>
                                <p class="main__time-stamp">${generateDateAndTime()}</p>
                            </div>
                                <p class="main__player-country">${country}</p>
                                <p class="main__player-score">${score}</p>
                                <div class="main__scoreboard-btn-container">
                                    <button>&#x1f5d1;</button>
                                    <button>+5</button>
                                    <button>-5</button>
                                </div>
                                `
    scoreboardContainer.appendChild(scoreboardElement)
    sortScoreBoard()
    activateBtnEventListener()
})


function activateBtnEventListener(){
    document.querySelectorAll('.main__scoreboard-btn-container').forEach(el => {
        el.addEventListener('click', (e)=>{
            const textContent = e.target.textContent;
            const scoreOfPlayer = e.target.parentElement.parentElement.children[2];
            
            if(textContent.length > 2) return
    
            console.log(e.target.parentElement.parentElement)
            console.log('hi')
    
            if(textContent === '🗑') return e.target.parentElement.parentElement.remove()

            scoreOfPlayer.textContent = parseInt(scoreOfPlayer.textContent) + parseInt(textContent)

            sortScoreBoard()
        })
    })
}

activateBtnEventListener()


function sortScoreBoard(){

    const scoreBoardContainer = document.querySelector('.main__scoreboard-wrapper')
    const scoreBoards = document.querySelectorAll('.main__scoreboard')

    const elementsInArray = [] 
    scoreBoards.forEach(el => elementsInArray.push(el))

    const sortedElementsFromArray = elementsInArray.map(el => {return el}).sort((a, b)=>{
        const numA = parseInt(a.children[2].textContent),
            numB = parseInt(b.children[2].textContent)

        if (numA > numB) return -1
        if (numA < numB) return 1
        return 0
    })

    sortedElementsFromArray.forEach(el => {
        scoreBoardContainer.append(el)
    })
}


function generateDateAndTime(){
    const dateObject = new Date()

    const month = dateObject.toLocaleString('default', {month: 'long'}),
          day = dateObject.getDate(),
          year = dateObject.getFullYear(),
          time = dateObject.toLocaleTimeString().slice(0,7)

    const generatedResult = `${month} ${day},${year} ${time}`

    return generatedResult;
}