import axios from "axios";
export default axios.create({
  baseURL: "http://ArkaApi.nodedotjs.ir",
  headers: {
    Authorization: localStorage.token,
  },
});
