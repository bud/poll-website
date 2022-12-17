import axiosClient from "./apiClient";

export async function getAllPoll(controller, options) {
  return axiosClient
    .get("poll/get_all_polls", {
      params: {
        limit: 10,
        offset: 0,
        ...options,
      },
      signal: controller.signal,
    })
    .then((res) => res?.data.polls);
}

export async function getAllPollCreatedBy(userId, controller) {
  return axiosClient
    .get(`/poll/get_polls_by_user`, {
      params: {
        rcs_id: userId,
      },
      signal: controller.signal,
    })
    .then((res) => res?.data.polls);
}

export async function getPollById(pollId, controller) {
  return axiosClient
    .get("/poll/get_poll_by_id", {
      params: {
        id: pollId,
      },
      signal: controller.signal,
    })
    .then((res) => res?.data);
}

export async function getPollByTitle(title, controller) {
  return axiosClient
    .get("/poll/get_polls_by_title", {
      params: {
        title,
      },
      signal: controller.signal,
    })
    .then((res) => res?.data);
}

export async function getPollStatistics(pollId, controller) {
  return axiosClient
    .get("/poll/get_poll_statistics", {
      params: {
        poll_id: pollId,
      },
      signal: controller.signal,
    })
    .then((res) => res?.data);
}

export async function getVotedPolls(userId, controller) {
  return axiosClient
    .get("/poll/get_polls_answered_by_user", {
      params: {
        user_id: userId,
      },
      signal: controller.signal,
    })
    .then((res) => res?.data.polls);
}

export async function createPoll(pollData) {
  return axiosClient
    .post("/poll/create_poll", pollData)
    .then((res) => res?.data);
}

export async function editPoll(pollData) {
  return axiosClient.post("/poll/edit_poll", pollData).then((res) => res?.data);
}

export async function deletePoll(pollId, currentUser) {
  return axiosClient
    .delete("/poll/delete_poll", {
      data: {
        poll_id: pollId,
        rcs_id: currentUser,
      },
    })
    .then((res) => res?.data);
}

export async function votePoll(answer) {
  return axiosClient
    .post("answer/submit_answer", answer)
    .then((res) => res?.data);
}
