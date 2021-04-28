import { gql } from "@apollo/client";

export const CREATE_VENUE = gql`
  mutation CreateVenue(
    $description: String
    $email: String
    $location: ComponentLocationAddressInput
    $name: String
    $phone: String
    $urlExternal: String
  ) {
    createVenue(
      input: {
        data: {
          description: $description
          email: $email
          location: $location
          name: $name
          phone: $phone
          urlExternal: $urlExternal
        }
      }
    ) {
      venue {
        name
        email
        phone
      }
    }
  }
`;

export const UPDATE_VENUE = gql`
  mutation UpdateVenue(
    $description: String
    $email: String
    $id: ID!
    $location: ComponentLocationAddress
    $name: String
    $phone: String
    $urlExternal: String
  ) {
    updateVenue(
      input: {
        data: {
          description: $description
          email: $email
          location: $location
          name: $name
          phone: $phone
          urlExternal: $urlExternal
        }
      }
    ) {
      venue {
        name
        email
        phone
      }
    }
  }
`;
