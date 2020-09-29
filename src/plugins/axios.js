import axios from "axios";
var axiosInstance = axios.create({
  baseURL: "http://arkaapi.nodedotjs.ir",
  headers: {
    Authorization: localStorage.token,
  },
});
export { axiosInstance };
