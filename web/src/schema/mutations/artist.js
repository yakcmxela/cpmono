import { gql } from "@apollo/client";

export const CREATE_ARTIST = gql`
  mutation CreateArtist(
    # $categories: [String]
    $bio: String
    $email: String
    $featuredImage: [ID]
    $firstname: String
    $galleryImages: [ID]
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
          featuredImage: $featuredImage
          firstname: $firstname
          galleryImages: $galleryImages
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
    $bio: String
    $categories: [String]
    $email: String
    $featuredImage: [ID]
    $firstname: String
    $galleryImages: [ID]
    $id: ID!
    $lastname: String
    $phone: String
    $urlExternal: String
  ) {
    updateArtist(
      input: {
        id: $id
        data: {
          categories: $categories
          bio: $description
          email: $email
          featuredImage: $featuredImage
          firstname: $firstname
          galleryImages: $galleryImages
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
