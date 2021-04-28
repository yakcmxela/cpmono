import { AccountLayout } from "layouts";
import { GET_ARTIST } from "schema/queries";
import { UPDATE_ARTIST } from "schema/mutations";
import { ArtistForm, Gate, useGateProps } from "components/Account";
import { dynamicallyNest } from "helpers";
import { useState } from "react";
import { useMutation } from "@apollo/client";

const ArtistProfile = ({ route }) => {
  const [artist, setArtist] = useState({});
  const [updateArtist] = useMutation(UPDATE_ARTIST);
  const gateProps = useGateProps({
    Component: ArtistForm,
    type: "artist",
    query: GET_ARTIST,
  });

  const onChangeAny = (event) => {
    setArtist((current) =>
      dynamicallyNest(event.target.name, event.target.value, current)
    );
  };

  const onSubmit = async () => {
    try {
      await updateArtist({
        variables: {
          ...artist,
          id: gateProps.componentProps.artist.id,
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

export default ArtistProfile;
