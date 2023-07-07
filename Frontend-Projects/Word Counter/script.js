var input = document.querySelector("#word-count-input"); 
var total_word = document.querySelector("#word-count");  
var total_character = document.querySelector("#character-count");
var alphabets = document.querySelector('#alphabets');
var white_space =  document.querySelector('#white-space');
var number = document.querySelector('#numbers');
var special_character = document.querySelector('#special-character');
window.addEventListener(  
    "input",  
    function (event) {  
     if (event.target.matches("#word-count-input")) { 
      count();  
     }  
    },  
    false  
); 
const reset = () => {
    document.getElementById("word-count").innerHTML="0";
    document.getElementById("character-count").innerHTML="0";
    document.getElementById("alphabets").innerHTML="0";
    document.getElementById("white-space").innerHTML="0";
    document.getElementById("numbers").innerHTML="0";
    document.getElementById("special-character").innerHTML="0";
    var textbox=document.getElementById("word-count-input");
     textbox.value="";
}
function count(){

    let text = input.value;

    //Count Total words
    var TotalWords = text.split(/[\n\r\s]+/g).filter(function (word) {  
        return word.length > 0;  
    });
    total_word.innerHTML = TotalWords.length;

    //Count Total Characters
    let TotalCharacter = text.length;
    total_character.innerHTML = TotalCharacter;

    //Count Alphabets
    // here /g means Global, and causes the replace call to replace all matches(every occurence),
    let text_Without_Whitespace = text.replace(/\s+/g, ""); // here \s matches with each whitespace replace with no space(remove it)
    let Alphabets_Without_Numbers = text_Without_Whitespace.replace(/[0-9]/g, "");
    let Alphabets_Without_Punctuation = Alphabets_Without_Numbers.replace(/[|\\+@<>'"?.,\/#!$%\^&\*;:{}\[\]=\-_`~()]/g, "");

    alphabets.innerHTML = Alphabets_Without_Punctuation.length;

    //Count Numbers
    let Number = text.replace(/[^\d]/g, '');  // here /d matches any single number - here replace all characters except number[^]
    number.innerHTML = Number.length;

    //Count White-Space
    let WhiteSpace = text.replace(/[a-zA-Z0-9|\\+@<>'"?.,\/#!$%\^&\*;:{}\[\]=\-_`~()]/g, '');
    white_space.innerHTML = WhiteSpace.length;

    //Count Special Characters
    let SpecialCharacter = text_Without_Whitespace.replace(/[a-zA-Z0-9]/g, '');
    special_character.innerHTML = SpecialCharacter.length;

    // Changing Colours
    if(TotalWords.length > 0){
        total_word.style.color = 'red';  
    }
    else{
        total_word.style.color = 'black';  
    }

    if(TotalCharacter > 0){
        total_character.style.color = 'red';
    }
    else{
        total_character.style.color = 'black';
    }

    if(Alphabets_Without_Punctuation.length > 0){
        alphabets.style.color = 'red';
    }
    else{
        alphabets.style.color = 'black';
    }

    if(Number.length > 0){
        number.style.color = 'red';
    }
    else{
        number.style.color = 'black';
    }

    if(WhiteSpace.length > 0){
        white_space.style.color = 'red';
    }
    else{
        white_space.style.color = 'black';
    }

    if(SpecialCharacter.length > 0){
        special_character.style.color = 'red';
    }
    else{
        special_character.style.color = 'black';
    }
}
