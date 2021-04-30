import { useState } from "react";

export const useGeocodeResults = (callback) => {
  const [geocoding, setGeocoding] = useState(false);
  const [submission, setSubmission] = useState({});

  const onSubmitGeocode = (fields) => {
    setSubmission(fields);
    setGeocoding(true);
  };

  const onConfirmGeocode = (location) => {
    console.log({
      ...submission,
      address: {
        ...submission.address,
        longitude: location.center[0],
        latitude: location.center[1],
      },
    })
    callback({
      ...submission,
      address: {
        ...submission.address,
        longitude: location.center[0],
        latitude: location.center[1],
      },
    });
  };

  return {
    geocoding,
    onConfirmGeocode,
    onSubmitGeocode,
    submission,
  };
};
