import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from '../../store';
import { alertActions } from "../index";
import { Toast } from 'primereact/toast';


const CustomAlert: React.FC = () => {

  const dispatch = useDispatch();
  const { alerts } = useTypedSelector((state) => state.alert);

  const toast = useRef<Toast | null>(null);
  const [alert, setAlert] = useState({ type: "success", message: "" });

  useEffect(() => {
    if (alerts.length > 0) {
      if (alerts[alerts.length - 1].visible) {
        setAlert(alerts[alerts.length - 1]);
        if(!toast.current){return;}
        toast.current.show({severity: alert.type, summary: alert.message, life: 5000});
        dispatch(alertActions.hideAlert({ index: alerts.length - 1 }));
      }
    }
  }, [alerts, dispatch]);

  return (
    <Toast ref={toast}  position="bottom-center" />
  );

};

export default CustomAlert;
