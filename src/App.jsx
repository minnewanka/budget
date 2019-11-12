import React from 'react';
import Routes from './routes/Routes';
import './App.css';
import { DateRangePicker } from 'react-dates';
import FileUploader from './components/fileUploader';
import { Provider } from './context';
import TransactionTable from './components/transactionTable';
import Login from './components/login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
          {/* <TransactionTable />
          <FileUploader /> */}
          <Routes />
        </Provider>
      </div>
    );
  }
}

export default App;
