import { Category, GameData, Session } from "../../types/session";
import { Participant } from "../../contexts/session-context/types";

interface CreateSessionPayload {
  name: string;
}

interface JoinSessionResponse {
  session: {
    id: string;
  };
}

interface GetSessionResponse {
  session: Session;
  categories: Category[];
  pin: string;
}

interface GetSessionParticipantResponse {
  participants: Participant[];
}

export interface SessionServiceDescriptor {
  createSession: (data: CreateSessionPayload) => Promise<any>;
  deleteSession: (id: string) => Promise<void>;
  getSession: (id: string) => Promise<GetSessionResponse>;
  getSessionGameData: (id: string) => Promise<GameData>;
  getSessions: () => Promise<Session[]>;
  getCategories: (id: string) => Promise<Category[]>;
  getParticipants: (id: string) => Promise<GetSessionParticipantResponse>;
  updateSession: (id: string, data: any) => Promise<any>;
  joinSession: (code: string) => Promise<JoinSessionResponse>;
}
