
const currentDetails="https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}";
const currTime = document.querySelector('#time');
const ampm  = document.getElementById('#ampm');
const searchBar=document.querySelector('#searchbar');
const humid = document.getElementById('humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const pressure = document.getElementById('pressure');
const speed = document.getElementById('speed');
const temperature = document.getElementById('temperature');
const feelsLike=document.getElementById('feels-like');
const loc=document.querySelector('#location span');
const icon=document.getElementById('icon');
const weather=document.getElementById('weather');
const dtInfo = document.getElementById('dtInfo');
const stat = document.getElementById('stat');
var limit=5;
var APIkey='bf8d15a80c89aa4f4c82ad6cbb3f5ac5';
updateDetails(55.5,-0.11);
navigator.geolocation.getCurrentPosition((position)=>{
    var lat=position.coords.latitude;
    var lon=position.coords.longitude;
 updateDetails(lat,lon);
});

async function getCoords(cityName){
  const limit=5;  
  const pos = {latitude:55.5, longitude:-0.11};
  const api_url=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIkey}`
  await fetch(api_url).then(res=>res.json()).then(data=>{
   pos.latitude=data[0].lat;
   pos.longitude=data[0].lon;
    })
    .catch((error)=>{alert("City Not found !");});
return pos;
}
document.getElementById('button-addon2').addEventListener('click',()=>{
    var coords=getCoords(input_text.value);
    getCoords(input_text.value).then((data)=>{
    lat=data.latitude;
    lon=data.longitude;
    updateDetails(lat,lon);
    });
});
async function updateDetails(lat,lon){
    
   const aqi=`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIkey}`;
     
   const weatherAPI=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;
   const geoAPI=`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${APIkey}`;
   await fetch(aqi).then(res=>res.json()).then(data =>{
      console.log(data);
   });
   await fetch(geoAPI).then(res=>res.json()).then(data =>{
      console.log(data);
      let city=data[0].name;
    loc.innerHTML=`${city}, ${data[0].country}`;
   })
   .catch((err)=>{
      console.log(`geoAPI called`);
   });
    await fetch(weatherAPI).then(res=>res.json()).then(data=>{
      console.log(data);
      icon.src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
      dt.innerText=new Date(new Date(1000*data.current.dt + data.timezone_offset*1000).getTime()).toUTCString().slice(0,22);
      stat.innerText=data.current.weather[0].main;
      humid.innerText=data.current.humidity+" %";
      temperature.innerText=Number(data.current.temp - 273.15).toFixed(0)+" \u00B0"+"c";
      feelsLike.innerText=Number(data.current.feels_like - 273.15).toFixed(1);
      pressure.innerText=data.current.pressure + " mbar";
      speed.innerText=data.current.wind_speed + " km/h";
      sunset.innerText=new Date(new Date(1000*data.current.sunset + data.timezone_offset*1000).getTime()).toUTCString().slice(16,22);
      sunrise.innerText=new Date(new Date(1000*data.current.sunrise + data.timezone_offset*1000).getTime()).toUTCString().slice(16,22);
      for (let index = 0; index < 7; index++) {
         let head=document.getElementById(`${index}`).getElementsByTagName("h2")[0];
         let weatherIcon=document.getElementById(`${index}`).getElementsByTagName("img")[0];
         let max=document.getElementById(`${index}`).getElementsByTagName("td")[0];
         let min=document.getElementById(`${index}`).getElementsByTagName("td")[1];

         weatherIcon.src=`http://openweathermap.org/img/wn/${data.daily[`${index}`].weather[0].icon}@2x.png`;
         head.innerHTML=new Date(new Date(1000*data.daily[index].dt + data.timezone_offset*1000).getTime()).toUTCString().slice(0,11);
         max.innerHTML=(data.daily[index].temp.max -273.15).toFixed(1);
         min.innerHTML=(data.daily[index].temp.min -273.15).toFixed(1);
        
      }
   });  
}
//github.com/ManishMadan2882