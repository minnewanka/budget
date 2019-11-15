import gql from "graphql-tag";

export const NEW_TRANSACTION_SUBSCRIPTION = gql`
  subscription {
    newTransaction {
      id
      title
      amount
      date
    }
  }
`;

export const DELETED_TRANSACTION_SUBSCRIPTION = gql`
  subscription {
    deletedTransaction {
      id
    }
  }
`;
