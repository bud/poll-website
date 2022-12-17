import React from "react";
import { usePollContext } from "../../context/polls/pollContext";
import PollPreview from "./pollPreview";

const PollList = () => {
  const { pollState } = usePollContext();

  if (pollState.loading) {
    // TODO: Change this to skeleton
    return <div>Loading</div>;
  }

  const pollLength = pollState.polls?.length ? pollState.polls.length : 0;

  return (
    <div className="flex flex-col gap-6 overflow-y-auto grow scrollbar-hide">
      {pollLength === 0 ? (
        // TODO: Change this to not-found icon
        <div>No content</div>
      ) : (
        pollState.polls.map((poll) => {
          if (!poll.is_open) return null;
          return <PollPreview key={poll.id} poll={poll} />;
        })
      )}
    </div>
  );
};

export default PollList;
