import { useState } from "react";
export const useGeocodeWithForm = (callback) => {
  const [geocoding, setGeocoding] = useState(false);
  const [submission, setSubmission] = useState({});

  const onSubmitGeocode = (fields) => {
    setSubmission(fields);
    setGeocoding(true);
  };

  const onConfirmGeocode = (location) => {
    callback({
      ...submission,
      location: {
        address: location.place_name,
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
