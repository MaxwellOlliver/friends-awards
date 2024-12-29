import { createSocket, SocketEventMap } from "@/lib/socket";
import { emotes } from "@/modules/session/constants/emotes";
import { SocketEvents } from "@/modules/session/constants/socket-events";
import { Participant } from "@/modules/session/contexts/session-context/types";

export interface CustomSocketEventMap extends SocketEventMap {
  [SocketEvents.JOIN_SESSION]: {
    sessionId: string;
  };
  [SocketEvents.CONNECTED_USERS]: {
    participants: string[];
  };
  [SocketEvents.NEW_PARTICIPANT]: {
    participant: Participant;
  };
  [SocketEvents.EMOTE]: {
    from: string;
    emote: (typeof emotes)[number]["code"];
    sessionId: string;
  };
}

export const socket = createSocket<CustomSocketEventMap>({
  url: () => {
    const token = localStorage.getItem("token");

    return `${import.meta.env.VITE_API_URL}/ws?token=${token}`;
  },
  autoConnect: false,
});
