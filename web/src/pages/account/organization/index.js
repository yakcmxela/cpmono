import { AccountLayout } from "layouts";
import { dynamicallyNest } from "helpers";
import { GET_ORGANIZATION } from "schema/queries";
import { OrganizationForm, Gate, useGateProps } from "components/Account";
import { UPDATE_ORGANIZATION } from "schema/mutations";
import { defaultError } from "helpers";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const OrganizationProfile = ({ route }) => {
  const [organization, setOrganization] = useState({});
  const [updateOrganization] = useMutation(UPDATE_ORGANIZATION);
  const gateProps = useGateProps({
    Component: OrganizationForm,
    type: "organization",
    query: GET_ORGANIZATION,
  });
  
  const onChangeAny = (event) => {
    setOrganization((current) =>
      dynamicallyNest(event.target.name, event.target.value, current)
    );
  };

  const onSubmit = async () => {
    try {
      await updateOrganization({
        variables: {
          ...organization,
          id: gateProps.componentProps.organization.id,
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

export default OrganizationProfile;
