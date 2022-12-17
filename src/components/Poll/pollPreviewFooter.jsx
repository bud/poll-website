import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DELETE_POLL } from "../../context/actions";
import { useAlertContext } from "../../context/alert/alertContext";
import { success } from "../../context/alert/alertType";
import { usePollContext } from "../../context/polls/pollContext";
import { useUserContext } from "../../context/user/userContext";
import { deletePoll, getPollStatistics } from "../../services/pollService";
import { mini } from "../../utilities/number";
import { edit, history, preview } from "./previewType";

const PollPreviewFooter = ({ pollID, type }) => {
  const [deleteDialog, setDialog] = useState(false);
  const [voted, setVoted] = useState(0);
  const { pollDispatch } = usePollContext();

  // Context
  const { userState } = useUserContext();
  const { newAlert } = useAlertContext();

  const openDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };

  const deletePollHandler = (pollId) => {
    const del = async () => {
      await deletePoll(pollId, userState.rcs_id);
    };
    del().then(() => {
      newAlert({ message: "Poll deleted successfully", type: success }, 3000);
      pollDispatch({ type: DELETE_POLL, payload: parseInt(pollId) });
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      const stat = await getPollStatistics(pollID, controller);
      setVoted(stat?.total_votes || 0);
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
    <div className="flex items-center w-full">
      <p className="flex-grow">{mini(voted)} Voted</p>
      <div className="flex gap-6">
        {type === preview ? (
          <Link to={`/polls/${pollID}`} className="btn btn-primary">
            Vote Now
          </Link>
        ) : null}
        {type === history ? (
          <div className="btn btn-primary disable">Already Voted</div>
        ) : null}
        {type === edit ? (
          <>
            <Link to={`/polls/${pollID}`} className="btn btn-primary">
              Vote Now
            </Link>
            <Link
              to={`/polls/${pollID}/edit`}
              className="btn btn-light-primary"
            >
              Edit
            </Link>
            <div className="btn btn-secondary" onClick={() => openDialog()}>
              Delete
            </div>
          </>
        ) : null}
      </div>
      {deleteDialog === true ? (
        <div
          className="absolute w-screen h-screen bg-black bg-opacity-30 top-0 left-0 flex justify-center items-center"
          onClick={closeDialog}
        >
          <div
            className="bg-white p-8 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h5 className="text-title-lg mb-4">Delete the poll</h5>
            <p className="text-body-md mb-6">
              Do you want to delete this poll? (This action cannot be undone)
            </p>

            <div className="flex justify-end gap-4">
              <div className="btn btn-light-primary" onClick={closeDialog}>
                Cancel
              </div>
              <div
                className="btn btn-secondary"
                onClick={() => deletePollHandler(pollID)}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PollPreviewFooter;
