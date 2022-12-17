import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/Forms/textInput";
import { useAlertContext } from "../context/alert/alertContext";
import { useUserContext } from "../context/user/userContext";
import { error, success, warning } from "../context/alert/alertType";
import { createPoll } from "../services/pollService";

const CreatePoll = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const questionRef = useRef(null);
  const [answers, setAnswers] = useState([""]);
  const navigate = useNavigate();

  // userContext
  const { userState } = useUserContext();

  // ForceUpdate Mechanic
  const [, upd] = useState(false);
  const forceUpdate = () => upd((state) => !state);

  // alert
  const { newAlert } = useAlertContext();

  const validateForm = () => {
    let focusField = null;
    let errorMsg = [];
    if (titleRef.current.value === "") {
      errorMsg.push(" Title");
      if (focusField === null) focusField = titleRef.current;
    }
    if (questionRef.current.value === "") {
      errorMsg.push(" Question");
      if (focusField === null) focusField = questionRef.current;
    }

    if (focusField) {
      focusField.focus();
      newAlert(
        {
          message: errorMsg.reduce((acc, item, i) => {
            if (i === 0) return acc + item;
            return `${acc},${item}`;
          }, "Please include"),
          type: warning,
        },
        5000
      );
      return false;
    }
    return true;
  };

  const createPollHandler = () => {
    if (validateForm() === false) return;
    const pollData = {
      rcs_id: userState.rcs_id,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      question: questionRef.current.value,
      answers,
    };

    const apiCall = async () => {
      console.log(pollData);
      await createPoll(pollData);
    };

    apiCall()
      .then(() => {
        newAlert({ message: "New Poll Created", type: success }, 5000);
        setTimeout(() => {
          navigate("/polls/yourpoll");
        }, 4000);
      })
      .catch((err) => {
        console.error(err);
        newAlert({ message: "Failed to create a poll", type: error }, 4000);
      });
  };

  return (
    <>
      <header className="text-headline-lg">Create Poll</header>
      <div className="grid grid-cols-12 gap-3 p-6 overflow-auto scrollbar-hide">
        <TextInput ref={titleRef} name="Title" required />
        <TextInput ref={descriptionRef} name="Description" />
        <TextInput ref={questionRef} name="Question" required />

        <div className="list-input-label">Answers</div>
        <div className="col-start-5 col-span-8 flex flex-col gap-3">
          {answers.map((ans, i) => {
            return (
              <span
                key={`answer-${i}`}
                className="w-full relative inline-flex items-center"
              >
                <input
                  className="list-input-field"
                  type="text"
                  value={ans}
                  placeholder="Sample Choice"
                  onChange={(e) => {
                    setAnswers((ans) => {
                      ans[i] = e.target.value;
                      return ans;
                    });
                    forceUpdate();
                  }}
                ></input>
                <span
                  className="absolute right-3 text-rose-600"
                  onClick={() => {
                    setAnswers((ans) => ans.filter((ans, idx) => i !== idx));
                    forceUpdate();
                  }}
                >
                  <CloseIcon />
                </span>
              </span>
            );
          })}
        </div>
        <input
          type="button"
          value="Add More Answer"
          className="w-full py-3 px-5 col-start-5 col-span-8 btn btn-light-primary text-center"
          onClick={() => {
            setAnswers((answers) => [...answers, ""]);
          }}
        />
      </div>
      <div className="flex gap-6 justify-end sm:mb-12">
        <input
          type="button"
          value="Cancel"
          className="btn btn-light-primary"
          onClick={() => {
            navigate("/polls/yourpoll");
          }}
        />
        <input
          type="button"
          value="Create Poll"
          className="btn btn-primary"
          onClick={createPollHandler}
        />
      </div>
    </>
  );
};

export default CreatePoll;
