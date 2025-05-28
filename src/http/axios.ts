import { authService } from "@/modules/common/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const pendingRequests = new Set<() => void>();
let isRefreshing = false;

export const setupToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getErrorResponse = (error: AxiosError) => {
  return error.response?.data as { message: string };
};

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.add(() => resolve(api(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return authService
        .refreshToken()
        .then((res) => {
          localStorage.setItem("token", res.accessToken);
          originalRequest.headers["Authorization"] =
            `Bearer ${res.accessToken}`;

          pendingRequests.forEach((request) => request());
          pendingRequests.clear();

          return api(originalRequest);
        })
        .catch((error) => {
          useAuthStore.getState().logout();

          return Promise.reject(error);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
