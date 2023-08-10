const inputEL = document.getElementById("input");
const infotextEL = document.getElementById("info-text");
const meaningContainerEL =document.getElementById("meaning-container");
const titleEL = document.getElementById("title");
const meaningEL = document.getElementById("meaning");
const audioEL = document.getElementById("audio");

 async function fetchAPI(word){
    
try {
    infotextEL.style.display="block";
    meaningContainerEL.style.display="none";
    infotextEL.innerText = `Searching the meaning of ${word}`;
    const URL =`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(URL).then((res)=>res.json());


    if(result.title){
        meaningContainerEL.style.display="block";
        infotextEL.style.display="none";
        titleEL.innerText = word;
        meaningEL.innerText="N/A";
        audioEL.style.display="none";
    }else{
        infotextEL.style.display="none";
        meaningContainerEL.style.display="block";
        audioEL.style.display="inline-flex";
        titleEL.innerText = result[0].word;
        meaningEL.innerText=result[0].meanings[0].definitions[0].definition;
        audioEL.src=result[0].phonetics[0].audio;
    }

} catch (error) {
    console.log(error); 
    infotextEL.innerText="an error occured , try again later" 
}



}

inputEL.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key==="Enter"){
        fetchAPI(e.target.value);
    }
})