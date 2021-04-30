import { GEOCODE_LOCATION } from "schema/queries";
import { useLazyQuery } from "@apollo/client";
import { Modal, Radio } from "antd";
import { useEffect, useState } from "react";

export const GeocodeResults = ({
  geocoding = false,
  submission = {},
  callback,
}) => {
  const [locations, setLocations] = useState({});
  const [selected, setSelected] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [geocodeRequest, geocodeResults] = useLazyQuery(GEOCODE_LOCATION, {
    fetchPolicy: "no-cache",
  });

  const onCancel = () => {
    setVisible(false);
    setLocations([]);
    setSelected(undefined);
  };

  const onConfirm = () => {
    setVisible(false);
    callback(locations[selected]);
  };

  const onHandleGeocodeResults = () => {
    if (geocodeResults.data && geocodeResults.data.geocodeLocation) {
      setLocations(geocodeResults.data.geocodeLocation);
      setVisible(true);
    }
  };

  const onShouldGeocode = () => {
    if (geocoding) {
      const address = Object.keys(submission.address)
        .map((part) => submission.address[part])
        .join(" ");
      geocodeRequest({
        variables: {
          address,
        },
      });
    }
  };

  const onSelectLocation = (event) => {
    setSelected(event.target.value);
  };

  useEffect(onShouldGeocode, [geocoding]);
  useEffect(onHandleGeocodeResults, [geocodeResults]);

  return (
    <Modal visible={visible} onOk={onConfirm} onCancel={onCancel}>
      {Object.keys(locations).length && (
        <Radio.Group onChange={onSelectLocation} selected={selected}>
          {Object.keys(locations).map((key) => {
            const location = locations[key];
            return (
              <Radio key={key} value={key}>
                {location.place_name}
              </Radio>
            );
          })}
        </Radio.Group>
      )}
    </Modal>
  );
};
