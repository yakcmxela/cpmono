import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query Events {
    events {
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
      phone
      title
      urlExternal
      windowEvent {
        start
        end
      }
      windowSale {
        start
        end
      }
    }
  }
`;

export const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
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
      phone
      title
      urlExternal
      windowEvent {
        start
        end
      }
      windowSale {
        start
        end
      }
    }
  }
`;
