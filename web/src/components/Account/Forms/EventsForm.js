import {
  DynamicForm,
  GeocodeWithForm,
  useGeocodeWithForm,
} from "components/Forms";
import { validateEmail, validateURL } from "helpers";

const devDefault = {
  title: "test",
  subtitle: "test",
  description: "test",
  email: "alexpmckay@gmail.com",
  phone: "1234567890",
  location: { address: "2500 Saratoga Drive" },
  urlExternal: "https://google.com",
};

export const EventsForm = ({ fields = {}, newEvent = {}, onSubmit }) => {
  const {
    geocoding,
    onConfirmGeocode,
    onSubmitGeocode,
    submission,
  } = useGeocodeWithForm(onSubmit);

  return (
    <>
      <GeocodeWithForm
        callback={onConfirmGeocode}
        geocoding={geocoding}
        submission={submission}
      />
      <DynamicForm
        fields={fields}
        onSubmit={onSubmitGeocode}
        data={devDefault}
      />
    </>
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
