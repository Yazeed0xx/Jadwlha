import React from 'react'
import { GoogleMap, LoadScript, GoogleMapProps } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 24.7136, // Latitude for Riyadh
  lng: 46.6753, // Longitude for Riyadh
};
function Google() {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {/* Add your markers or other components here */}
    </GoogleMap>
  </LoadScript>  )
}

export default Google