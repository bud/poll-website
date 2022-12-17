import React, { useEffect } from "react";
import PollList from "../components/Poll/pollList";
import { LOAD_POLL, PULL_POLL } from "../context/actions";
import { usePollContext } from "../context/polls/pollContext";
import { useUserContext } from "../context/user/userContext";
import { getVotedPolls } from "../services/pollService";

const History = () => {
  const { userState } = useUserContext();
  const { pollDispatch } = usePollContext();

  useEffect(() => {
    const controller = new AbortController();
    pollDispatch({ type: LOAD_POLL });
    const fetch = async () => {
      const votedPoll = await getVotedPolls(userState.id, controller);
      pollDispatch({ type: PULL_POLL, payload: votedPoll });
    };
    fetch().catch(console.error);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <header className="text-headline-lg">Vote History</header>
      <PollList />
    </>
  );
};

export default History;
