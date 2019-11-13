import React, { useState } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "moment";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TransactionForm from "../transactionForm";
import { GET_TRANSACTIONS_QUERY } from "../../queries/transactionsQuery";

const TransactionTable = ({}) => {
  const columns = [
    {
      id: "date",
      Header: "Date",
      accessor: d => {
        return Moment(d.date)
          .local()
          .format("DD-MM-YYYY");
      }
    },
    {
      Header: "Libelle",
      accessor: "title"
    },
    {
      Header: "Amount",
      accessor: "amount"
    }
  ];

  return (
    <Query query={GET_TRANSACTIONS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const transactions = data.transactions;

        return (
          <div>
            <TransactionForm />
            <ReactTable data={transactions} columns={columns} />
          </div>
        );
      }}
    </Query>
  );
};

export default TransactionTable;
