import {
  AddressFieldGroup,
  DynamicFields,
  GeocodeResults,
  UploadField,
  useGeocodeResults,
} from "components/FormFields";
import { validateEmail, validateURL } from "helpers";

import { Button, Form } from "antd";

export const VenueForm = ({ venue = {}, onSubmit }) => {
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
      <Form onFinish={onSubmitGeocode} initialValues={venue}>
        <DynamicFields fields={fields} />
        <AddressFieldGroup />
        <UploadField field={featuredImage} />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>{" "}
    </>
  );
};

const fields = {
  name: {
    rules: [{ required: true, message: "Please supply a name" }],
    type: "text",
  },
  description: {
    rules: [{ required: true, message: "Please describe your organization" }],
    type: "textarea",
  },
  email: {
    rules: [
      {
        validator: validateEmail,
        message: "Please supply a valid email",
        required: true,
      },
    ],
    type: "text",
  },
  phone: {
    rules: [{ required: true, message: "Please supply a valid phone number" }],
    type: "text",
  },
  urlExternal: {
    label: "Website",
    rules: [{ validator: validateURL, message: "Please supply a valid URL" }],
    type: "text",
  },
};

const featuredImage = {
  key: "featuredImage",
  label: "Featured Image",
  accept: "image/png, image/jpeg",
};
