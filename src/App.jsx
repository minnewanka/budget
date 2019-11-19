import React from "react";
import Routes from "./routes/Routes";
import "./App.css";
import { Provider } from "./context";
import { MENU } from "./utils/constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: MENU.DASHBOARD,
      setActiveItem: this.setActiveItem.bind(this)
    };
  }

  setActiveItem(item) {
    this.setState({ activeItem: item });
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
