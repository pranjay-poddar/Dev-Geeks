const inputel=document.getElementById('input');
const infotextel= document.getElementById('info-text');
const meaningel= document.getElementById('meaning-container');
const titleel= document.getElementById('title');
const meaning= document.getElementById('meaningsp');
const audioel= document.getElementById('audio');


async function fetchAPI(word){

    try{

        infotextel.style.display='block';
        meaningel.style.display='none'
        infotextel.innerText=`Searching the meaning of "${word}"`
        const url= `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result= await fetch(url).then((res)=>res.json());


    if(result.title){
        meaningel.style.display='block';
        infotextel.style.display='none';
        titleel.innerText= word;
        meaning.innerText="N/A"
        audioel.style.display='none'
    }else{

        meaningel.style.display='block';
        infotextel.style.display='none';
        audioel.style.display='inline-flex'
        titleel.innerText= result[0].word;
        meaning.innerText=result[0].meanings[0].definitions[0].definition;
        if(result[0].phonetics[0].audio)
        {
        audioel.src= result[0].phonetics[0].audio;
        
        }
        else{
            audioel.style.display='none';
          
        }
    }
    }
    catch(error){
            console.log("kya bhai "+error+ " aagya");
            infotextel.innerText="An error occured"
    }
  
   
}



inputel.addEventListener('keyup',(e)=>{
   if(e.target.value && e.key==='Enter')
   {
    fetchAPI(e.target.value);
   }

})