import { SocketEvents } from "../constants/socket-events";

export interface SocketEventMap {
  connect: undefined;
  disconnect: undefined;
}

export interface CustomSocketEventMap extends SocketEventMap {
  [SocketEvents.JOIN_SESSION]: {
    sessionId: string;
  };
  [SocketEvents.CONNECTED_USERS]: {
    participants: string[];
  };
}
