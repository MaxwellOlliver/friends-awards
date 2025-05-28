import { api } from "@/http/axios";
import { SessionServiceDescriptor } from "./types";

const BASE_URL = "/sessions";

export const sessionService = {
  createSession: async (data) => {
    return api.post(BASE_URL, data);
  },
  deleteSession: async (id) => {
    return api.delete(`${BASE_URL}/${id}`);
  },
  getSession: async (id) => {
    return api.get(`${BASE_URL}/${id}`);
  },
  getSessions: async () => {
    return api.get(BASE_URL);
  },
  updateSession: async (id, data) => {
    return api.put(`${BASE_URL}/${id}`, data);
  },
  joinSession: async (pin) => {
    return api.post(`${BASE_URL}/join`, { pin });
  },
  getSessionGameData(id) {
    return api.get(`${BASE_URL}/${id}/game-state`);
  },
  getCategories(id) {
    return api.get(`${BASE_URL}/${id}/categories`);
  },
  getParticipants(id) {
    return api.get(`${BASE_URL}/${id}/participants`);
  },
} satisfies SessionServiceDescriptor;
