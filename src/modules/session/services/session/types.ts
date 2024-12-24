import { Session } from "../../types/session";

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
  getSessions: () => Promise<Session[]>;
  updateSession: (id: string, data: any) => Promise<any>;
  joinSession: (code: string) => Promise<JoinSessionResponse>;
}
