import axios from "axios";
var axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: localStorage.token,
  },
});
export { axiosInstance }
