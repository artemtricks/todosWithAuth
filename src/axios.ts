import axios from "axios";

const instance = axios.create({
  baseURL: "https://efccf8c1b1d51061.mokky.dev",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default instance;
