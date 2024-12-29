export interface SocketEventMap {
  connect: undefined;
  disconnect: undefined;
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
  emit: <TEvent extends keyof TEventDataMap>(
    event: TEvent,
    data: TEventDataMap[TEvent]
  ) => void;
  listeners?: Map<string, ((data?: any) => void)[]>;
};
