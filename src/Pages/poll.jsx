import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PollQuestion from "../components/Poll/pollQuestion";
import { useAlertContext } from "../context/alert/alertContext";
import { error, success, warning } from "../context/alert/alertType";
import { useUserContext } from "../context/user/userContext";
import { getPollById, votePoll } from "../services/pollService";

const Poll = () => {
  const [selectedChoice, setChoice] = useState(null);
  const [pollData, setCurrentPoll] = useState(null);
  const { id: pollId } = useParams();
  const { userState } = useUserContext();
  const { newAlert } = useAlertContext();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      const pollData = await getPollById(pollId, controller);
      if (pollData === undefined) return;
      setCurrentPoll(pollData.poll);
    };

    fetch().catch(console.error);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  const vote = () => {
    if (selectedChoice === null) {
      newAlert({ message: "Answer not selected", type: error }, 5000);
      return;
    }
    const submitAnswer = async () => {
      newAlert({ message: "Submitting the answer", type: warning }, 3000);
      const msg = await votePoll({
        rcs_id: userState.rcs_id,
        poll_id: pollId,
        answer: selectedChoice,
      });

      newAlert({ message: msg.message, type: success }, 3000);
    };

    submitAnswer()
      .then(() => {
        setTimeout(() => {
          navigate("/polls");
        }, 1000);
      })
      .catch(console.error);
  };

  if (pollData === null) {
    return <div>Loading</div>;
  }

  const { title, description, question, answers } = pollData;

  return (
    <>
      <header className="flex flex-col gap-6">
        <h1 className="text-headline-lg grow">{title}</h1>
        <p className="text-title-sm">{description}</p>
      </header>
      <PollQuestion
        question={{ question, answers }}
        selectedChoice={selectedChoice}
        setChoice={setChoice}
      />
      <div className="flex gap-6 justify-end sm:mb-12">
        <div className="btn btn-light-primary" onClick={() => navigate(-1)}>
          Cancel
        </div>
        <div className="btn btn-primary" onClick={() => vote()}>
          Vote
        </div>
      </div>
    </>
  );
};

export default Poll;
