import React from "react";
import { Consumer } from "../../context";
import TransactionTable from "./TransactionTable";

const TransactionTableConsumer = props => {
  return <Consumer>{({ data }) => <TransactionTable data={data} />}</Consumer>;
};

export default TransactionTableConsumer;
