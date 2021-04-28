import { gql } from "@apollo/client";

export const GET_USER_SELF = gql`
  query GetUserSelf($id: ID!) {
    getUserSelf(id: $id) {
      artist {
        id
      }
      email
      eventsAttended {
        id
        title
      }
      eventsFavorited {
        id
        title
      }
      eventsReminder
      firstname
      id
      lastname
      newsletter
      organization {
        id
      }
      organizations {
        id
      }
      role {
        name
        type
      }
      venue {
        id
      }
      venues {
        id
      }
    }
  }
`;
