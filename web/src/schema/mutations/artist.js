import { gql } from "@apollo/client";

export const CREATE_ARTIST = gql`
  mutation CreateArtist(
    # $categories: [String]
    $bio: String
    $email: String
    $firstname: String
    $lastname: String
    $phone: String
    $urlExternal: String
  ) {
    createArtist(
      input: {
        data: {
          # categories: $categories
          bio: $bio
          email: $email
          firstname: $firstname
          lastname: $lastname
          phone: $phone
          urlExternal: $urlExternal
        }
      }
    ) {
      artist {
        email
        firstname
        lastname
        phone
      }
    }
  }
`;

export const UPDATE_ARTIST = gql`
  mutation UpdateArtist(
    $id: ID!
    $categories: [String]
    $bio: String
    $email: String
    $firstname: String
    $id: ID!
    $lastname: String
    $phone: String
    $urlExternal: String
  ){
    updateArtist(
      input: {
        id: $id,
        data: {
          categories: $categories
          bio: $description
          email: $email
          firstname: $firstname
          lastname: $lastname
          location: $location
          phone: $phone
          urlExternal: $urlExternal
        }
      }
    ) {
      artist {
        email
        firstname
        lastname
        phone
      }
    }
  }
`;
