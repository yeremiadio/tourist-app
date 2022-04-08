import axios from "axios";

export default function apiClient() {

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // apiClient.interceptors.request.use(function (config) {
  //   const token = (store.getState() as RootState).auth.user.token;
  //   config.headers!.Authorization = token ? `Bearer ${token}` : "";
  //   return config;
  // });

  return apiClient;
}
