import { gql } from "@apollo/client";

export const PAGES_CONNECTION = gql`
  query PagesConnection($sort: String, $limit: Int, $start: Int, $where: JSON) {
    pagesConnection(sort: $sort, limit: $limit, start: $start, where: $where) {
      values {
        id
        title
      }
    }
  }
`;

export const PAGE_BY_PARAMS = gql`
  query PageByParams($where: JSON) {
    pageByParams(where: $where) {
      id
      title
      components {
        ... on ComponentWebsiteImageWithText {
          id
          markupId
          content
          image {
            url
          }
        }
      }
    }
  }
`;
