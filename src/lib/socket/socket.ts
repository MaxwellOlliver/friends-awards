import { CustomSocketEventMap } from "@/modules/session/types/socket";
import { createSocket } from "./lib";

export const socket = createSocket<CustomSocketEventMap>({
  url: () => {
    const token = localStorage.getItem("token");

    return `ws://localhost:3001/ws`;
  },
  autoConnect: false,
});
