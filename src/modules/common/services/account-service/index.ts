import { api } from "@/lib/axios";
import { AccountServiceDescriptor } from "./types";

const BASE_URL = "/participants";

export const accountService = {
  createAccount: async (data) => {
    return api.post(BASE_URL, data);
  },
} satisfies AccountServiceDescriptor;
