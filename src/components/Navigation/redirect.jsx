import { useUserContext } from "../../context/user/userContext";
import { Navigate } from "react-router-dom";

const Redirect = () => {
  const { userState } = useUserContext();
  const { id } = userState;

  if (id !== null && id !==undefined) return <Navigate to="/polls" replace />;
  return <Navigate to="/login" replace />;
};

export default Redirect;
