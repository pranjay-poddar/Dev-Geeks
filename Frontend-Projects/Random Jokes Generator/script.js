const btnele= document.getElementById('btn');
const pele=document.getElementById('joke')

const api_key="M0Vccm9ZQ5uOzEvm54FaZw==crUuS8lX9HaGaoCa";
const option={
    method:"GET",
    headers:{
        "X-Api-Key":api_key,
    },
};
const apiurl="https://api.api-ninjas.com/v1/jokes?limit=1"


btnele.addEventListener('click',getjoke);

async function getjoke(){


    try {
        
        pele.innerText="Updating...";
    btnele.disabled= true;
    btnele.innerText="Loading";
    const res= await fetch(apiurl,option);
    const data=await res.json();
    // console.log(data[0].joke);

   
    btnele.disabled= false;
    btnele.innerText="TELL ME A JOKE";

    pele.innerText=data[0].joke;

    } catch (error) {
        pele.innerText="An error occured ,try again later!";
        btnele.disabled= false;
        btnele.innerText="TELL ME A JOKE";
        console.log(error);
    }
    


    
}