import React from "react";
import Routes from "./routes/Routes";
import "./App.css";
import { Provider } from "./context";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadData: this.loadData.bind(this)
    };
  }

  loadData(data) {
    this.setState({ data: data });
  }

  render() {
    return (
      <div className="App">
        <Provider value={this.state}>
          <Routes />
        </Provider>
      </div>
    );
  }
}

export default App;
