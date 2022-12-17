import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAlertContext } from "../../context/alert/alertContext";

const icon = {
  success: TaskAltIcon,
  warning: WarningAmberIcon,
  error: ErrorOutlineIcon,
};

const AlertOverlay = () => {
  const { alert, clearAlert } = useAlertContext();

  if (alert === null) return null;

  const IconComponent = icon[alert.type];
  return (
    <div className={`alertOverlay text-label-lg ${alert.type}`}>
      <div className="icon">
        <IconComponent />
      </div>
      <span>{alert.message}</span>
      <div className="close" onClick={clearAlert}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default AlertOverlay;
