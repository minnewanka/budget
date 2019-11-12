import React, { useState } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "moment";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const TRANSACTION_QUERY = gql`
  {
    transactions {
      title
      amount
      date
    }
  }
`;

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
    <Query query={TRANSACTION_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const transactions = data.transactions;

        return <ReactTable data={transactions} columns={columns} />;
      }}
    </Query>
  );
};

export default TransactionTable;
