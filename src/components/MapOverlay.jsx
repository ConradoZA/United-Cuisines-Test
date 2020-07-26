import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "./Map";

export const MapOverlay = ({
  distance,
  question,
  result,
  onMapClick,
  display,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Map
        className="map"
        onMapClick={onMapClick}
        question={{ lat: question.lat, lng: question.lng }}
        result={result}
        display={display}
      />
    </div>
  );
};
