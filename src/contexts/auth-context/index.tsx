import { createContext, useContext, useState } from "react";
import { AuthContextType } from "./types";
import { User } from "@/types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const login = async (data: { email: string; password: string }) => {
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const loggedUser = {
      email: data.email,
      id: "1",
      name: "John Doe",
      password: data.password,
    };
    setUser({
      email: data.email,
      id: "1",
      name: "John Doe",
      password: data.password,
    });
    localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
