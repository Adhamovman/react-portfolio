import axios from "axios";
import { ENDPOINT, TOKEN } from "../const";

const token = localStorage.getItem(TOKEN);

export const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 15000,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
