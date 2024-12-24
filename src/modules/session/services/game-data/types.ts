export interface GameDataDescriptor {
  startVoting: (sessionId: string, categoryId: string) => Promise<void>;
  finishVoting: (sessionId: string) => Promise<void>;
}
