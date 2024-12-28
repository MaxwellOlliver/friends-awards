import { io } from "socket.io-client";

export const socket = io(import.meta.env.BASE_URL, {
  autoConnect: false,
});
