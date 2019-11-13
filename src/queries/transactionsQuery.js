import gql from "graphql-tag";

export const GET_TRANSACTIONS_QUERY = gql`
  {
    transactions {
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
