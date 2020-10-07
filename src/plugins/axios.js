import axios from "axios";
var axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "http://arkaapi.nodedotjs.ir",

  headers: {
    Authorization: localStorage.token,
  },
});
export { axiosInstance };
