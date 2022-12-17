import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PollList from "../components/Poll/pollList";
import { PULL_POLL, LOAD_POLL } from "../context/actions";
import { usePollContext } from "../context/polls/pollContext";
import { useUserContext } from "../context/user/userContext";
import { getAllPollCreatedBy } from "../services/pollService";

const Yourpoll = () => {
  const { userState } = useUserContext();
  const { pollDispatch } = usePollContext();

  useEffect(() => {
    const controller = new AbortController();
    pollDispatch({ type: LOAD_POLL });

    const fetch = async () => {
      const yourPolls = await getAllPollCreatedBy(userState.rcs_id, controller);
      pollDispatch({ type: PULL_POLL, payload: yourPolls });
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
      <header className="flex">
        <h1 className="text-headline-lg grow">Your Poll</h1>
        <Link to="/polls/create" className="btn btn-primary">
          Create New Poll
        </Link>
      </header>
      <PollList />
    </>
  );
};

export default Yourpoll;
