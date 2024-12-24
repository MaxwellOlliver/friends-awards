import { api } from "@/lib/axios";
import { GameDataDescriptor } from "./types";

export const gameDataService = {
  startVoting: async (sessionId: string, categoryId: string) => {
    return api.post(`/session/${sessionId}/game/voting`, { categoryId });
  },
  finishVoting: async (sessionId: string) => {
    return api.post(`/session/${sessionId}/game/voting/finish`);
  },
} satisfies GameDataDescriptor;
