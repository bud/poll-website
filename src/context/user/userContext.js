import { useReducer, useContext, createContext } from "react";
import { userReducerFunction } from "./userReducer";

const initialUserState = {
  // id: 2,
  // rcs_id: "loetsp",
};

const userContext = createContext(initialUserState);

const UserContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(
    userReducerFunction,
    initialUserState
  );

  return (
    <userContext.Provider value={{ userState, userDispatch }}>
      {children}
    </userContext.Provider>
  );
};
export default UserContextProvider;
export const useUserContext = () => useContext(userContext);
