import React from "react";
import { GET_TRANSACTIONS_QUERY } from "../../queries/transactionsQuery";
import { Container } from "semantic-ui-react";
import TransactionForm from "../../components/transactionForm";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import { Query } from "react-apollo";
import TransactionFilter from "../../components/transactionFilter/TransactionFilter";

const Dashboard = () => {
  return (
    <Query query={GET_TRANSACTIONS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const transactions = data.transactions;

        return (
          <Container>
            <TransactionFilter />
            <TransactionTable data={transactions} />
            <TransactionForm />
          </Container>
        );
      }}
    </Query>
  );
};

export default Dashboard;
