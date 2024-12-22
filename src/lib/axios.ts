import { useAuthStore } from "@/store/auth-store";
import { Redirect } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setupToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setupAxios = (redirect: () => Redirect<any, any>) => {
  console.log("[DEBUG] Axios has been set up successfully.");
  const token = localStorage.getItem("token");

  if (token) {
    setupToken(token);
  }

  const id = api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        redirect();
      }

      return Promise.reject(error);
    }
  );

  return () => {
    delete api.defaults.headers.common["Authorization"];
    api.interceptors.response.eject(id);
  };
};

export const getErrorResponse = (error: AxiosError) => {
  return error.response?.data as { message: string };
};
