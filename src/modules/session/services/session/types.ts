import { Categories } from "@/types/categories";
import { GameData, Session } from "../../types/session";
import { User } from "@/modules/common/types/account";

interface CreateSessionPayload {
  name: string;
}

interface JoinSessionResponse {
  sessionId: string;
}

export interface SessionServiceDescriptor {
  createSession: (data: CreateSessionPayload) => Promise<any>;
  deleteSession: (id: string) => Promise<void>;
  getSession: (id: string) => Promise<Session>;
  getSessionGameData: (id: string) => Promise<GameData>;
  getSessions: () => Promise<Session[]>;
  getCategories: (id: string) => Promise<Categories>;
  getParticipants: (id: string) => Promise<User[]>;
  updateSession: (id: string, data: any) => Promise<any>;
  joinSession: (code: string) => Promise<JoinSessionResponse>;
}
