import { gql } from "@apollo/client";

export const GET_ARTIST = gql`
  query Artist($id: ID!) {
    artist(id: $id) {
      bio
      email
      firstname
      id
      lastname
      phone
      urlExternal
    }
  }
`;
