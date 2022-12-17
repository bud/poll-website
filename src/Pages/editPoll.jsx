import React, { useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "../components/Forms/textInput";
import { useNavigate, useParams } from "react-router-dom";
import { error, success } from "../context/alert/alertType";
import { editPoll, getPollById } from "../services/pollService";
import { useUserContext } from "../context/user/userContext";
import { useAlertContext } from "../context/alert/alertContext";

const EditPoll = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const questionRef = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPollData, setCurrentPoll] = useState(null);

  const navigate = useNavigate();

  // ForceUpdate Mechanic
  const [, upd] = useState(false);
  const forceUpdate = () => upd((state) => !state);

  // Context
  const { newAlert } = useAlertContext();
  const { userState } = useUserContext();

  // Extracting poll data
  const { id: pollId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetch = async () => {
      const pollData = await getPollById(pollId, controller);

      if (pollData === undefined) return;

      setCurrentPoll(pollData.poll);
      setAnswers(pollData.poll.answers);
      setLoading(false);
    };

    fetch().catch((err) => {
      console.error(err);
      newAlert({ message: "Unable to edit this poll", type: error }, 3000);
      navigate("/polls");
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

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
          type: error,
        },
        5000
      );
      return false;
    }
    return true;
  };

  const editPollHandler = () => {
    if (validateForm() === false) return;
    const pollData = {
      id: pollId,
      rcs_id: userState.rcs_id,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      question: questionRef.current.value,
      answers,
    };

    const apiCall = async () => {
      await editPoll(pollData);
    };

    apiCall()
      .then(() => {
        newAlert({ message: "Poll successfully edited", type: success }, 3000);
        setTimeout(() => {
          navigate("/polls/yourpoll");
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        newAlert({ message: "Failed to edit a poll", type: error }, 4000);
      });
  };

  return (
    <>
      <header className="text-headline-lg">Edit Poll</header>
      {loading === false ? (
        <>
          <div className="grid grid-cols-12 gap-3 p-6 overflow-auto scrollbar-hide">
            <TextInput
              ref={titleRef}
              name="Title"
              value={currentPollData.title}
              required
            />
            <TextInput
              ref={descriptionRef}
              name="Description"
              value={currentPollData.description}
            />
            <TextInput
              ref={questionRef}
              name="Question"
              value={currentPollData.question}
              required
            />

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
                        setAnswers((ans) =>
                          ans.filter((ans, idx) => i !== idx)
                        );
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
                navigate(-1);
              }}
            />
            <input
              type="button"
              value="Done"
              className="btn btn-primary"
              onClick={editPollHandler}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditPoll;
