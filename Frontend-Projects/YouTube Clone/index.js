const menu = document.querySelector('#menu');
console.log(menu);
const sidebar = document.querySelector('.sidebar');
console.log(sidebar);

menu.addEventListener('click', function () 
  {sidebar.classList.toggle('show-sidebar');
});

 //for videos
 
/*let api_key = "AIzaSyDZvVfR2gbmv-JcQJTT-Yei7L9-gAK8nLI";
let video_http = "GET https://www.googleapis.com/youtube/v3/videos?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 1,
    regionCode: 'IN'
}))

.then(res => res.json())
.then(data => {
  console.log(data);
})*/

//search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
   if(searchInput.value.length){
     location.href = searchLink + searchInput.value;
     console.log(searchInput);
   }
})