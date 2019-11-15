import gql from "graphql-tag";

export const GET_TRANSACTIONS_QUERY = gql`
  query GetTransactions($filter: String, $begin: String, $end: String) {
    transactions(filter: $filter, begin: $begin, end: $end) {
      id
      title
      amount
      date
    }
  }
`;

export const POST_TRANSACTION = gql`
  mutation PostTransaction($title: String!, $amount: Float!, $date: String!) {
    post(title: $title, date: $date, amount: $amount) {
      id
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $title: String!
    $amount: Float!
    $date: String!
  ) {
    updateTransaction(
      id: $id
      data: { title: $title, date: $date, amount: $amount }
    ) {
      id
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DELETE_TRANSACTION($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;
