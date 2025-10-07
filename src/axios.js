import axios from "axios";

const instance = axios.create({
  baseURL: "https://6729a9d66d5fa4901b6ddaef.mockapi.io",
  headers: { "Content-Type": "application/json" },
});

export default instance;
