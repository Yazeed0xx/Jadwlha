"use client"
import React from 'react'
import { GoogleMap, LoadScript, GoogleMapProps } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 24.7136, 
  lng: 46.6753, 
};
function Google() {
  const api = process.env.NEXT_PUBLIC_GOOGLE_MAP as string
  return (
    <>
      <LoadScript googleMapsApiKey={api}>
    <GoogleMap mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
    </GoogleMap>
  </LoadScript>
    
    </>
    )
}

export default Google