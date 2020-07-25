import React, { useState } from "react";
import { Map } from "./Map";
import Score from "./Score";
import Navigation from "./Navigation";

const App = () => {
  const [points, setPoints] = useState(1500);

  return <Navigation Score={<Score />} Map={<Map />} />;
};
export default App;
