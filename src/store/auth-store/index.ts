import { api } from "@/http/axios";
import { LoginFormData } from "@/modules/common/pages/login/form";
import { accountService } from "@/modules/common/services/account-service";
import { authService } from "@/modules/common/services/auth-service";
import { User } from "@/modules/common/types/account";
import { AuthToken } from "@/modules/common/types/auth";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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

      localStorage.setItem("token", response.accessToken);

      const { participant } = await accountService.getLoggedProfile();

      set({
        user: participant,
        isAuthenticated: true,
      });
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    },
    setUser: (user) => set({ user }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  };
});
