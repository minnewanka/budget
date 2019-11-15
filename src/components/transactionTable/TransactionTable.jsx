import React, { useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "moment";
import { useMutation } from "react-apollo";
import {
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from "../../queries/transactionsQuery";

const getTrProps = (state, rowInfo, instance) => {
  if (rowInfo) {
    return {
      style: {
        background: rowInfo.row.proceeded ? "#e6ffee" : "#ffe6e6"
      }
    };
  }
  return {};
};

const TransactionTable = ({
  data,
  subscribeToNewTransaction,
  subscribeToDeletedTransaction,
  subscribeUpdatedTransaction
}) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

  useEffect(() => {
    subscribeToNewTransaction();
    subscribeToDeletedTransaction();
    subscribeUpdatedTransaction();
  }, []);

  const renderEditable = cellInfo => {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          const transactionToUpate = data[cellInfo.index];
          updateTransaction({
            variables: {
              id: transactionToUpate.id,
              title: transactionToUpate.title,
              date: transactionToUpate.date,
              amount: parseFloat(transactionToUpate.amount),
              proceeded: transactionToUpate.proceeded
            }
          });
        }}
        dangerouslySetInnerHTML={{
          __html: data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
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
      accessor: "title",
      Cell: renderEditable
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: renderEditable
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
    },
    {
      Header: "",
      id: "proceeded",
      accessor: "proceeded",
      Cell: row => (
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline"
          }}
          onClick={() => {
            const transaction = data[row.index];
            updateTransaction({
              variables: {
                id: transaction.id,
                title: transaction.title,
                date: transaction.date,
                amount: parseFloat(transaction.amount),
                proceeded: !transaction.proceeded
              }
            });
          }}
        >
          {data[row.index].proceeded ? "Unselect" : "Select"}
        </span>
      )
    }
  ];

  return (
    <div>
      <ReactTable
        data={data}
        defaultPageSize={10}
        columns={columns}
        getTrProps={getTrProps}
      />
    </div>
  );
};

export default TransactionTable;
