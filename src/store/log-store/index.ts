import { create } from "zustand";

type Log = {
  text: string;
  createdAt: Date;
};

interface LogStore {
  logs: Log[];
  addLog: (text: string) => void;
}

export const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: (log) =>
    set(({ logs }) => ({
      logs: [
        ...logs,
        {
          text: log,
          createdAt: new Date(),
        },
      ],
    })),
}));
