
import React, { useState } from 'react';
import './Card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTint,faSun,faMoon} from '@fortawesome/free-solid-svg-icons';


function Weather_Card() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const FetchClick = async () => {
    
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/weather/${query}/`);
    const data = await response.json();
    if (data.cod === '404') {
      setErrorMessage(data.message);
      setWeatherData(null);
    } else {
      setWeatherData(data);
      setErrorMessage('');
    }
  } catch (error) {
    console.error(error);
    setErrorMessage('An error occurred while fetching the weather data.');
    setWeatherData(null);
  }
};
    


  const Submit = (event) => {
    event.preventDefault();
    FetchClick();
  };

  return (
    
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <h1 className="card-title mb-4 text-center">All Weather</h1>
              <form onSubmit={Submit}>
                <div className="mb-3">
                  <label htmlFor="cityInput" className="form-label">Enter City Name:</label>
                  <input type="text" className="form-control" id="cityInput" value={query} onChange={(event) => setQuery(event.target.value)} />
                </div>
                <Button variant="primary" type="submit">Fetch Weather</Button>
              </form>
              
            </Card.Body>
          </Card>
        </div>
      </div>
      {errorMessage && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <p className="text-danger">{errorMessage}</p>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}

      {weatherData && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h2 className="card-title">{weatherData.name}</h2>
                <p className="card-text mb-2"><FontAwesomeIcon icon="fa-solid fa-temperature-low" />Temperature: {weatherData.main.temp}°C</p>
                <p className="card-text mb-2"><FontAwesomeIcon icon="fa-solid fa-sparkles" />Weather: {weatherData.weather[0].description}</p>
                <p className="card-text mb-4"><FontAwesomeIcon icon={faWind} /> Wind Speed: {weatherData.wind.speed} km/h</p>
                <p className="card-text mb-4"><FontAwesomeIcon icon={faTint} /> Humidity: {weatherData.main.humidity}%</p>
                
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
     
    </div>
    
  );
}

export default Weather_Card;
