import { createSocket, SocketEventMap } from "@/lib/socket";
import { emotes } from "@/modules/session/constants/emotes";
import { SocketEvents } from "@/modules/session/constants/socket-events";
import { Participant } from "@/modules/session/contexts/session-context/types";
import {
  Category,
  GameDataState,
  Nominee,
} from "@/modules/session/types/session";

export interface CustomSocketEventMap extends SocketEventMap {
  [SocketEvents.JOIN_SESSION]: {
    sessionId: string;
  };
  [SocketEvents.CONNECTED_USERS]: {
    participants: string[];
    userId: string;
    action: "connect" | "disconnect";
  };
  [SocketEvents.NEW_PARTICIPANT]: {
    participant: Participant;
  };
  [SocketEvents.EMOTE]: {
    from: string;
    emote: (typeof emotes)[number]["code"];
    sessionId: string;
  };
  [SocketEvents.VOTING_STARTED]: {
    category: Category;
  };
  [SocketEvents.SESSION_STATE_CHANGED]: {
    state: GameDataState;
  };
  [SocketEvents.VOTE_SUBMITTED]: {
    category: Category;
    participantId: string;
    nominee: Nominee;
  };
}

export const socket = createSocket<CustomSocketEventMap>({
  url: () => {
    const token = localStorage.getItem("token");

    return `${import.meta.env.VITE_API_URL}/ws?token=${token}`;
  },
  autoConnect: false,
});
