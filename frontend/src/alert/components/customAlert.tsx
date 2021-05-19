import { Snackbar } from "@material-ui/core";
import { Color } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useTypedSelector } from '../../store';
import { alertActions } from "../index";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomAlert: React.FC = () => {
  const dispatch = useDispatch();
  const { alerts } = useTypedSelector((state) => state.alert);
  const [alert, setAlert] = useState({ type: "success" as Color, message: "" });
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (alerts.length > 0) {
      if (alerts[alerts.length - 1].visible) {
        setAlert(alerts[alerts.length - 1]);
        setShow(true);
        setTimeout(() => {
          setShow(false);
          dispatch(alertActions.hideAlert({ index: alerts.length - 1 }));
        }, 5000);
      }
    }
  }, [alerts, dispatch]);

  const handleClose = () => {
    setShow(false);
  };

  return show ? (
    <Snackbar open={show} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alert.type}>
        {alert.message}
      </Alert>
    </Snackbar>
  ) : null;
};

export default CustomAlert;
