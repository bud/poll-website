import React, { createContext, useState, useContext } from "react";
import { warning } from "./alertType";

const alertContext = createContext(null);

const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [resetId, setResetId] = useState(null);

  const newAlert = (alert, time) => {
    const type = alert?.type || warning;

    setAlert({
      message: alert.message,
      type,
    });

    setResetId(
      setTimeout(() => {
        setAlert(null);
      }, time || 3000)
    );
  };

  const clearAlert = () => {
    if (resetId) {
      clearTimeout(resetId);
      setResetId(null);
    }
    if (!alert) return;
    setAlert(null);
  };

  return (
    <alertContext.Provider value={{ alert, newAlert, clearAlert }}>
      {children}
    </alertContext.Provider>
  );
};

export const useAlertContext = () => useContext(alertContext);
export default AlertContextProvider;
