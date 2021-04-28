import {
  DynamicForm,
  GeocodeWithForm,
  useGeocodeWithForm,
} from "components/Forms";
import { validateEmail, validateURL } from "helpers";

export const NewEventForm = ({ newEvent = {}, onSubmit }) => {
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
      <DynamicForm fields={fields} onSubmit={onSubmitGeocode} data={newEvent} />
    </>
  );
};

const fields = {
  title: {
    label: "Event Title",
    rules: [
      { required: true, message: "Please supply a title for your event" },
    ],
    type: "text",
  },
  subtitle: {
    label: "Event Subtitle",
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
  location: {
    fields: {
      address: {
        rules: [{ required: true, message: "Please supply an address" }],
        type: "text",
      },
      latitude: {
        hidden: true,
        type: "text",
      },
      longitude: {
        hidden: true,
        type: "text",
      },
    },
  },
  urlExternal: {
    label: "Website",
    rules: [{ validator: validateURL, message: "Please supply a valid URL" }],
    type: "text",
  },
  // featuredImage: {},
  // images: {},
  // windowEvent: {
  //   fields: {
  //     start: {},
  //     end: {},
  //   },
  // },
  // windowSale: {
  //   fields: {
  //     start: {},
  //     end: {},
  //   },
  // },
  // eventSubmission: {
  //   fields: {
  //     pricing: {
  //       fields: {
  //         general: {},
  //         senior: {},
  //         children: {},
  //       },
  //     },
  //   },
  // },
};
