import { gql } from "@apollo/client";

export const GET_VENUE = gql`
  query Venue($id: ID!) {
    venue(id: $id) {
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
