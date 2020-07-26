import React, { useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from "../data/mapStyles";

export const Map = ({ question, result, onMapClick, display }) => {
  const mapRef = useRef();

  const EUROPE_CENTER = {
    lat: 50.110882,
    lng: 8.67949,
  };

  const panTo = (coordinates) => {
    mapRef.current.panTo(coordinates);
  };
  const setZoom = (number) => {
    mapRef.current.setZoom(number);
  };

  const onLoad = (map) => {
    mapRef.current = map;
    panTo(EUROPE_CENTER);
  };

  const onClick = (event) => {
    const coordinates = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    panTo(coordinates);
    setZoom(5);
    onMapClick(coordinates);
  };

  const CONTAINER_STYLE = {
    width: "100vmin",
    height: "100vmin",
  };

  const EUROPE_BOUNDS = {
    latLngBounds: {
      north: 71.245198,
      south: 35.803751,
      west: -10.754858,
      east: 31.67442,
    },
    strictBounds: false,
  };

  const OPTIONS = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "cooperative",
    restriction: EUROPE_BOUNDS,
  };

  return (
    <GoogleMap
      mapContainerStyle={CONTAINER_STYLE}
      zoom={1.5}
      options={OPTIONS}
      onLoad={onLoad}
      onClick={onClick}
    >
      {display && (
        <Marker
          position={{ lat: +question.lat, lng: +question.lng }}
          icon={{
            url: `/gps.svg`,
            scaledSize: new window.google.maps.Size(20, 20),
            style: { display: display },
          }}
        />
      )}
      {Object.keys(result).length > 0 && (
        <Marker
          position={{ lat: result.lat, lng: result.lng }}
          icon={{
            url: `/location-pin.svg`,
            scaledSize: new window.google.maps.Size(20, 30),
          }}
        />
      )}
    </GoogleMap>
  );
};
