import { LoginFormData } from "@/modules/common/pages/login/form";
import { User } from "@/types/user";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
}
