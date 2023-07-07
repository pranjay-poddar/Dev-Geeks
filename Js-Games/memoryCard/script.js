// Array to store the image URLs
var images = [
    'https://drive.google.com/uc?id=1xGrP2zL1bWsQwrbJLs17WQcsaYmGN6xr',
    'https://drive.google.com/uc?id=1UKful43LrWn6QnWNYwmu6169sn3jNtIt',
    'https://drive.google.com/uc?id=1Q5ZbWUATjjblErH3W57_9rv5FxD1ynbU',
    'https://drive.google.com/uc?id=1QcQgP_4U06aeDEHOS4ARtI9nASVpy3-a',
    'https://drive.google.com/uc?id=1IPaW6DtZErS3BZE-MREsTE72U3DAo141',
    'https://drive.google.com/uc?id=1xcNrFp-1NwdQbbylK4bv8QohO8Y6FnNJ',
    'https://drive.google.com/uc?id=11Ok_WemH_ZUxLAWVFmFtiTiWf3d0xYTC',
    'https://drive.google.com/uc?id=1dnOFD39sx_edpGrrf7fnCdqPo1pcGyPt',
    'https://drive.google.com/uc?id=1k5kz2QkemXx1eILqDsESmGtbagSYvrWb',
    'https://drive.google.com/uc?id=1zsAEmLOJNa4x3RzuBLasPNctxWRW_1eV',
];

// Array to store the cards
var cards = [];

// Variables to store the game state
var flippedCards = [];
var matchedCards = [];

// Shuffle the cards using the Fisher-Yates algorithm
function shuffleCards(array) 
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to start the game
function startGame() 
{
    // Duplicate each image URL to create a pair of cards
    cards = images.concat(images);

    // Shuffle the cards
    cards = shuffleCards(cards);
    var gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Create card elements and add click event listener
    for (var i = 0; i < cards.length; i++) 
    {
        var card = document.createElement('div');
        card.className = 'card';
        
        var image = document.createElement('img');
        image.src = cards[i];
        
        card.appendChild(image);
        card.addEventListener('click', flipCard);
        
        gameBoard.appendChild(card);
    }
}

// Function to flip the card
function flipCard() 
{
    var index = Array.from(this.parentNode.children).indexOf(this);

    // Check if the card is already matched or flipped
    if (matchedCards.includes(index) || flippedCards.includes(index)) 
    {
        return;
    }

    // Flip the card and store its index
    this.children[0].style.display = 'block';
    flippedCards.push(index);

    // Check if two cards are flipped
    if (flippedCards.length === 2) 
    {
        var card1 = cards[flippedCards[0]];
        var card2 = cards[flippedCards[1]];
        
        // Check if the two flipped cards match
        if (card1 === card2) 
        {
            matchedCards = matchedCards.concat(flippedCards);
            flippedCards = [];
            
            // Check if all cards are matched
            if (matchedCards.length === cards.length) 
            {
                setTimeout(function() {
                    alert('Congratulations! You won the game!');
                    resetGame();
                }, 500);
            }
        } 
        else 
        {
            // Flip the cards back after a short delay
            setTimeout(function() {
                var cardElements = document.getElementsByClassName('card');
                cardElements[flippedCards[0]].children[0].style.display = 'none';
                cardElements[flippedCards[1]].children[0].style.display = 'none';
                flippedCards = [];
            }, 500);
        }
    }
}

// Function to reset the game
function resetGame() 
{
    flippedCards = [];
    matchedCards = [];
    startGame();
}

// Start the game
startGame();  