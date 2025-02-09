import { api } from "@/http/axios";
import { GameDataDescriptor } from "./types";

export const gameDataService = {
  startVoting: async (sessionId: string) => {
    return api.post(`/sessions/${sessionId}/vote/start`);
  },
  vote: async (sessionId: string, nomineeId: string) => {
    return api.post(`/sessions/${sessionId}/vote`, { nomineeId });
  },
  finishVoting: async (sessionId: string) => {
    return api.post(`/sessions/${sessionId}/game/voting/finish`);
  },
} satisfies GameDataDescriptor;
