const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3d4cc75291mshe588dd0099be175p1e74e4jsnfe5521ee4cfe',
        'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
    }
};

const getMeaning = (word) => {
    if(word!=""){
        fetch(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`, options)
        .then(response => response.json())
        .then(response => {
            if (response.valid === true) {
                temp = response.word
                temp = word[0].toUpperCase() + word.slice(1,)
                definition.innerHTML = response.definition
                wordSearch.innerHTML = temp
            }
            else {
                str = `<div class="alert alert-warning alert-dismissible fade show position-absolute" style="width: 100%;top:9vh"
                role="alert">
                <strong>Warning ! </strong> Please enter a valid word
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
            warning.innerHTML = str
            }

        })
        .catch(err => console.error(err));
    }
    else{
            str = `<div class="alert alert-warning alert-dismissible fade show position-absolute" style="width: 100%;top:9vh"
            role="alert">
            <strong>Warning ! </strong> Input can't be empty
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
        warning.innerHTML = str
        }
    
}


submit.addEventListener("click", (e) => {
    e.preventDefault()
    getMeaning(wordInput.value)
})


getMeaning("good")
