import { useAuthStore } from "@/store/auth-store";
import { redirect } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setupToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getErrorResponse = (error: AxiosError) => {
  return error.response?.data as { message: string };
};

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }

    return Promise.reject(error);
  }
);
