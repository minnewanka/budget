import React from 'react';
import './App.css';
import { DateRangePicker } from 'react-dates';
import FileUploader from './components/fileUploader';
import { Provider } from './context';
import TransactionTable from './components/transactionTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startDate,
      loadData: this.loadData.bind(this),
    };
  }

  loadData(data) {
    this.setState({ data: data });
  }

  render() {
    return (
      <div className="App">
        <Provider value={this.state}>
          <DateRangePicker startDate={startDate} endDate={endDate} />
          <TransactionTable />
          <FileUploader />
        </Provider>
      </div>
    );
  }
}

export default App;
