import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        role {
          id
          name
          description
          type
        }
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $username: String!
  ) {
    register(
      input: { email: $email, password: $password, username: $username }
    ) {
      jwt
      user {
        id
        username
      }
    }
  }
`;

export const REQUEST_ROLE_USER = gql`
  mutation RequestRoleUser($data: EventInput!, $userId: ID!) {
    requestRoleUser(input: { data: $data, user: { id: $userId } }) {
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

export const UPDATE_USER = gql`
  mutation UpdateUserSelf(
    $id: ID!
    $firstname: String
    $lastname: String
    $phone: String
    $eventsReminder: Boolean
    $newsletter: Boolean
  ) {
    updateUserSelf(
      input: {
        where: { id: $id }
        data: { 
          firstname: $firstname, 
          lastname: $lastname, 
          phone: $phone 
          eventsReminder: $eventsReminder
          newsletter: $newsletter
        }
      }
    ) {
      user {
        firstname
        lastname
        phone
        newsletter
        eventsReminder
      }
    }
  }
`;

export const UPDATE_USER_RELATIONS = gql`
  mutation UpdateUserRelations(
    $id: ID!
    $eventsAttended: [ID]
    $eventsFavorited: [ID]
    $action: RelationAction
  ) {
    updateUserRelations(
      input: {
        where: { id: $id }
        data: { 
          eventsAttended: $eventsAttended
          eventsFavorited: $eventsFavorited
          action: $action
        }
      }
    ) {
      user {
        eventsAttended {
          id
        }
        eventsFavorited {
          id
        }
      }
    }
  }
`;