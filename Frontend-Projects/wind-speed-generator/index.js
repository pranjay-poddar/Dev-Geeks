
const api_key = "f3d3c34186abaa6978c179072ba30d13";
const sky = document.getElementById("sky");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const submit = document.getElementById("submit");
const cityname = document.getElementById("cityname");
const city = document.getElementById("city");

const getdata = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&appid=${api_key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.cod == '404') {
                alert("CITY NOT FOUND-----PLEASE ENTER A VALID CITY")
            }
            wind.innerHTML = `${data.wind.speed}`
            var c = Math.round(data.main.temp - 273);
            temp.innerHTML = `${c}`
            sky.innerHTML = `${data.weather[0].main}`

        })
}

submit.addEventListener("click", function () {
    console.log(cityname.value);
    city.innerHTML = `${cityname.value} `;
    //  const res11=document.getElementById("res11");

    getdata();


});


const video = document.getElementById("video");
const click_me = document.getElementById("clickme");
const h2 = document.getElementById("h2");
var p = 0;

click_me.addEventListener("click", function () {

    if (p == 0) {
        video.src = "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761";
        p++;
    }
    else if (p == 1) {
        video.src = "https://player.vimeo.com/external/269971860.sd.mp4?s=a3036bd1a9f15c1b31daedad98c06a3b24cdd747&profile_id=164&oauth2_token_id=57447761";
        p++;
    }
    else if (p == 2) {
        video.src = "https://player.vimeo.com/external/310391783.sd.mp4?s=025f42173408ce727dbd8878bdf5f5e0959b72a4&profile_id=164&oauth2_token_id=57447761";
        p++;
    }
    else if (p == 3) {
        video.src = "https://player.vimeo.com/external/372806824.sd.mp4?s=4bcb4b5585216f01bd21919c21a4dd1f989dfdc6&profile_id=164&oauth2_token_id=57447761";
        p++;
    }

    else {
        p = 0;
    }
});