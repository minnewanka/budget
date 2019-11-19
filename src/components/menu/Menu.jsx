import React from "react";
import { Menu } from "semantic-ui-react";
import { MENU } from "../../utils/constants";

const AppMenu = props => {
  const { activeItem, setActiveItem } = props;
  const handleOnClick = name => {
    setActiveItem(name);
    props.history.push(name);
  };

  return (
    <Menu pointing secondary vertical>
      <Menu.Item
        name="dashboard"
        active={activeItem === MENU.DASHBOARD}
        onClick={(e, { name }) => handleOnClick(name)}
      />
      <Menu.Item
        name="transactions"
        active={activeItem === MENU.TRANSACTIONS}
        onClick={(e, { name }) => handleOnClick(name)}
      />
    </Menu>
  );
};

export default AppMenu;
