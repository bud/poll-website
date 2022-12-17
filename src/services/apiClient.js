import axios from "axios";

// axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(function (request) {
  if (request.headers) {
    request.headers.Authorization =
      "Bearer " + localStorage.getItem("api_token");
  }
  return request;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.code === "ERR_CANCELED") return;

    let res = error.response;
    console.warn(error);
    if (res.status === 401) {
      window.location.href = `/login`;
    }
    console.error(`${res.status}: ${error}`);
    return Promise.reject(error);
  }
);

export default axiosClient;
