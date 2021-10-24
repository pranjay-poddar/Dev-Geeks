import Map from './components/Maps'
import { useState, useEffect } from 'react';
import Loader from './components/Loader'
import Header from './components/header';

function App() {
  const [nasa, setNasa] = useState([])
  const [loding, setLoading] = useState(false)
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true)
      const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v3/events');
      const { events } = await res.json();

      setNasa(events);
      setLoading(false);
    }

    getEvents();

  }, [])



  return (
    <div>
      <Header />
      {!loding ? <Map nasa={nasa} /> : <Loader />}
    </div>
  );
}

export default App;
