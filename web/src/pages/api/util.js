import { serialize } from "cookie";

export const setCookie = (res, data, key) => {
  const maxAge = 1000 * 60 * 60 * 24;
  const expires = new Date(Date.now() + maxAge);
  const path = "/";
  res.setHeader(
    "Set-Cookie",
    serialize(
      "cportland_user",
      JSON.stringify({ jwt: data[key].jwt, user: data[key].user }),
      {
        maxAge,
        expires,
        path,
      }
    )
  );
  return data[key];
};

export const withGQLErrors = (res, error) => {
  const { graphQLErrors = null } = error;
  const defaultError = ["An unknown error occured"];
  const defaultCode = 500;

  try {
    const isGraphQLError = () =>
      graphQLErrors && graphQLErrors[0] && graphQLErrors[0].extensions;
    if (isGraphQLError) {
      const isForbidden = (exception) => {
        if (
          exception &&
          exception.message &&
          exception.message === "Forbidden"
        ) {
          console.log(exception);
          return Array.isArray(exception.message)
            ? exception.message.join(", ")
            : [exception.message];
        }
        return false;
      };

      const isBadRequest = (exception) => {
        console.log(exception);

        return isGraphQLError && exception.data && exception.data.message.length
          ? exception.data.message.map((message) =>
              message.messages.map((m) => m.message).join(", ")
            )
          : false;
      };

      const { exception = null } = graphQLErrors[0].extensions;
      switch (true) {
        case Boolean(isForbidden(exception)):
          return res.status(403).send({ messages: isForbidden(exception) });
        case Boolean(isBadRequest(exception)):
          return res.status(400).send({ messages: isBadRequest(exception) });
        default:
          return res.status(defaultCode).send(defaultError);
      }
    } else {
      return res.status(defaultCode).send(defaultError);
    }
  } catch (error) {
    console.log(error);
  }
};
