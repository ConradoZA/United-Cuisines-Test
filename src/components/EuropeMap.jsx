import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from "../data/mapStyles";

export const EuropeMap = (props) => {
  const question = props.question;
  const result = props.result;
  const onClick = props.onClick;
  const [map, setMap] = useState(null);
  const mapRef = useRef();

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

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

  // const CENTER = {
  //   lat: 57.2402108,
  //   lng: 14.7150791,
  // };

  const CENTER = {
    lat: 50.110882,
    lng: 8.67949,
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
      center={CENTER}
      options={OPTIONS}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
    >
      {Object.keys(result).length > 0 && (
        <>
          <Marker
            position={{ lat: +question.lat, lng: +question.lng }}
            icon={{
              url: `/gps.svg`,
              scaledSize: new window.google.maps.Size(20, 20),
            }}
          />
          <Marker
            position={{ lat: result.lat, lng: result.lng }}
            icon={{
              url: `/location-pin.svg`,
              scaledSize: new window.google.maps.Size(20, 30),
            }}
          />
        </>
      )}
    </GoogleMap>
  );
};
