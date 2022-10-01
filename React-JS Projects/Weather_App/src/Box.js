import { useEffect, useState } from "react";

export default function Box() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("delhi");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=59199ea1ee5add427df6009cca20140e`;
      const response = await fetch(url);

      const resJson = await response.json();

      setCity(resJson.main);
      console.log(resJson);
    };
    fetchApi();
  }, [search]);

  return (
    <div>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputFeild"
            placeholder="Enter City Name"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {!city ? (
          <p>No Data Found</p>
        ) : (
          <>
            <div className="info">
              <h2 className="location">
                <i class="fas fa-street-view">{search}</i>
              </h2>
              <hr/>
              <div className="details">
              <h2 >Temperature:<span className="temp"> {city.temp}°C</span></h2><hr/>
              <h2>humidity: <span className="temp"> {city.humidity}</span></h2><hr/>
              <h2>Pressure:<span className="temp"> {city.pressure}</span> </h2><hr/>
              <h6> Min-Temp:{city.temp_min}°C  <br/>Max-Temp: {city.temp_max}°C  </h6><hr/>
              </div>
             
             
            </div>
           
          </>
        )}
      </div>
    </div>
  );
}