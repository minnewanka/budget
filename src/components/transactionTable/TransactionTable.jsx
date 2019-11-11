import React, { useState } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';

const TransactionTable = ({ data }) => {
  const columns = [
    {
      id: 'updatedAt',
      Header: 'Date',
      accessor: d => {
        return Moment(d.date)
          .local()
          .format('DD-MM-YYYY');
      },
    },
    {
      Header: 'Libelle',
      accessor: 'title',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
  ];

  return <ReactTable data={data} columns={columns} />;
};

export default TransactionTable;
