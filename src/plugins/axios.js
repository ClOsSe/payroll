import axios from "axios";
var axiosInstance = axios.create({
  baseURL: "http://arkaapi.nodedotjs.ir",
  // baseURL: "localhost:8080/",

  headers: {
    Authorization: localStorage.token,
  },
});
export { axiosInstance };
