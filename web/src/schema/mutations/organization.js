import { gql } from "@apollo/client";

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization(
    $description: String
    $email: String
    $address: ComponentLocationAddressInput
    $name: String
    $phone: String
    $urlExternal: String
  ) {
    createOrganization(
      input: {
        data: {
          description: $description
          email: $email
          address: $address
          name: $name
          phone: $phone
          urlExternal: $urlExternal
        }
      }
    ) {
      organization {
        name
        email
        phone
      }
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization(
    $description: String
    $email: String
    $id: ID!
    $location: ComponentLocationAddress
    $name: String
    $phone: String
    $urlExternal: String
  ) {
    updateOrganization(
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
      organization {
        name
        email
        phone
      }
    }
  }
`;
