import axios from "redaxios";

const instance = axios.create({
  baseURL: "/api",
});

export default instance;
