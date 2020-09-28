import axios from "axios";
export default axios.create({
  baseURL: "loaclhost:8080",
  headers: {
    Authorization: localStorage.token,
  },
});
