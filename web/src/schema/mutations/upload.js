import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    upload(file: $file) {
      id
      name
      url
    }
  }
`;
