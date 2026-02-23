import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      description
      amount
      type
      authorId
      category {
        id
        name
        icon
        color
      }
      createdAt
      updatedAt
    }
  }
`;
