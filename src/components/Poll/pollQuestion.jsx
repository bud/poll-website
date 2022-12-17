import React from "react";

const PollQuestion = ({ question, selectedChoice, setChoice }) => {
  const { question: description, answers } = question;

  return (
    <div className="flex flex-col gap-6 grow overflow-auto scrollbar-hide">
      <h2>{description}</h2>
      <div className="grid gap-4 grid-cols-1">
        {answers.map((ans, i) => {
          return (
            <div
              key={`answer-${i}`}
              className={`poll-choice${
                selectedChoice === i ? " selected" : ""
              }`}
              onClick={() => setChoice(i)}
            >
              {ans}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollQuestion;
