import axios from "axios";

export default function apiClient() {

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
  });

  return apiClient;
}
