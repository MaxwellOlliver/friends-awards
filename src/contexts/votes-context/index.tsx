import { createContext, useState } from "react";
import { VotesContextProps } from "./types";
import { categories } from "../../constants/categories";

export const VotesContext = createContext<VotesContextProps>({
  activeTab: "",
  registerVote: () => {},
  setActiveTab: () => {},
  votes: new Map(),
});

export const VotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [votes, setVotes] = useState<Map<string, string>>(new Map());
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const registerVote = (category: string, nominee: string) => {
    setVotes((votes) => new Map(votes.set(category, nominee)));
  };

  return (
    <VotesContext.Provider
      value={{
        votes,
        registerVote,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </VotesContext.Provider>
  );
};
