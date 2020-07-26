import React from "react";
import { Paper } from "@material-ui/core";

const Score = ({ successes, points, cityName }) => {
  return (
    <>
      <Paper className="paper" variant="outlined">
        Tienes que encontrar <b>{cityName}</b>
      </Paper>
      <Paper className="paper" variant="outlined">
        <b>{successes}</b> cities placed
      </Paper>
      <Paper className="paper" variant="outlined">
        <b>{points}</b> points left
      </Paper>
    </>
  );
};

export default Score;
