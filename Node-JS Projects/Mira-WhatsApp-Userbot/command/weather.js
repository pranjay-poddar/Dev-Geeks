const axios = require('axios')

async function weather(sock,jid,msgkey){
	let city = 'Delhi';
    let country = 'India';
    var jid2 = jid;
    let minTemp;
    let maxTemp;
    let humidity;
    let pressure, clouds, wind

    await sock.sendMessage(jid2, {
    	delete: msgkey
   	});

   	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=994077381a8dc8b7f9525dc80c39f999&units=metric`;

   	try {
   		let response = await axios.get(url);
        let mainInfo = response.data.main;
        clouds = response.data.clouds.all
        wind = response.data.wind.speed
        minTemp = mainInfo.temp_min
        maxTemp = mainInfo.temp_max
        humidity = mainInfo.humidity
        pressure = mainInfo.pressure
    } catch (err) {console.log('Error at "./command/weather.js"', err)}

         let msg = await sock.sendMessage(
            jid2, {
               text: `*WEATHER FORCAST* \n\n*City:* ${city}\n*Country:* ${country}\n*Minimum Temp:* ${minTemp}°C\n*Maximum Temp:* ${maxTemp}°C\n*Pressure:* ${pressure}mb\n*Humidity:* ${humidity}%\n*Clouds:* ${clouds}%\n*Wind:* ${wind}km/h `
            })
}

module.exports = weather; 