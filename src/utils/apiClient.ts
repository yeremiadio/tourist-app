import axios from "axios";

export default function apiClient() {

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers!.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem('token')
        return Promise.reject();
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
}
