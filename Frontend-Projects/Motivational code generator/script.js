document.addEventListener('DOMContentLoaded', function() {
  fetchQuote();
});

function fetchQuote() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      var quoteTextElement = document.getElementById('quoteText');
      var quoteAuthorElement = document.getElementById('quoteAuthor');

      quoteTextElement.textContent = data.content;
      quoteAuthorElement.textContent = "- " + data.author;
    })
    .catch(error => {
      var quoteTextElement = document.getElementById('quoteText');
      quoteTextElement.textContent = "Failed to fetch quote.";
    });
}

 
