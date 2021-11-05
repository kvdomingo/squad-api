import axios from "axios";
import Pizzly from "pizzly-js";

const baseURL = "/api/v1.0/";

const axiosInstance = axios.create({ baseURL });

const api = {
  home: {
    events() {
      return axiosInstance.get("event/");
    },
    birthdays() {
      return axiosInstance.get("birthday/");
    },
    biases(id) {
      return axiosInstance.get(`user/${id}/bias/`);
    },
  },
  user: {
    get(id) {
      return axiosInstance.get(`user/${id}/`);
    },
    create(body) {
      return axiosInstance.post("user/", body);
    },
    update(id, body) {
      return axiosInstance.patch(`user/${id}/`, body);
    },
  },
};

const pizzly = new Pizzly({ host: "https://pizzly-central.herokuapp.com" });

const auth = pizzly.integration("discord");

export default api;

export { auth };
