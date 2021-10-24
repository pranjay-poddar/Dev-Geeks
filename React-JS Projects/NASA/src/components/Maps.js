import { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker';
//import { Nasaprovider } from './datacontext';
import InfoBox from './InfoBox';
const Map = ({ nasa, center, zoom }) => {
    const [locationinfo, setLocation] = useState(null);
    const markers =
        nasa.map((event) => {
            //console.log("Helo");
            const str1 = "wildfires"
            if (!str1.localeCompare(event.categories[0].id)) {

                return <LocationMarker lat={event.geometry[0].coordinates[1]} lng={event.geometry[0].coordinates[0]} onClick={() => setLocation({ id: event.id, title: event.title })} />
            }
           
            return null

        })

    return (
        <div className="map" >
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyDPy6H0Gb9fSQQpDXABQ5hjiCuqo89PgeI' }} defaultCenter={center} defaultZoom={zoom}>
                {markers}
            </GoogleMapReact>
            {locationinfo && <InfoBox info={locationinfo} />}
        </div>

    );

}
Map.defaultProps = {

    center: {
        lat: 42.3265,
        lng: -122.8756

    },
    zoom: 6

}

export default Map


