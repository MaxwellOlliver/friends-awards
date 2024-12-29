import { CreateSocketParams, Socket } from "./types";

export function createSocket<TEventDataMap extends Record<string, any>>({
  url,
  autoConnect = true,
}: CreateSocketParams): Socket<TEventDataMap> {
  let socket: WebSocket | null = autoConnect
    ? new WebSocket(typeof url === "function" ? url() : url)
    : null;
  const listeners = new Map<string, ((data?: any) => void)[]>();

  function setupSocketListeners() {
    if (!socket) {
      console.error("Socket is not initialized. Call connect() first.");
      return;
    }

    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      if (!eventData.event || !eventData.data) {
        console.error("Invalid event data received.");
        return;
      }

      const eventListeners = listeners.get(eventData.event);

      if (eventListeners) {
        eventListeners.forEach((listener) => listener(eventData.data));
      }
    };

    socket.onopen = () => {
      listeners.get("connect")?.forEach((listener) => listener());
    };

    socket.onclose = () => {
      listeners.get("disconnect")?.forEach((listener) => listener());
    };
  }

  function connect() {
    if (!autoConnect && (!socket || socket.readyState === WebSocket.CLOSED)) {
      socket = new WebSocket(typeof url === "function" ? url() : url);

      setupSocketListeners();
    }
  }

  function send<TEvent extends keyof TEventDataMap>(args: {
    event: TEvent;
    data: TEventDataMap[TEvent];
  }) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("Socket is not connected.");
      return;
    }

    socket.send(JSON.stringify(args));
  }

  function on<TEvent extends keyof TEventDataMap>(
    event: TEvent,
    callback: (data: TEventDataMap[TEvent]) => void
  ) {
    const eventName = event as string;

    if (!listeners.has(eventName)) {
      listeners.set(eventName, []);
    }

    const eventListeners = listeners.get(eventName);

    if (eventListeners) {
      eventListeners.push(callback);
    }
  }

  function emit<TEvent extends keyof TEventDataMap>(
    event: TEvent,
    data: TEventDataMap[TEvent]
  ) {
    send({ event, data });
  }

  function disconnect() {
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }

      listeners.forEach((_, event) => {
        listeners.delete(event);
      });
    }
  }

  if (autoConnect) {
    connect();
  }

  return {
    connect,
    disconnect,
    on,
    emit,
    listeners,
  };
}
