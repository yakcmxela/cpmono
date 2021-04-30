import {
  AddressFieldGroup,
  DynamicFields,
  GeocodeResults,
  UploadField,
  useGeocodeResults,
} from "components/FormFields";
import { validateEmail, validateURL } from "helpers";

import { Button, Form } from "antd";

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
  } = useGeocodeResults(onSubmit);

  return (
    <>
      <GeocodeResults
        callback={onConfirmGeocode}
        geocoding={geocoding}
        submission={submission}
      />
      <Form onFinish={onSubmitGeocode} initialValues={devDefault}>
        <DynamicFields fields={fields} />
        <AddressFieldGroup />
        <UploadField field={featuredImage} />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
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

const featuredImage = {
  key: "featuredImage",
  label: "Featured Image",
  accept: "image/png, image/jpeg",
};
