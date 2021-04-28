import { gql } from "@apollo/client";

export const GET_SITE_THEME = gql`
  query GetTheme {
    theme {
      alert
      alertActive
      colorScheme
    }
  }
`;
