import { AccountLayout } from "layouts";
import { AuthContext } from "providers";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { capitalize } from "helpers";
import { Form, Select } from "antd";
import { Loader } from "components/Loader";
import {
  ArtistForm,
  OrganizationForm,
  VenueForm,
} from "components/Account/Forms";
import {
  CREATE_ARTIST,
  CREATE_ORGANIZATION,
  CREATE_VENUE,
} from "schema/mutations";

const AccountContribute = ({ route }) => {
  const { auth, user } = useContext(AuthContext);

  const [errors, setErrors] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [registeringAs, setRegisteringAs] = useState(undefined);
  const [submission, setSubmission] = useState({});
  const [success, setSuccess] = useState(false);

  const [createArtist] = useMutation(CREATE_ARTIST);
  const [createOrganization] = useMutation(CREATE_ORGANIZATION);
  const [createVenue] = useMutation(CREATE_VENUE);

  const onSubmit = async (data) => {
    setProcessing(true);
    setErrors([]);
    setSubmission(data);
    try {
      const mutation =
        registeringAs === REGISTRATION_TYPES.ARTIST
          ? createArtist
          : registeringAs === REGISTRATION_TYPES.ORGANIZATION
          ? createOrganization
          : registeringAs === REGISTRATION_TYPES.VENUE
          ? createVenue
          : null;
      console.log(data);
      await mutation({
        variables: {
          ...data,
          user: auth.user.id,
        },
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrors([
        error.message || "There was an error processing your request.",
      ]);
    }
    setProcessing(false);
  };

  if (!auth) {
    return <p>Loading...</p>;
  }

  if (!auth.user) {
    return (
      <AccountLayout route={route}>
        <p>
          Only authenticated users may become makers.
          <a
            href={`${process.env.BASE_URL}/account/login?redirect=account/contribute`}
          >
            Log in
          </a>
        </p>
      </AccountLayout>
    );
  }

  if (success) {
    return (
      <AccountLayout route={route}>
        <main>
          <h1>Success!</h1>
          <p>
            Thanks for your interest in becoming a contributor! Creative Porland
            will review your request and get back to you shortly.
          </p>
        </main>
      </AccountLayout>
    );
  }

  const availableToCreate = Object.values(REGISTRATION_TYPES).filter(
    (type) => user && !user[type]
  );

  return (
    <AccountLayout route={route}>
      <main>
        {processing ? (
          <Loader />
        ) : availableToCreate.length === 0 ? (
          <>
            <h1>You're all set!</h1>
            <p>
              You've already submitted or been approved for all the available
              account types.
            </p>
          </>
        ) : (
          <>
            <h1>Become a Contributor</h1>
            <p>Only contributors can submit events for review.</p>
            {errors.length > 0 && (
              <ul>
                {errors.map((error, i) => (
                  <li key={`e${i}`}>{error}</li>
                ))}
              </ul>
            )}
            <Form.Item label="I am registering as a(n)">
              <Select
                onChange={setRegisteringAs}
                value={registeringAs}
                placeholder="Choose One"
              >
                {availableToCreate.map((type) => (
                  <Select.Option key={type} value={type}>
                    {capitalize(type)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {registeringAs === REGISTRATION_TYPES.ARTIST && (
              <ArtistForm onSubmit={onSubmit} artist={submission} />
            )}
            {registeringAs === REGISTRATION_TYPES.ORGANIZATION && (
              <OrganizationForm onSubmit={onSubmit} organization={submission} />
            )}
            {registeringAs === REGISTRATION_TYPES.VENUE && (
              <VenueForm onSubmit={onSubmit} venue={submission} />
            )}
          </>
        )}
      </main>
    </AccountLayout>
  );
};

const REGISTRATION_TYPES = {
  ARTIST: "artist",
  ORGANIZATION: "organization",
  VENUE: "venue",
};

export default AccountContribute;
