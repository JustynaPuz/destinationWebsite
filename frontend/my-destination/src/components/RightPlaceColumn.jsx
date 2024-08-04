import React,  { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/RightCountryColumn.css';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center, map]);
    return null;
  };


const RightPlaceColumn = ({ place }) => {
  const position = [place.latitude, place.longitude]; 

  console.log("Image url", place.imageUrl)
  const imageUrl = `http://localhost:8080${place.imageUrl}`;


  return (
    <div className = "countries-container-right">
         <div className="right-country-column">

         <img src={imageUrl} alt={`${place.name}`} className="place-image" />
    
      <div className="country-map">
        <h2>Place Location</h2>
        {place.latitude && place.longitude && (
          <MapContainer center={position} zoom={6} style={{ height: '400px', width: '100%' }}>
            <MapUpdater center={position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                {place.name}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>

    </div>
   
  );
};

export default RightPlaceColumn;
