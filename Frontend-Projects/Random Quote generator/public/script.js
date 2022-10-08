const quoteCantainer= document.getElementById('quote-container');
const quotetext= document.getElementById('quote');
const authortext= document.getElementById('author');
const twitterbtn= document.getElementById('twitter');
const newquotebtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');



// get qoute api
let apiquote=[];  // let is used because un beginning we don't know the length of the array and changing later 

// show loading
function loading(){
    loader.hidden=false;
    quoteCantainer.hidden=true;
}


function hideloading(){
    loader.hidden=true;
    quoteCantainer.hidden=false;
}


// show new quote 

function newquote(){
    loading();
    const quote=apiquote[Math.floor(Math.random()*apiquote.length)];
    // console.log(quote.text);
   
    // check if author is null
    if(!quote.author){
        authortext.textContent='Anonymous';
    }
    else{
        authortext.textContent=quote.author;
    }

    // check quote length to determine styling
    if(quote.text.length>50){
        quotetext.classList.add('long-quote');
    }
    else{
        quotetext.classList.remove('long-quote');
    }
    
    // set quote, hide loader
    quotetext.textContent=quote.text;
    hideloading();



}






async function getquote(){
    loading();
    
    const apiurl='https://type.fit/api/quotes';
    try{
        const response= await fetch(apiurl);  // const response will not be populated until the fetch is completed
        apiquote= await response.json();  // gloabl var mean we are getting json then we are converting in json obj and storing in apiquote
        // console.log(apiquote);
        newquote();

    } catch(error){
      // catch error
    }
}








// tweet quote
function tweetquote(){
    const twitterurl=`https://twitter.com/intent/tweet?text=${quotetext.textContent} - ${authortext.textContent}`;
    window.open(twitterurl,'_blank');
}

// event listener
newquotebtn.addEventListener('click',newquote);
twitterbtn.addEventListener('click',tweetquote);
getquote();
