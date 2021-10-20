import React, { useEffect, useState} from 'react'
import { getCountriesAsync, selectCountry } from '../../redux/countrySlice';
import { useSelector, useDispatch } from 'react-redux';
import Details from './details';
import { getAllDetailsByCountryAsync } from '../../redux/DetailsSlice';
import { Doughnut } from 'react-chartjs-2';

function Covidtracker() {
  const dispatch = useDispatch();
  const [isRed, setRed] = useState(false);
  const Increament = () => {
    // setCount(count + 1);
    // setRed(!isRed);
  }

  useEffect(() => {
    dispatch(getCountriesAsync());
  }, [dispatch]);

  const countries = useSelector((state) => state.countries.countries);
  const status = useSelector((state) => state.countries.loadingStatus);
  const confirmed = useSelector((state) => state.allDetails.confirmed);
  const recovered = useSelector((state) => state.allDetails.recovered);
  const deaths = useSelector((state) => state.allDetails.deaths);
  const lastUpdate = useSelector((state) => state.allDetails.lastUpdate);

  const styles = {
    container: {
      width: "40%",
      height: "40%",
    }
  };
  const options = {
    legend: {
      display: false,
      position: "right"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'data',
        data: [confirmed, recovered, deaths],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
        maintainAspectRatio: false,
      },
    ],
  };
  return (
    <>
      <div className='container text-center bg-white p-4 mt-5'>
        <div>
          <h1>Covid Tracker</h1>
          {
            status === "failed" ? <p>Failed to load countries</p> :
              (
                status === "pending" ? <p>loading countries</p> :
                  <select
                    onChange={(e) => dispatch(getAllDetailsByCountryAsync({ selectedCountry: e.target.value }))}>
                    {countries.map((country) => <option key={country.name} value={country.iso3}>{country.name}</option>)}
                  </select>
              )
          }
        </div>

        <Details confirmed={confirmed} recovered={recovered} deaths={deaths} />
        <p>Data Fetached At : {(new Date(lastUpdate)).toString()}</p>
        <div style={styles.container}>
          <Doughnut data={data} options={options} />
        </div>
      </div>

    </>
  )
}

export default Covidtracker
