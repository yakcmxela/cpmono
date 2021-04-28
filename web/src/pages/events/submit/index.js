import { AuthContext } from "providers";
import { dynamicallyNest } from "helpers";
import { SUGGEST_EVENT } from "schema/mutations";
import { NewEventForm } from "components/Events";
import { GEOCODE_LOCATION } from "schema/queries";
import { Modal } from "components/Modal";
import { useContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import styles from "./index.module.scss";

const newEvent = () => {
  const { auth, user, loading } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [newEvent, setNewEvent] = useState(defaultEvent);
  const [initModal, setInitModal] = useState(false);
  const [possibleLocations, setPossibleLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [success, setSuccess] = useState(false);

  const [geocodeLocation, { data }] = useLazyQuery(GEOCODE_LOCATION, {
    fetchPolicy: "no-cache",
  });
  const [submitEvent] = useMutation(SUGGEST_EVENT);

  const onChangeEvent = (event) => {
    setNewEvent((current) =>
      dynamicallyNest(event.target.name, event.target.value, current)
    );
  };

  const onDismissModal = () => {
    setInitModal(false);
    setNewEvent({
      ...newEvent,
      location: {
        address: selectedLocation.place_name,
        longitude: selectedLocation.center[0],
        latitude: selectedLocation.center[1],
      },
    });
  };

  const onResetModal = () => {
    setPossibleLocations([]);
    setInitModal(false);
    setSelectedLocation({});
  };

  const onResetForm = () => {
    setNewEvent(defaultEvent);
    setInitModal(false);
    setSuccess(false);
  };

  const onSelectLocation = (selected) => {
    setSelectedLocation(selected);
    setPossibleLocations(
      possibleLocations.map((location) =>
        selected.id === location.id ? { ...location, selected: true } : location
      )
    );
  };

  const onSubmitForm = async (event) => {
    setErrors([]);
    event.preventDefault();
    try {
      const {
        locationRequired = false,
        missingRequiredFields = [],
      } = validateForm(requiredFields, newEvent);
      if (missingRequiredFields.length) {
        setErrors(missingRequiredFields);
      } else if (locationRequired) {
        geocodeLocation({
          variables: {
            address: newEvent.location.address,
          },
        });
      } else {
        await submitEvent({
          variables: {
            data: newEvent,
            userId: auth.user.id,
          },
        });
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setErrors(["There was an error submitting your event."]);
    }
  };

  useEffect(() => {
    if (data && data.geocodeLocation) {
      setPossibleLocations(
        Object.keys(data.geocodeLocation).map((i) => data.geocodeLocation[i])
      );
      setInitModal(true);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user || user.role.type !== "contributor") {
    return (
      <p>
        Only contributing users may submit events.
        <br />
        {!auth.user ? (
          <a href={`${process.env.BASE_URL}/auth?redirect=account/contribute`}>
            Log in
          </a>
        ) : (
          <a href={`${process.env.BASE_URL}/account/contribute`}>
            Become a contributor
          </a>
        )}
      </p>
    );
  }

  if (success) {
    return (
      <main className={styles.main}>
        <h1>Success!</h1>
        <button onClick={onResetForm}>Submit another</button>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Modal
        active={initModal}
        canConfirm={!Object.keys(selectedLocation).length}
        confirmText="Select Location"
        onConfirm={onDismissModal}
        onDismiss={onResetModal}
      >
        <ul>
          {possibleLocations.map((location) => {
            return (
              <li
                className={
                  selectedLocation.id === location.id
                    ? styles.active
                    : styles.inactive
                }
                onClick={() => onSelectLocation(location)}
                key={location.id}
              >
                {location.place_name}
              </li>
            );
          })}
        </ul>
      </Modal>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, i) => (
            <li key={`e${i}`}>{error}</li>
          ))}
        </ul>
      )}
      <NewEventForm
        newEvent={newEvent}
        onChangeEvent={onChangeEvent}
        onSubmitForm={onSubmitForm}
      />
    </main>
  );
};

const initLocalTime = () => {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 16);
};

const defaultEvent = {
  description: "",
  email: "",
  phone: "",
  subtitle: "",
  title: "",
  urlExternal: "",
  location: {
    address: "",
    latitude: undefined,
    longitude: undefined,
  },
  featuredImage: "",
  images: [],
  pricing: {
    general: 0,
    children: 0,
    senior: 0,
  },
  windowSale: {
    start: initLocalTime(),
    end: initLocalTime(),
  },
  windowEvent: {
    start: initLocalTime(),
    end: initLocalTime(),
  },
};

const requiredFields = ["description", "email", "location", "phone", "title"];

export default newEvent;
