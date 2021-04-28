import { AuthContext } from "providers";
import { CREATE_EVENT } from "schema/mutations";
import { EventsForm } from "components/Account/Forms";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { AccountLayout } from "layouts/AccountLayout";
import { Loader } from "components/Loader";
import { validateEmail, validateURL } from "helpers";

const AccountNewEvent = ({ route }) => {
  const { auth, user, loading } = useContext(AuthContext);

  const [errors, setErrors] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [submission, setSubmission] = useState({});
  const [success, setSuccess] = useState(false);

  const [createEvent] = useMutation(CREATE_EVENT);

  const onSubmit = async (data) => {
    setProcessing(true);
    setErrors([]);
    setProcessing(false);
    setSubmission(data);
    try {
      await createEvent({
        variables: {
          ...data,
          submittedBy: auth.user.id,
        },
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrors([
        error.message || "There was an error processing your request.",
      ]);
    }
  };

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
      <AccountLayout route={route}>
        <main>
          <h1>Success!</h1>
          <p>
            Thanks for submitting a new event! Creative Porland will review your
            submission and get back to you shortly.
          </p>
        </main>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout route={route}>
      <main>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, i) => (
              <li key={`e${i}`}>{error}</li>
            ))}
          </ul>
        )}
        {processing ? (
          <Loader />
        ) : (
          <EventsForm
            fields={fields}
            newEvent={submission}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </AccountLayout>
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
  featuredImage: {
    label: "Featured Image",
    type: "upload",
    accept: "image/png, image/jpeg",
  },
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

export default AccountNewEvent;
