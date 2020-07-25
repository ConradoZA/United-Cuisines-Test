import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { EuropeMap } from "./components/EuropeMap";
import * as capitalCities from "./data/capitalCities.json";

export const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  return (
    <div className="app">
      <EuropeMap />
    </div>
  );
};
