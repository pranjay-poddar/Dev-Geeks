const api_key = `e2f1c98f6dd6b3f365b5a895eb231980`;

async function getData() {
    let city = document.getElementById("city").value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    let res = await fetch(url);

    let data = await res.json();
    append(data);
    // console.log(data);
}

async function getData2(){
    let city = document.getElementById("city").value;


     url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${api_key}`

     let res2 = await fetch(url2);

     let data2 = await res2.json();



}

async function getData3(){
    let city = document.getElementById("city").value;


     url3 = `https://api.weatherapi.com/v1/forecast.json?key=0217941e66574da5b1e130028222705&q=${city}&days=10&`;

     let res3 = await fetch(url3);

     let data3 = await res3.json();

     console.log(data3.forecast.forecastday);
     append3(data3.forecast.forecastday);
     append4(data3.forecast.forecastday);

}

function append3(data3){
    let weekforcast=document.getElementById("weekforcast");

    weekforcast.innerHTML=null;
    data3.forEach(function(el){
        let card = document.createElement("div");
        let h3 = document.createElement("h3");
        h3.innerText =el.date;
        let type = document.createElement("h3");
        type.innerText =el.day.condition.text;
        let image = document.createElement("img");
        image.src=el.day.condition.icon;
        let maxt = document.createElement("h3");
        maxt.innerText = el.day.maxtemp_c ;
        let mint = document.createElement("h3");
        mint.innerText = el.day.mintemp_c;

        card.append(h3,type,image,maxt,mint);
        weekforcast.append(card);
    })

}


function append(data) {



    let card1=document.getElementById("card1")
    card1.innerHTML = null;
    let h3 = document.createElement("h3");
    h3.innerText = data.name;

    let p = document.createElement("p");
    p.innerText = `Current Temp : ${data.main.temp}`;

    let p1 = document.createElement("p");
    p1.innerText = `Max temp : ${data.main.temp_max}`;

    let p2 = document.createElement("p");
    p2.innerText = `Min temp : ${data.main.temp_min}`

    card1.append(h3, p, p1, p2);


    let iframe = document.getElementById("gmap_canvas");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}



function append4(_data4){




        let card2 = document.getElementById("card2");
        card2.innerHTML = null;
        let h2=document.createElement("h2")
        h2.innerText= "Today"
        let h3 = document.createElement("h3");
        h3.innerText =_data4[0].date;
        let image = document.createElement("img");
        image.src=_data4[0].day.condition.icon;
        let maxt = document.createElement("h3");
        maxt.innerText = _data4[0].day.maxtemp_c;
        let mint = document.createElement("h3");
        mint.innerText = _data4[0].day.mintemp_c;

        card2.append(h2,image,h3,maxt,mint);



}