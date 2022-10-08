import React from "react";
import { NextPage } from "next";

interface ErrorProps {
  statusCode: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div>
      <h1>Error: {statusCode}</h1>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const currentStatusCode = res?.statusCode || 500;
  const throwedStatusCode = err?.statusCode;

  const statusCode = throwedStatusCode || currentStatusCode;

  if (res) {
    // Here is where the magic happens
    res.statusCode = statusCode;
  }

  return { statusCode };
};

export default Error;