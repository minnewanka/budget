import React from "react";
import { GET_TRANSACTIONS_QUERY } from "../../queries/transactionsQuery";
import TransactionForm from "../../components/transactionForm";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import { Query } from "react-apollo";

const Dashboard = () => {
  return (
    <Query query={GET_TRANSACTIONS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const transactions = data.transactions;

        return (
          <div>
            <TransactionForm />
            <TransactionTable data={transactions} />
          </div>
        );
      }}
    </Query>
  );
};

export default Dashboard;
