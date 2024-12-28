import { Categories } from "@/types/categories";
import { GameData, Session } from "../../types/session";

export type Participant = {
  id: string;
  name: string;
  isHost: boolean;
};

export type UpdateGameDataFn = {
  (action: "START_VOTING", data: string): Promise<void>;
  (action: "FINISH_VOTING"): Promise<void>;
};

export type SessionContextType = {
  session: Session | null;
  gameData: GameData | null;
  categories: Categories;
  participants: Participant[];
  registerGameAction: UpdateGameDataFn;
};
