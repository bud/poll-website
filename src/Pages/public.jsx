import React from "react";
import { useEffect } from "react";
import PollList from "../components/Poll/pollList";
import { PULL_POLL, LOAD_POLL } from "../context/actions";
import { usePollContext } from "../context/polls/pollContext";
import { getAllPoll } from "../services/pollService";

const Public = () => {
  const { pollDispatch } = usePollContext();

  useEffect(() => {
    const controller = new AbortController();
    pollDispatch({ type: LOAD_POLL });

    const fetch = async () => {
      const polls = await getAllPoll(controller);
      pollDispatch({ type: PULL_POLL, payload: polls });
    };

    fetch().catch((err) => {
      console.error(err);
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <header className="text-headline-lg">Public Polls</header>
      <PollList />
    </>
  );
};

export default Public;
