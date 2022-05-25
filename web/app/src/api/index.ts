import axios from "axios";

const baseURL = "/api/v1.0";

const axiosInstance = axios.create({ baseURL });

const api = {
  home: {
    events() {
      return axiosInstance.get("event");
    },
    birthdays() {
      return axiosInstance.get("birthday");
    },
  },
};

export default api;
