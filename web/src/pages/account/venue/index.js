import { AccountLayout } from "layouts";
import { dynamicallyNest } from "helpers";
import { GET_VENUE } from "schema/queries";
import { VenueForm, Gate, useGateProps } from "components/Account";
import { UPDATE_VENUE } from "schema/mutations";
import { defaultError } from "helpers";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const VenueProfile = ({ route }) => {
  const [venue, setVenue] = useState({});
  const [updateVenue] = useMutation(UPDATE_VENUE);
  const gateProps = useGateProps({
    Component: VenueForm,
    type: "venue",
    query: GET_VENUE,
  });

  const onChangeAny = (event) => {
    setVenue((current) =>
      dynamicallyNest(event.target.name, event.target.value, current)
    );
  };

  const onSubmit = async () => {
    try {
      await updateVenue({
        variables: {
          ...venue,
          id: gateProps.componentProps.venue.id,
        },
      });
    } catch (error) {
      console.log(error);
      setError(defaultError());
    }
  };

  return (
    <AccountLayout route={route}>
      <Gate
        {...gateProps}
        handler={{
          onChangeAny,
          onSubmit,
        }}
      />
    </AccountLayout>
  );
};

export default VenueProfile;
