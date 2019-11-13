import gql from "graphql-tag";

export const GET_TRANSACTIONS_QUERY = gql`
  {
    transactions {
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

export const DELETE_TRANSACTION = gql`
  mutation DELETE_TRANSACTION($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;
