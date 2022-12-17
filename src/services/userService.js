import axiosClient from "./apiClient";

export async function createUser(userData) {
  return axiosClient.post(`/user/sign_up`, userData).then((res) => res?.data);
}

export async function loginUser(userCredential) {
  return axiosClient
    .post("/user/log_in", userCredential)
    .then((res) => res?.data);
}

export async function getUserData(userId, controller) {
  return axiosClient
    .get("/user/get_user_by_id", {
      params: {
        user_id: userId,
      },
      signal: controller.signal,
    })
    .then((res) => res?.data);
}
