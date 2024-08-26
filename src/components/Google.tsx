import React from 'react'
import { GoogleMap, LoadScript, GoogleMapProps } from '@react-google-maps/api';


function Google() {
  return (
    <LoadScript googleMapsApiKey="">
    <GoogleMap
    zoom={10}
    >
    </GoogleMap>
  </LoadScript>  )
}

export default Google