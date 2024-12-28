export enum SessionState {
  CREATED = "CREATED",
  OPENED = "OPENED",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}

export type Session = {
  id: string;
  name: string;
  hostId: string;
  pin: string;
  createdAt: string;
  state: SessionState;
};

export type GameData = {
  id: string;
  sessionId: string;
  state: string;
  connectedUsers: string[];
  registeredVotes: Record<string, string[]>;
  createdAt: string;
};
