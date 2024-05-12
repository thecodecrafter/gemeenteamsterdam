import { Alert, Paragraph } from "@amsterdam/design-system-react";
import React from "react";

const Error = (props: { message: string }) => {
  return (
    <Alert headingLevel={4} severity="error" title="Niet gelukt">
      <Paragraph>{props.message}</Paragraph>
    </Alert>
  );
};

export default Error;
