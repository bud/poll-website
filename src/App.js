import { Route, Routes } from "react-router-dom";
import AppContext from "./context/AppContext";
import Screen from "./components/Screen/screen";
import Redirect from "./components/Navigation/redirect";
import Login from "./Pages/login"
import Public from "./Pages/public";
import History from "./Pages/history";
import Yourpoll from "./Pages/yourpoll";
import Poll from "./Pages/poll";
import CreatePoll from "./Pages/createPoll";
import EditPoll from "./Pages/editPoll";
import Logout from "./Pages/logout";

function App() {
  return (
    <AppContext>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="login" element={<Login />} />
        <Route path="polls" element={<Screen />}>
          <Route index element={<Public />} />
          <Route path=":id">
            <Route index element={<Poll />} />
            <Route path="edit" element={<EditPoll />} />
          </Route>
          <Route path="history" element={<History />} />
          <Route path="yourpoll" element={<Yourpoll />} />
          <Route path="create" element={<CreatePoll />} />
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
    </AppContext>
  );
}

export default App;
