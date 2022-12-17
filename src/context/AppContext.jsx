import UserContextProvider from "./user/userContext";
import PollContextProvider from "./polls/pollContext";
import AlertContextProvider from "./alert/alertContext";

const AppContext = ({ children }) => {
  return (
    <UserContextProvider>
      <PollContextProvider>
        <AlertContextProvider>{children}</AlertContextProvider>
      </PollContextProvider>
    </UserContextProvider>
  );
};

export default AppContext;
