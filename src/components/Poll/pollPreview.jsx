import React, { useState, useEffect } from "react";
import { getUserData } from "../../services/userService";
import { useUserContext } from "../../context/user/userContext";
import { preview, edit } from "./previewType";
import PollPreviewFooter from "./pollPreviewFooter";

const PollPreview = ({ poll }) => {
  const { title: pollTitle, description, id, user_id } = poll;
  const [rcs_id, setRcs_id] = useState("");
  const { userState } = useUserContext();

  const determineAuthority = (owner) => {
    if (owner === userState.id) return edit;
    return preview;
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      const userData = await getUserData(user_id, controller);
      setRcs_id(userData?.user?.rcs_id || "");
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
    <article className="flex flex-col gap-6 p-4 w-full h-fit max-w-4xl bg-white rounded-sm">
      <header className="flex gap-6 items-center">
        <p className="text-title-lg">{pollTitle}</p>
        <p className="text-body-lg">{`By ${rcs_id}`}</p>
      </header>
      <p className="text-body-lg w-full">{description}</p>

      <PollPreviewFooter type={determineAuthority(user_id)} pollID={id} />
    </article>
  );
};

export default PollPreview;
