import React, { useState } from "react";
import { GET_TRANSACTIONS_QUERY } from "../../queries/transactionsQuery";
import { Container } from "semantic-ui-react";
import TransactionForm from "../../components/transactionForm";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import { Query } from "react-apollo";
import TransactionFilter from "../../components/transactionFilter/TransactionFilter";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utils/utils";
import { NEW_TRANSACTION_SUBSCRIPTION } from "../../queries/transactionSubscription";

const Dashboard = () => {
  const [filter, setFilter] = useState("");
  const [begin, setBegin] = useState(getFirstDayOfMonth());
  const [end, setEnd] = useState(getLastDayOfMonth());

  const subscribeToNewTransactions = async subscribeToMore => {
    subscribeToMore({
      document: NEW_TRANSACTION_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newTransaction = subscriptionData.data.newTransaction;
        const exists = prev.transactions.find(
          ({ id }) => id === newTransaction.id
        );
        if (exists) return prev;
        console.log("newTransaction", newTransaction);
        return Object.assign({}, prev, {
          transactions: [...prev.transactions, newTransaction],
          __typename: prev.transactions__typename
        });
      }
    });
  };

  return (
    <Query
      query={GET_TRANSACTIONS_QUERY}
      variables={{ filter: filter, begin: begin, end: end }}
    >
      {({ loading, error, data, subscribeToMore }) => {
        if (error) return <div>Error</div>;
        subscribeToNewTransactions(subscribeToMore);

        const transactions = data ? data.transactions : [];

        return (
          <Container>
            <TransactionFilter
              setFilter={setFilter}
              setBegin={setBegin}
              setEnd={setEnd}
            />
            <TransactionTable data={transactions} />
            <TransactionForm />
          </Container>
        );
      }}
    </Query>
  );
};

export default Dashboard;
