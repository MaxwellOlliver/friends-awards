import { createContext } from "react";
import { SessionContextType } from ".";

export const SessionContext = createContext<SessionContextType | null>(null);
