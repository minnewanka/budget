import React, { useState } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "moment";
import { Query, Mutation, useMutation } from "react-apollo";
import TransactionForm from "../transactionForm";
import {
  GET_TRANSACTIONS_QUERY,
  DELETE_TRANSACTION
} from "../../queries/transactionsQuery";

const TransactionTable = ({ data }) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS_QUERY }]
  });

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
    },
    {
      Header: "",
      id: "delete",
      accessor: str => "delete",

      Cell: row => (
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline"
          }}
          onClick={() => {
            const transactionToDelete = data[row.index];
            deleteTransaction({ variables: { id: transactionToDelete.id } });
          }}
        >
          Delete
        </span>
      )
    }
  ];

  return (
    <div>
      <ReactTable data={data} columns={columns} />
    </div>
  );
};

export default TransactionTable;
