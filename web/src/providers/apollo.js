import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const apolloProvider = (headers = {}, ssrMode = false) => {
  return new ApolloClient({
    ssrMode,
    link: createUploadLink({
      fetchOptions: "no-cors",
      headers,
      uri: `${process.env.API_URL}/graphql`,
    }),
    cache: new InMemoryCache(),
  });
};
