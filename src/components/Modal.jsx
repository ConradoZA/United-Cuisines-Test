import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";

export const Modal = ({ title, content }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};
