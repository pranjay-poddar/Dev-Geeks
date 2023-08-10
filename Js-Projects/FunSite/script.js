// QUERY SELECTORS

const memeContent = document.querySelector(".meme-content");
const jokeContent = document.querySelector(".joke-content");
const quoteContent = document.querySelector(".quote-content");
const riddleContent = document.querySelector(".riddle-content");
const btn = document.getElementById("reveal-btn");

// REVEAL BUTTON FOR RIDDLE

const revealBtn = document.createElement("button");
revealBtn.textContent = "Reveal riddle answer";
var ans = document.createElement('p');

// FUNCTIONS TO SHOW CONTENT

function showMeme() {
    clearAll();
    const meme = getRandomData('memes');
    const show = document.createElement('img');
    show.setAttribute('src', meme);
    memeContent.appendChild(show);
}

function showJoke() {
    clearAll();
    const joke = getRandomData('jokes');
    const show = document.createElement('p');
    show.textContent = joke;
    jokeContent.appendChild(show);
}

function showQuote() {
    clearAll();
    const quote = getRandomData('quotes');
    const show = document.createElement('p');
    show.textContent = quote.quote + "  ~" + quote.author;
    quoteContent.appendChild(show);
}

function showRiddle() {
    clearAll();
    const riddle = getRandomData('riddles');
    const show = document.createElement('p');
    show.textContent = riddle.question;
    ans.textContent = riddle.answer;
    riddleContent.appendChild(show);
    riddleContent.appendChild(ans);
    ans.hidden = true;
    btn.appendChild(revealBtn);
}

// EVENT LISTENERS FOR REVEAL BUTTON

revealBtn.addEventListener("click", () => {
    if (ans.hidden) {
      ans.hidden = false;
    } else {
      alert("The answer is already revealed!");
    }
  }
);

// FUNCTONS FOR CLEAR ALL AND REMOVING BUTTON AND GETTING RANDOM DATA FOR CONTENT

function clearAll() {
    removeBtn(); 
    memeContent.innerHTML = "";
    jokeContent.innerHTML = "";
    quoteContent.innerHTML = "";
    riddleContent.innerHTML = "";
}

function removeBtn() {
  if (btn.contains(revealBtn)) {
    btn.removeChild(revealBtn);
  }
}

function getRandomData(type) {
    return data[type][rn(data[type].length)];
}

// ARRAYS FOR THE CONTENT

const memes = ['res/meme01.jpg', 'res/meme02.jpg', 'res/meme03.jpg', 'res/meme04.jpg', 'res/meme05.jpg', 'res/meme06.jpg', 'res/meme07.jpg', 'res/meme08.jpg', 'res/meme09.jpg', 'res/meme10.jpg', 'res/meme11.jpg', 'res/meme12.jpg', 'res/meme13.jpg', 'res/meme14.jpg', 'res/meme15.jpg', 'res/meme16.jpg', 'res/meme17.jpg', 'res/meme18.jpg', 'res/meme19.jpg', 'res/meme20.jpg'];

const jokes = ['I just got my doctor\'s test results and I\'m really upset about it. Turns out, \'m not gonna be a doctor.',
               'A man wakes from a coma. His wife changes out of her black clothes and, irritated, remarks, “I really cannot depend on you in anything, can I!”',
               'I was digging in our garden and found a chest full of gold coins. I wanted to run straight home to tell my wife about it. Then I remembered why I was digging in our garden.',
               'Even people who are good for nothing have the capacity to bring a smile to your face, like when you push them down the stairs.',
               'My mom died when we couldn’t remember her blood type. As she died, she kept telling us to “be positive,” but it’s hard without her.',
               'I visited my new friend in his apartment. He told me to make myself at home. So I threw him out. I hate having visitors.',
               'Do you know the phrase “One man’s trash is another man’s treasure”? Wonderful saying, horrible way to find out that you were adopted.',
               'Why did the man miss the funeral? He wasn’t a mourning person.',
               'When I see the names of lovers engraved on a tree, I don\'t find it cute or romantic. I find it weird how many people take knives with them on outings.',
               'Give a man a match, and he’ll be warm for a few hours. Set him on fire, and he will be warm for the rest of his life.',
               'My wife is mad that I have no sense of direction. So I packed up my stuff and right.',
               'When does a joke become a dad joke? When it leaves you and never comes back.',
               'A priest asks the convicted murderer at the electric chair, “Do you have any last requests?” “Yes,” replies the murderer. “Can you please hold my hand?”',
               'I just read that someone in New York gets stabbed every 52 seconds. Poor guy.',
               'The doctor gave me one year to live, so I shot him with my gun. The judge gave me 15 years. Problem solved.',
               'You know you’re not liked when you get handed the camera every time they take a group photo.',
               'My grandfather said my generation relies too much on the latest technology. So I unplugged his life support.',
               'How many emo kids does it take to screw in a lightbulb? None, they all sit in the dark and cry.',
               'They laughed at my crayon drawing. I laughed at their chalk outline.',
               'You’re not completely useless. You can always be used as a bad example.'];

const quotes = [
  { quote: 'To live is the rarest thing in the world. Most people exist, that is all.', author: 'Oscar Wilde'},
  { quote: 'That it will never come again is what makes life so sweet.', author: 'Emily Dickinson'},
  { quote: 'It is never too late to be what you might have been.', author: 'George Eliot'},
  { quote: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', author: 'Ralph Waldo Emerson'},
  { quote: 'Pain is inevitable. Suffering is optional.', author: 'Haruki Murakami'},
  { quote: 'All the world\'s a stage, and all the men and women merely players.', author: 'William Shakespeare'},
  { quote: 'Be kind, for everyone you meet is fighting a hard battle.', author: 'Plato'},
  { quote: 'Unable are the loved to die for love is immortality.', author: 'Emily Dickinson'},
  { quote: 'Don\'t let your happiness depend on something you may lose.', author: 'C.S. Lewis'},
  { quote: 'We are all broken, that\'s how the light gets in.', author: 'Ernest Hemingway'},
  { quote: 'Appreciation is a wonderful thing. It makes what is excellent in others belong to us as well.', author: 'Voltaire'},
  { quote: 'Life is tough my darling, but so are you.', author: 'Stephanie Bennett Henry'},
  { quote: 'Self-awareness and self-love matter. Who we are is how we lead.', author: 'Brene Brown'},
  { quote: 'Amateurs sit and wait for inspiration, the rest of us just get up and go to work.', author: 'Stephen King'},
  { quote: 'Get it down. Take chances. It may be bad, but it\'s the only way you can do anything really good.', author: 'William Faulkner'},
  { quote: 'To produce a mighty book, you must choose a mighty theme.', author: 'Herman Melville'},
  { quote: 'Ideas are like rabbits. You get a couple and learn how to handle them, and pretty soon you have a dozen.', author: 'John Steinbeck'},
  { quote: 'he Six Golden Rules of Writing: Read, read, read, and write, write, write.', author: 'Ernest Gaines'},
  { quote: 'he purpose of a writer is to keep civilization from destroying itself.', author: 'Albert Camus'},
  { quote: 'You can always edit a bad page. You can\'t edit a blank page.', author: 'Jodi Picoult'},
];

const riddles = [
  { question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', answer: 'An echo' },
  { question: 'You measure my life in hours and I serve you by expiring. I’m quick when I’m thin and slow when I’m fat. The wind is my enemy. ', answer: 'A Candle' },
  { question: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I? ', answer: 'A Map' },
  { question: 'What is seen in the middle of March and April that can’t be seen at the beginning or end of either month?', answer: 'The letter "R"' },
  { question: 'You see a boat filled with people. It has not sunk, but when you look again you don’t see a single person on the boat. Why?', answer: 'All the people were married' },
  { question: 'What word in the English language does the following: the first two letters signify a male, the first three letters signify a female, the first four letters signify a great, while the entire world signifies a great woman. What is the word?', answer: 'Heroine' }
];

function rn(len) {
  return Math.floor(Math.random() * len);
}

const data = {
    memes,
    jokes,
    quotes,
    riddles
  };
