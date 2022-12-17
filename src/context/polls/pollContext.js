import { createContext, useContext, useReducer } from "react";
import { pollReducerFunction } from "./pollReducer";

const initialPoll = {
  polls: [
    {
      id: 1,
      user_id: 2,
      title: "Poll Name",
      description: "poll description",
      question: "Question Description",
      answers: ["Question Choice #1", "Question Choice #2"],
      is_open: true,
    },
  ],
  selected: null,
  loading: false,
};

const pollContext = createContext(initialPoll);

const PollContextProvider = ({ children }) => {
  const [pollState, pollDispatch] = useReducer(
    pollReducerFunction,
    initialPoll
  );

  return (
    <pollContext.Provider value={{ pollState, pollDispatch }}>
      {children}
    </pollContext.Provider>
  );
};

export default PollContextProvider;

export const usePollContext = () => useContext(pollContext);
