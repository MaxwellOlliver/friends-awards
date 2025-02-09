import { Category } from "../../types/session";

interface StartVotingResponse {
  category: Category;
}

export interface GameDataDescriptor {
  startVoting: (sessionId: string) => Promise<StartVotingResponse>;
  vote: (sessionId: string, nomineeId: string) => Promise<void>;
  finishVoting: (sessionId: string) => Promise<void>;
}
