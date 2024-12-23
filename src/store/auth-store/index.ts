import { api } from "@/lib/axios";
import { LoginFormData } from "@/modules/common/pages/login/form";
import { authService } from "@/modules/common/services/auth-service";
import { AuthToken } from "@/modules/common/types/auth";
import { User } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => {
  const token = localStorage.getItem("token");
  const isTokenValid = token
    ? jwtDecode<AuthToken>(token).exp < Date.now() / 1000
    : true;

  return {
    user: null,
    isAuthenticated: !isTokenValid,
    login: async (data) => {
      const response = await authService.login(data);
      console.log(response);
      set({
        user: {
          email: data.email,
          password: data.password,
          id: "1",
          name: "Jonh Doe",
        },
        isAuthenticated: true,
      });
      localStorage.setItem("token", response.access_token);
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    },
  };
});
