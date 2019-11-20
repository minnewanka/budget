import React, { useState } from "react";
import { GET_TRANSACTIONS_QUERY } from "../../queries/transactionsQuery";
import TransactionForm from "../../components/transactionForm";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import { Query } from "react-apollo";
import TransactionFilter from "../../components/transactionFilter/TransactionFilter";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utils/utils";
import {
  NEW_TRANSACTION_SUBSCRIPTION,
  DELETED_TRANSACTION_SUBSCRIPTION,
  UPDATED_TRANSACTION_SUBSCRIPTION
} from "../../queries/transactionSubscription";

const Transactions = () => {
  const [filter, setFilter] = useState("");
  const [begin, setBegin] = useState(getFirstDayOfMonth());
  const [end, setEnd] = useState(getLastDayOfMonth());

  const subscribeToNewTransaction = async subscribeToMore => {
    subscribeToMore({
      document: NEW_TRANSACTION_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newTransaction = subscriptionData.data.newTransaction;
        const exists = prev.transactions.find(
          ({ id }) => id === newTransaction.id
        );
        if (exists) return prev;
        return Object.assign({}, prev, {
          transactions: [...prev.transactions, newTransaction],
          __typename: prev.transactions__typename
        });
      }
    });
  };

  const subscribeToDeletedTransaction = async subscribeToMore => {
    subscribeToMore({
      document: DELETED_TRANSACTION_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const deletedTransaction = subscriptionData.data.deletedTransaction;
        const transactions = prev.transactions.filter(
          transaction => transaction.id !== deletedTransaction.id
        );
        return Object.assign({}, prev, {
          transactions: [...transactions],
          __typename: prev.transactions__typename
        });
      }
    });
  };

  const subscribeUpdatedTransaction = async subscribeToMore => {
    subscribeToMore({
      document: UPDATED_TRANSACTION_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedTransaction = subscriptionData.data.updatedTransaction;
        // console.log("updatedTransaction", updatedTransaction);
        const previousTransactions = prev.transactions;
        const index = previousTransactions.findIndex(
          transaction => transaction.id === updatedTransaction.id
        );
        previousTransactions[index] = updatedTransaction;
        return Object.assign({}, prev, {
          transactions: [...previousTransactions],
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

        const transactions = data ? data.transactions : [];

        return (
          <>
            <TransactionFilter
              setFilter={setFilter}
              setBegin={setBegin}
              setEnd={setEnd}
            />
            <TransactionTable
              data={transactions}
              subscribeToNewTransaction={() =>
                subscribeToNewTransaction(subscribeToMore)
              }
              subscribeToDeletedTransaction={() =>
                subscribeToDeletedTransaction(subscribeToMore)
              }
              subscribeUpdatedTransaction={() =>
                subscribeUpdatedTransaction(subscribeToMore)
              }
            />
            <TransactionForm />
          </>
        );
      }}
    </Query>
  );
};

export default Transactions;
