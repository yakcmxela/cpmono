import { gql } from "@apollo/client";

export const GET_ORGANIZATION = gql`
  query Organization($id: ID!) {
    organization(id: $id) {
      description
      email
      id
      location {
        ... on ComponentLocationAddress {
          address
          id
          latitude
          longitude
        }
      }
      name
      phone
      urlExternal
    }
  }
`;
