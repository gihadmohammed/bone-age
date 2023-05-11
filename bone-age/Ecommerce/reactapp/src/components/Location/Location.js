import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import axios from 'axios';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function Location() {
  const mapRef = useRef(null);

  useEffect(() => {
    // create the map instance
    const map = L.map(mapRef.current);

    // define custom icon for location marker
    const locationIcon = L.icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIconRetina,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // set the map center to the user's location
        map.setView([position.coords.latitude, position.coords.longitude], 13);

        // add a marker at the user's location with custom icon
        L.marker(
          [position.coords.latitude, position.coords.longitude],
          { icon: locationIcon }
        ).addTo(map);
      },
      (error) => {
        console.error(error);
        // set the map center to a default location
        map.setView([51.505, -0.09], 13);
      }
    );

    // add the OSM tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
  }, []);

  const handleSaveLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        axios.post('http://localhost:8000/Authentication/save-location/', data)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div>
      <div ref={mapRef} style={{ height: '400px' }} />
      <button onClick={handleSaveLocation} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Save Location</button>
    </div>
  );
}

export default Location;
