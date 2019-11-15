import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "moment";
import { useMutation } from "react-apollo";
import {
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from "../../queries/transactionsQuery";

const TransactionTable = ({ data }) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

  const renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
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
              amount: parseFloat(transactionToUpate.amount)
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
    }
  ];

  return (
    <div>
      <ReactTable data={data} defaultPageSize={10} columns={columns} />
    </div>
  );
};

export default TransactionTable;
