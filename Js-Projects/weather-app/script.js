const apikey="3c865c366a5470166aea5e2ccc871e8c";

const weatherDataE1= document.getElementById("weatherdata");

const cityInputEl= document.getElementById("cityinput");

const formE1=document.querySelector("form")

formE1.addEventListener("submit",(event)=>{
    event.preventDefault(); 
    const cityValue=cityInputEl.value;
    getweatherdata(cityValue);
});

async function getweatherdata(cityValue){
    try {
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if(!response.ok)
        {
            throw new Error("Network response was not ok")
        }
        const data= await response.json()
        console.log(data);
       
        const temperature=Math.round(data.main.temp)

        const description=data.weather[0].description

        const icon=data.weather[0].icon

        const details=[
            `Feels like : ${Math.round(data.main.feels_like)}°C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind speed : ${data.wind.speed} m/s`,
        ]

        weatherDataE1.querySelector(".icon").innerHTML= `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

        weatherDataE1.querySelector(".temperature").textContent = `${temperature}°C`;
        
        weatherDataE1.querySelector(".description").textContent = `${description}`
        weatherDataE1.querySelector(".details").innerHTML =details.map((details)=>
            `<div>${details}</div>`
        ).join("");


    } catch (error) {
        weatherDataE1.querySelector(".icon").innerHTML= "";

        weatherDataE1.querySelector(".temperature").textContent = "";
        
        weatherDataE1.querySelector(".description").textContent = "An Error happened ,please try again later!";
        weatherDataE1.querySelector(".details").innerHTML ="";
    }
}