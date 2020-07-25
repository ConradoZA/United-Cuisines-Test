import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { EuropeMap } from "./components/EuropeMap";
import * as capitalCities from "./data/capitalCities.json";
import { haversineDistance, randomCity } from "./data/functions";

export const Map = () => {
  const [result, setResult] = useState({});
  const [question, setQuestion] = useState({});
  const [distance, setDistance] = useState(null);
  const city = capitalCities.capitalCities;
  const totalCities = city.length;
  const setRandomCity = () => {
    const capital = city[randomCity(totalCities)];
    console.log(capital);
    return { name: capital.capitalCity, lat: capital.lat, lng: capital.long };
  };

  useEffect(() => {
    setQuestion(setRandomCity);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  const onClick = (event) => {
    setResult({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setDistance(
      haversineDistance(
        { lat: question.lat, lng: question.lng },
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        }
      )
    );
  };
  console.log(distance);
  return (
    <div className="map">
      <EuropeMap
        onClick={onClick}
        question={{ lat: question.lat, lng: question.lng }}
        result={result}
      />
    </div>
  );
};
