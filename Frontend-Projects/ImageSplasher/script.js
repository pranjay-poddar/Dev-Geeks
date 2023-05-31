const accessKey = "ZSCxsOhjfxzNhuHdbMeI_Gj5R9Bnwi86jsfoJDPsTyw";

const formEl = document.querySelector('form');
const formInputEl = document.getElementById('search-input');
const searchResults = document.querySelector('.card-container');
const showMore = document.getElementById('show-more-button');

let inputData = "";
let pageNo = 1;

async function searchImages(){
    inputData = formInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(pageNo === 1){
        searchResults.innerHTML = "";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('card');
        
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        const imgContent = document.createElement('p');
        imgContent.classList.add('card-caption');
        imgContent.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imgContent);
        searchResults.appendChild(imageWrapper);
    })

    pageNo++;

    if(pageNo > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    pageNo = 1;
    searchImages();
})

showMore.addEventListener("click",(event)=>{
    searchImages();
})


// adding dark mode functionality

const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const link = document.querySelector('footer a');
const btnMain = document.querySelector('.searchbtn');
const card = document.querySelectorAll('.card');

toggle.addEventListener("click",function(){
    this.classList.toggle('bi-moon-fill');

    if(this.classList.toggle('bi-brightness-high-fill')){
        this.style.color = "black";
        body.style.backgroundColor = "white";
        body.style.color = "black";
        body.style.transition = ".2s ease-in-out";
        btnMain.style.backgroundColor = "";
        btnMain.style.color = "";
        btnMain.style.boxShadow = "";
        showMore.style.backgroundColor = "";
        showMore.style.color = "";
        showMore.style.boxShadow = "";
        link.style.color = "rgb(29, 60, 126)";
        formInputEl.style.color = "black";
        formInputEl.style.boxShadow = "0 0 6px rgba(0,0,0,0.2)";
        formInputEl.style.backgroundColor = "white";
        for(var i=0;i<card.length;i++){
            card[i].style.boxShadow = "";
        }
    }else{
        this.style.color = "white";
        body.style.backgroundColor = "black";
        body.style.color = "white";
        body.style.transition = ".2s ease-in-out";
        btnMain.style.backgroundColor = "skyblue";
        btnMain.style.color = "black";
        btnMain.style.boxShadow = "0 0 6px rgb(82, 167, 237,0.944)";
        showMore.style.backgroundColor = "skyblue";
        showMore.style.color = "black";
        showMore.style.boxShadow = "0 0 6px rgb(82, 167, 237,0.944)";
        link.style.color = "lime";
        formInputEl.style.color = "white";
        formInputEl.style.boxShadow = "0 0 6px rgb(82, 167, 237,0.944)";
        formInputEl.style.backgroundColor = "black";
        for(var i=0;i<card.length;i++){
            card[i].style.boxShadow = "0 0 6px rgb(82, 167, 237,0.944)";
        }
    }
})