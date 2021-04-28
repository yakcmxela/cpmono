import { gql } from "@apollo/client";

export const GEOCODE_LOCATION = gql`
  query GeocodeLocation($address: String!) {
    geocodeLocation(input: { address: $address } )
  }
`;
