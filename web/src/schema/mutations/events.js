import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $description: String
    $email: String
    $featuredImage: ID
    $address: ComponentLocationAddressInput!
    $phone: String
    $subtitle: String
    $submittedBy: ID!
    $title: String
    $urlExternal: String
  ) {
    createEvent(
      input: {
        data: {
          description: $description
          email: $email
          featuredImage: $featuredImage
          address: $address
          phone: $phone
          subtitle: $subtitle
          submittedBy: $submittedBy
          title: $title
          urlExternal: $urlExternal
        }
      }
    ) {
      event {
        id
      }
    }
  }
`;

export const SUGGEST_EVENT = gql`
  mutation SugestEvent($data: EventInput!, $userId: ID!) {
    suggestEvent(input: { data: $data, user: { id: $userId } }) {
      event {
        id
        # Extensible with
        # title
        # location
        # ...Event fields
      }
    }
  }
`;
