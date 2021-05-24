import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CustomAlert from "../../alert/components/customAlert";

import { authenticationActions } from "../../authentication";
import { PrivateRoute } from "../../authentication/components/PrivateRoute";
import { kanbanBoardActions } from "../../kanbanBoard";
import { useTypedSelector } from "../../store";
import { history } from "../../utils/history";
import HomePage from "../pages/HomePage";
import { AppMenu } from "./AppMenu";

import AppTopbar from "./AppTopbar";
import LoginPage from "../pages/LoginPage";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../layout/flags/flags.css";
import "../layout/layout.scss";
import "./App.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [layoutMode, setLayoutMode] = useState<string>("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(false);
  const sidebar = useRef<HTMLDivElement>();

  const authenticationState = useTypedSelector((state) => state.authentication);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    dispatch(kanbanBoardActions.fetchBoardById(1));
    setLoggedIn(authenticationState.loggedIn);
  }, [dispatch, loggedIn, authenticationState]);

  let menuClick = false;

  const handelLogout = () => {
    dispatch(authenticationActions.logout());
  };

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

  const isSidebarVisible = () => {
    if (isDesktop()) {
      if (layoutMode === "static") return !staticMenuInactive;
      else if (layoutMode === "overlay") return overlayMenuActive;
      else return true;
    }
    return true;
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static" && loggedIn,
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": !ripple,
  });

  const sidebarClassName = classNames("layout-sidebar", {
    "layout-sidebar-dark": layoutColorMode === "dark",
    "layout-sidebar-light": layoutColorMode === "light",
  });

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };

  const onToggleMenu = (event) => {
    if (isDesktop()) {
      if (layoutMode === "overlay") {
        setOverlayMenuActive((prevState) => !prevState);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }
    event.preventDefault();
  };

  const menu = [{ label: "Home", icon: "pi pi-fw pi-home", to: "/" }];

  const renderNav = () => {
    if (loggedIn) {
      return (
        <React.Fragment>
          <AppTopbar
            onToggleMenu={onToggleMenu}
            onClickOnLogout={handelLogout}
          />
          <CSSTransition
            classNames="layout-sidebar"
            timeout={{ enter: 200, exit: 200 }}
            in={isSidebarVisible()}
            unmountOnExit
          >
            <div className={sidebarClassName}>
              <div className="layout-logo" style={{ cursor: "pointer" }}></div>
              <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
            </div>
          </CSSTransition>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <Router history={history}>
      <div className={wrapperClass}>
        {renderNav()}
        <div className="layout-main">
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Redirect from="*" to="/" />
          </Switch>
          <CustomAlert />
        </div>
      </div>
    </Router>
  );
};

export default App;
