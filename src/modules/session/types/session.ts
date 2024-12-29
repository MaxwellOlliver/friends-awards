export enum SessionState {
  CREATED = "CREATED",
  OPENED = "OPENED",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}

export enum GameDataState {
  WAITING = "WAITING",
  VOTING = "VOTING",
  FINISHED = "FINISHED",
}

export type Session = {
  id: string;
  name: string;
  hostId: string;
  pin: string;
  createdAt: string;
  updatedAt: string | null;
  state: SessionState;
};

export type GameData = {
  sessionId?: string;
  state?: GameDataState;
  connectedParticipants?: string[];
  registeredVotes?: Record<string, string[]>;
};

export type Nominees = {
  id: string;
  title: string;
  votes: 0;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  nominees: Nominees[];
};
