import { api } from "@/http/axios";
import { AuthServiceDescriptor } from "./types";

const BASE_URL = "/participants/password";

export const authService = {
  login: async (data) => {
    return api.post(BASE_URL, data);
  },
} satisfies AuthServiceDescriptor;
