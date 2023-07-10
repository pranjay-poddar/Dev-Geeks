const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')

let lives = 2
let speed = 150
let currentShooterIndex = 202
let results = 0
let leveldisplay = 1

function level() {

    let width = 15
    let direction = 1
    let invadersId
    let goingRight = true
    let aliensRemoved = []

    levelno.innerHTML = leveldisplay

    for (let i = 0; i < 225; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
    }

    const squares = Array.from(document.querySelectorAll('.grid div'))

    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]

    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
    }

    draw()

    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader')
        }
    }

    squares[currentShooterIndex].classList.add('shooter')


    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        switch (e.key) {
            case 'ArrowLeft':
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
                break
            case 'ArrowRight':
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown', moveShooter)

    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
        remove()

        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1
                direction = -1
                goingRight = false
            }
        }

        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1
                direction = 1
                goingRight = true
            }
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction
        }

        draw()

        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            if (lives == 0) {
                alert("GAME OVER")
                clearInterval(invadersId)
            }
            else {
                lives--;
                life.innerHTML = lives
                for (let i = 0; i < alienInvaders.length; i++) {
                    remove()
                    alienInvaders[i] -= 165
                    direction = 1
                    goingRight = true
                }
            }
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] > (squares.length)) {
                if (lives === 0) {
                    alert("GAME OVER")
                    clearInterval(invadersId)
                }
                else {
                    lives--;
                    life.innerHTML = lives
                    for (let i = 0; i < alienInvaders.length; i++) {
                        remove()
                        alienInvaders[i] -= 165
                        direction = 1
                        goingRight = true
                    }
                }
            }
        }
        if (aliensRemoved.length === alienInvaders.length) {
            resultsDisplay.innerHTML = 'YOU WIN'
            speed -= 50
            leveldisplay++
            clearInterval(invadersId)
            // squares[currentShooterIndex].classList.remove('shooter')
            remove()
            // squares[currentShooterIndex].classList.remove('shooter')
            level()
            // clearInterval(invadersId)
        }
    }

    invadersId = setInterval(moveInvaders, speed)

    function shoot(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex

        function moveLaser() {
            if (squares[currentLaserIndex].classList) {
                squares[currentLaserIndex].classList.remove('laser')
            }
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')

            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
                clearInterval(laserId)

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results++
                resultsDisplay.innerHTML = results
                console.log(aliensRemoved)

            }

        }
        switch (e.key) {
            case 'ArrowUp':
                var audio = new Audio("blastersound.mp3");
                audio.play();
                laserId = setInterval(moveLaser, 100)
        }
    }

    document.addEventListener('keydown', shoot)

}
level()



