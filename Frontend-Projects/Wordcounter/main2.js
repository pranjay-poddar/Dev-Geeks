     //Display Values
    const timename = document.querySelector('.titletime');
    const time = document.querySelector('.title30');
    const cwname = document.querySelector('.titlecw');
    const cw = document.querySelector('.title0');
    const rwords = document.querySelector('.random'); 

    //Inputs
    const restart = document.querySelector('.rebtn');
    const input = document.querySelector('.input-text');

    var wordNo = 1;
    var flag = 1;
    var timer = 30;
    var seconds;
    var correctwords = 0;
    var wordsdone = 0;

    displayTest();

    input.addEventListener('input', function (event) {
        if(flag===1){
            flag = 0;
            timestart();
        }
        var charinput = event.data;
        if(/\s/g.test(charinput)){
            checkword();
        }
        else{
            currentword();
        }
    });


    //re button

    restart.addEventListener('click', () => {
        wordsdone = 0;
        correctwords = 0;
        flag = 1;
        time.classList.remove("current");
        cw.classList.remove("current");
        time.innerText = timer;
        timename.innerText = "Time";
        cw.innerText = correctwords;
        cwname.innerText = "CW";

        input.disabled = false;
        input.value = '';
        input.focus();

        displayTest();
        clearInterval(seconds);
        let timing = 30;
        time.innerHTML = timing;
    });


    // countdown

    function timestart(){
        let timing = 30;
        seconds = setInterval(function() {
        timing--;
        time.innerHTML = timing;
        if (timing == 0) {
            timeover();
            clearInterval(seconds);
        }
        }, 1000);
    }

    function timeover() {
        input.disabled = true;
        restart.focus();
        displayscore();
    }

    function displayscore() {
        let accuracy = 0;
        if(wordsdone!==0){
            accuracy = Math.floor((correctwords/wordsdone)*100);
        }

        time.classList.add("current");
        cw.classList.add("current");

        time.innerText = accuracy+"%";
        timename.innerText = "Accuracy";

        cw.innerText = 2*correctwords;
        cwname.innerText = "WPM";
    }



    function currentword(){
        const wordEntered = input.value;
        const currentID = "word "+wordNo;
        const currentSpan = document.getElementById(currentID);
        const curSpanWord = currentSpan.innerText;
    
        if(wordEntered == curSpanWord.substring(0,wordEntered.length)){
        colorSpan(currentID, 2);
        }
        else{
        colorSpan(currentID, 3);
        }
    
    }
    //checks word entered
    function checkword(){
        const wordEntered = input.value;
        input.value='';
    
        const wordID = "word "+wordNo;
        const checkSpan = document.getElementById(wordID);
        wordNo++;
        wordsdone++;
    
        if(checkSpan.innerText === wordEntered){
        colorSpan(wordID, 1);
        correctwords++;
        cw.innerText=correctwords;
        }
        else{
        colorSpan(wordID, 3);
        }
    
        if(wordNo>40){
    
        displayTest();
        }
        else{
        const nextID = "word "+wordNo;
        colorSpan(nextID, 2);
        }
    }

    function colorSpan(id, color){
        const span = document.getElementById(id);
        if(color === 1 ){
        span.classList.remove('wrongword');
        span.classList.remove('current');
        span.classList.add('correctword');
        }
        else if(color ===2){
        span.classList.remove('correctword');
        span.classList.remove('wrongword');
        span.classList.add('current');
        }
        else{
        span.classList.remove('correctword');
        span.classList.remove('current');
        span.classList.add('wrongword');
        }
    }


    //display the random words on screen
    function displayTest(){
        rwords.innerHTML = '';
    
        let newTest = randomWords();
        newTest.forEach(function(word, i){
        let wordSpan = document.createElement('span');
        wordSpan.innerText = word;
        wordSpan.setAttribute("id", "word " + (i+1));
        rwords.appendChild(wordSpan);
        });
    
        const nextID = "word "+wordNo;
        colorSpan(nextID, 2);
    }
    
    //Generate an array of random 50 words
    function randomWords(){
        wordNo = 1;
        var basicWords = ["a", "about", "above", "across", "act",  "add", "afraid",
        "after", "again", "age", "ago", "agree", "air", "all", "alone", "along",
        "always", "am", "amount", "an", "and", "angry", "another", "answer", "any",
        "anyone",  "appear", "apple", "are", "area", "arm", "army", "around",
            "arrive", "art", "as", "ask", "at", "aunt",  "away", "baby", "back", 
            "bad", "bag", "ball", "bank", "base",  "bath", "be", "bean", "bear", 
            "bed", "beer", "before", "begin", "bell", "below", "best", "big", 
            "bird", "birth",  "bit", "bite", "black", "bleed", "block", "blood", 
            "blow", "blue", "board", "boat", "body", "boil", "bone", "book", 
            "border", "born", "both",  "bowl", "box", "boy", "branch", "brave"];
    
    
        var selectedWords = [];
        for(var i=0;i<40;i++){
        var randomNumber = Math.floor(Math.random()*basicWords.length);
        selectedWords.push(basicWords[randomNumber]+" ");
        }
        return selectedWords;
    }
    