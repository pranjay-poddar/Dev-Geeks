window.onload = function() {
    var wordContainer = document.getElementById('word-container');
    var refreshButton = document.getElementById('refresh-button');
    var submitButton = document.getElementById('submit-button');
    var guessInput = document.getElementById('guess-input');
    var message = document.getElementById('message');
    var hint = document.getElementById('hint');
    var timeRemaining = document.getElementById('time-remaining');
    var leaderboardList = document.getElementById('leaderboard-list');
    
    var words = [
      { word: 'apple', hint: 'A fruit' },
      { word: 'banana', hint: 'Yellow and curved' },
      { word: 'cherry', hint: 'Small red fruit' },
      { word: 'grape', hint: 'Comes in bunches' },
      { word: 'orange', hint: 'Citrus fruit' },
      {word:'serendipity', hint:'an unplanned fortunate discovery'},
      {word:'Solitude', hint:'the state of being alone or secluded'},
      {word:'euphoria', hint: 'feeling of intense happiness or excitement'},
      {word:'mellifluous',hint:'pleasant to the ears'},
      {word:'happy', hint:' contentment, or joy'}
    ];
    
    var currentWord = null;
    var timer = null;
    var timeLeft = 60;
    var leaderboard = [];
    
    function selectRandomWord() {
      var randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    }
    
    function jumbleWord(word) {
      var jumbledWord = '';
      var wordArray = word.split('');
    
      while (wordArray.length > 0) {
        var randomIndex = Math.floor(Math.random() * wordArray.length);
        jumbledWord += wordArray[randomIndex];
        wordArray.splice(randomIndex, 1);
      }
    
      return jumbledWord;
    }
    
    function updateJumbledWord() {
      currentWord = selectRandomWord();
      var jumbledWord = jumbleWord(currentWord.word);
      wordContainer.textContent = jumbledWord;
      hint.textContent = 'Hint: ' + currentWord.hint;
    }
    
    function resetGame() {
      clearInterval(timer);
      timeLeft = 35;
      timeRemaining.textContent = timeLeft;
      guessInput.value = '';
      message.textContent = '';
      hint.textContent = '';
      updateJumbledWord();
    }
    
    function startTimer() {
      timer = setInterval(function() {
        timeLeft--;
        timeRemaining.textContent = timeLeft;
    
        if (timeLeft === 0) {
          clearInterval(timer);
          message.textContent = 'Time\'s up!';
        }
      }, 1000);
    }
    
    function submitGuess() {
      var guess = guessInput.value.toLowerCase();
    
      if (guess === currentWord.word) {
        clearInterval(timer);
        message.textContent = 'Correct!';
        leaderboard.push({ time: 60 - timeLeft, word: currentWord.word });
        leaderboard.sort(function(a, b) {
          return a.time - b.time;
        });
        updateLeaderboard();
        setTimeout(resetGame, 2000);
      } else {
        message.textContent = 'Wrong guess, try again!';
      }
    }
    
    function updateLeaderboard() {
      leaderboardList.innerHTML = '';
    
      for (var i = 0; i < leaderboard.length; i++) {
        var leaderboardItem = document.createElement('li');
        leaderboardItem.textContent = leaderboard[i].word + ' - ' + leaderboard[i].time + 's';
        leaderboardList.appendChild(leaderboardItem);
      }
    }
    
    refreshButton.addEventListener('click', function() {
      resetGame();
    });
    
    submitButton.addEventListener('click', function() {
      submitGuess();
    });
    
    resetGame();
    startTimer();
  };
  