export interface SocketEventMap {
  connect: void;
  disconnect: void;
}

export interface CreateSocketParams {
  url: string | (() => string);
  autoConnect?: boolean;
}

export type Socket<TEventDataMap extends Record<string, any>> = {
  connect: () => void;
  disconnect: () => void;
  on: <TEvent extends keyof TEventDataMap>(
    event: TEvent,
    callback: (data: TEventDataMap[TEvent]) => void
  ) => void;
  off: <TEvent extends keyof TEventDataMap>(
    event: TEvent,
    callback: (data: TEventDataMap[TEvent]) => void
  ) => void;
  emit: <TEvent extends keyof TEventDataMap>(
    event: TEvent,
    data: TEventDataMap[TEvent]
  ) => void;
};
