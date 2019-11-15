import gql from "graphql-tag";

export const NEW_TRANSACTION_SUBSCRIPTION = gql`
  subscription {
    newTransaction {
      id
      title
      amount
      date
      proceeded
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
export const UPDATED_TRANSACTION_SUBSCRIPTION = gql`
  subscription {
    updatedTransaction {
      id
      title
      amount
      date
      proceeded
    }
  }
`;
