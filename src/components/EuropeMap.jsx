// @ts-ignore
import React, { useState, useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import mapStyles from "../data/mapStyles";

export const EuropeMap = () => {
  const [map, setMap] = useState(null);
  const [result, setResult] = useState({});
  const mapRef = useRef();

  const EUROPE_BOUNDS = {
    latLngBounds: {
      north: 71.245198,
      south: 35.803751,
      west: -10.754858,
      east: 31.67442,
    },
    strictBounds: false,
  };
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);
  const onClick = (event) => {
    setResult({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    console.log(result);
  };

  const containerStyle = {
    width: "100vmin",
    height: "100vmin",
  };

  const center = {
    lat: 57.2402108,
    lng: 14.7150791,
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "cooperative",
    restriction: EUROPE_BOUNDS,
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={1}
      center={center}
      options={options}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
    />
  );
};
