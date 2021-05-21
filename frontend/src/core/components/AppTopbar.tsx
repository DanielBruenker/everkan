import { Menu } from "primereact/menu";
import React, { useRef } from "react";

interface AppTopbarProps {
  onClickOnLogout: (event) => void;
  onToggleMenu: (event) => void;
}

const AppTopbar: React.FC<AppTopbarProps> = ({
  onToggleMenu,
  onClickOnLogout,
}) => {
  const menu = useRef<Menu | null>(null);

  const items = [
    {
      label: "Logout",
      command: (event) => {
        onClickOnLogout(event);
      },
    },
  ];

  const onClickOnUserIcon = (event) => {
    if (!menu.current) {
      return;
    }
    menu.current.toggle(event);
  };

  return (
    <div className="layout-topbar clearfix">
      <button
        type="button"
        className="p-link layout-menu-button"
        onClick={onToggleMenu}
      >
        <span className="pi pi-bars" />
      </button>
      <div className="layout-topbar-icons">
        <button type="button" className="p-link" onClick={onClickOnUserIcon}>
          <span className="layout-topbar-item-text">User</span>
          <span className="layout-topbar-icon pi pi-user" />
        </button>
        <Menu model={items} popup ref={menu} id="popup_menu" />
      </div>
    </div>
  );
};

export default AppTopbar;
