import { categories } from "@/constants/categories";
import { Categories } from "@/types/categories";
import { create } from "zustand";

type SessionStore = {
  session: string | null;
  initSession: (session: string, categories: Categories) => void;
  currentCategory: string;
  categories: Categories;
  winners: Map<string, string>;
  votes: Map<string, string>;
  registerWinner: (category: string, nominee: string) => void;
  registerVote: (category: string, nominee: string) => void;
  state: "awaiting-session" | "voting" | "voting-closed" | "results" | "closed";
  changeState: (state: SessionStore["state"]) => void;
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  session: null,
  initSession: (session, categories) => set({ session, categories }),
  currentCategory: categories[1].id,
  categories,
  winners: new Map<string, string>(),
  registerWinner: (category, nominee) =>
    set({ winners: new Map(get().winners.set(category, nominee)) }),
  votes: new Map<string, string>(),
  registerVote: (category, nominee) =>
    set({ votes: new Map(get().votes.set(category, nominee)) }),
  state: "awaiting-session",
  changeState: (state) => set({ state }),
}));
