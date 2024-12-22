import { api } from "@/lib/axios";
import { AuthServiceDescriptor } from "./types";

const BASE_URL = "/authenticate";

export const authService = {
  login: async (data) => {
    return api.post(BASE_URL, data);
  },
} satisfies AuthServiceDescriptor;
