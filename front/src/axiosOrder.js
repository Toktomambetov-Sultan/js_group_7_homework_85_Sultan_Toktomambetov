import axios from "axios";

const axiosOrder = axios.create({
  baseURL: "http://localhost:8000",
});

export default axiosOrder;
