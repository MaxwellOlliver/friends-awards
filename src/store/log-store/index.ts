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
  logs: [
    {
      text: "Edu entrou na sala",
      createdAt: new Date(),
    },
    {
      text: "Votação começou na categoria Friend do Ano",
      createdAt: new Date(),
    },
  ],
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
