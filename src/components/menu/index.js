import React from "react";
import { withRouter } from "react-router-dom";
import Menu from "./Menu";
import { Consumer } from "../../context";

const MenuConsumer = props => {
  return (
    <Consumer>
      {({ activeItem, setActiveItem }) => (
        <Menu
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          {...props}
        />
      )}
    </Consumer>
  );
};

export default withRouter(MenuConsumer);
